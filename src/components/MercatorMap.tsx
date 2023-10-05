import React, { useState, ReactElement,useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";

import { sgp4, twoline2satrec, gstime,eciToGeodetic, propagate} from 'satellite.js';
import {text, geoPath,geoTransform, now,select,scaleThreshold,schemeCategory10} from "d3";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useControls } from "leva";
import Button from "@mui/material/Button";

const voyagerMap =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png";
const esriStreetMap =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";
const esriGreyMap =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";

const maps = {
  map1: { label: "Voyager", url: voyagerMap },
  map2: { label: "Esri Street", url: esriStreetMap },
  map3: { label: "Esri Grey", url: esriGreyMap },
};
const bounds = [
  [-90, 200],
  [90, 206],
];

var TLE_DATA_DATE = new Date(2018, 0, 26).getTime();
var heightColorScale = scaleThreshold()
.domain([1200, 22000])
.range([schemeCategory10[3], schemeCategory10[2], schemeCategory10[0]])

function clock() {
  var rate = 60; // 1ms elapsed : 60sec simulated
  var date = now();
  var elapsed = 0;

  function clock() {}

  clock.date = function(timeInMs) {
    if (!arguments.length) return date + (elapsed * rate);
    date = timeInMs;
    return clock;
  }

  clock.elapsed = function(ms) {
    if (!arguments.length) return date - now(); // calculates elapsed
    elapsed = ms;
    return clock;
  }

  clock.rate = function(secondsPerMsElapsed) {
    if (!arguments.length) return rate;
    rate = secondsPerMsElapsed;
    return clock;
  }

  return clock;
}
function extrapolateWrappedCoordinates(lngLat, westBoundingLongitude, eastBoundingLongitude) {
  var coords = [[lngLat[0], lngLat[1]]];

  for (var lng0 = lngLat[0] - 360; westBoundingLongitude < lng0; lng0 -= 360) {
    coords.push([lng0, lngLat[1]]);
  }

  for (var lng1 = lngLat[0] + 360; eastBoundingLongitude > lng1; lng1 += 360) {
    coords.push([lng1, lngLat[1]]);
  }

  return coords;
}


function extrapolateWrappedPointFeatures(feature, westBoundingLongitude, eastBoundingLongitude) {
  const features = extrapolateWrappedCoordinates(feature.geometry.coordinates, westBoundingLongitude, eastBoundingLongitude)
    .map(function(lngLat) {
      return {
        type: 'Feature',
        properties: feature.properties,
        geometry: {
          type: 'Point',
          coordinates: lngLat
        }
      };
    })

  return {
    type: 'FeatureCollection',
    features: features
  };
}


function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

function satrecToFeature(satrec, date, props) {
  var properties = props || {};
  var positionAndVelocity = propagate(satrec, date);
  var gmst = gstime(date);
  var positionGd = eciToGeodetic(positionAndVelocity.position, gmst);
  properties.height = positionGd.height;
  return {
    type: 'Feature',
    properties: properties,
    geometry: {
      type: 'Point',
      coordinates: [
        radiansToDegrees(positionGd.longitude),
        radiansToDegrees(positionGd.latitude)
      ]
    }
  };
}


function draw(elapsed) {
  var dateInMs = activeClock.elapsed(elapsed)
    .date();
  var date = new Date(dateInMs);
  //attributionControl.setPrefix(date);

  var westBoundingLongitude = -200;
  var eastBoundingLongitude = 200;

  var features = satrecs.reduce(function(acc, cur) {
    var feature = satrecToFeature(cur, date);
    var wrapped = extrapolateWrappedPointFeatures(feature, westBoundingLongitude, eastBoundingLongitude);
    return acc.concat(wrapped.features);
  }, []);
  
  var feature = select(svgLayer._container)
    .selectAll('path')
    .data(features);

  feature.enter().append('path')
    .merge(feature)
    .attr('fill', function(d) {return heightColorScale(d.properties.height);})
    .attr('stroke', function(d) {return heightColorScale(d.properties.height);})
    .attr('d', path);


  feature.exit().remove();

  window.requestAnimationFrame(draw);
}

function projectPointCurry(map) {
  return function (x, y) {
    const point = map.latLngToLayerPoint(L.latLng(y, x));
    this.stream.point(point.x, point.y);
  };
}

function tle() {
  var _properties;
  var _date;
  var _lines = function (arry) {
    return arry.slice(0, 2);
  };

  function tle() {}

  tle.satrecs = function (tles) {
    return tles.map(function(d) {
      return twoline2satrec.apply(null, _lines(d));
    });
  }

  tle.features = function (tles) {
    var date = _date || d3.now();

    return tles.map(function(d) {
      var satrec = twoline2satrec.apply(null, _lines(d));
      return satrecToFeature(satrec, date, _properties(d));
    });
  }

  tle.lines = function (func) {
    if (!arguments.length) return _lines;
    _lines = func;
    return tle;
  }

  tle.properties = function (func) {
    if (!arguments.length) return _properties;
    _properties = func;
    return tle;
  }

  tle.date = function (ms) {
    if (!arguments.length) return _date;
    _date = ms;
    return tle;
  }

  return tle;
}


function parseTle(tleString) {
  // remove last newline so that we can properly split all the lines
  var lines = tleString.replace(/\r?\n$/g, '').split(/\r?\n/);

  return lines.reduce(function(acc, cur, index) {
    if (index % 2 === 0) acc.push([]);
    acc[acc.length - 1].push(cur);
    return acc;
  }, []);
}

function update(parsedTles) {
  satrecs = tle()
    .date(TLE_DATA_DATE)
    .satrecs(parsedTles);

  activeClock = clock()
    .rate(1000)
    .date(TLE_DATA_DATE);

  window.requestAnimationFrame(draw);
}

var satrecs;
var activeClock;
var svgLayer;
var path;

function MyComponent() {
  const leafletMap = useMap()
  var transform = geoTransform({ point: projectPointCurry(leafletMap) });
  path = geoPath().projection(transform).pointRadius(2.5);
  svgLayer = L.svg();
  svgLayer.addTo(leafletMap);
  text("src/data/tles.txt").then(parseTle).then(update);
  return null
}


function MercatorMap() {

  const [baseMap, setBaseMap] = useState(maps.map1);

  const [controls, set] = useControls('Map', () => ({
    select: {
      value: baseMap.label,
      label: "Base Map",
      options: ["Voyager", "Esri Grey", "Esri Street"],
      onChange: (value) => {
        // Update the base map based on the selected option
        switch (value) {
          case "Voyager":
            setBaseMap(maps.map1);
            break;
          case "Esri Grey":
            setBaseMap(maps.map3);
            break;
          case "Esri Street":
            setBaseMap(maps.map2);
            break;
          default:
            break;
        }
      },
    },
    showGrid: { label: "Show Grid", value: true },
  }));


  return (
    <div>
      <MapContainer

        center={[0, 0]}
        zoom={2.5}
        zoomDelta={0.5}
        scrollWheelZoom={true}
        zoomControl={false}
        //whenCreated={setLeafletMap}
        // maxBounds={bounds}
      >
        <MyComponent/>
        <Button sx={{ width: 0, height: 0 }} />
        <TileLayer url={baseMap.url} />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MercatorMap;