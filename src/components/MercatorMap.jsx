import {
  tle,
  extrapolateWrappedPointFeatures,
  satrecToFeature,
  clock,
  parseTle,
} from "../utils/MapHelper";
import React, { ReactElement } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

var TLE_DATA_DATE = new Date(2018, 0, 26).getTime();
var leafletMap;
var attributionControl;
var activeClock;
var satellitesLayer;
var satrecs;

function MercatorMap() {
  //d3.text("../data/tles.txt").then(parseTle).then(update);

  return (
    <div >
      <MapContainer center={[0,0]} zoom={2} scrollWheelZoom={true} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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

function update(parsedTles) {
  satrecs = tle().date(TLE_DATA_DATE).satrecs(parsedTles);

  activeClock = clock().rate(1000).date(TLE_DATA_DATE);

  var featureCollection = {
    type: "FeatureCollection",
    features: satrecs.map(function (rec) {
      return satrecToFeature(rec, new Date(activeClock.date()));
    }),
  };

  satellitesLayer = L.geoJSON(featureCollection, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 3,
        stroke: false,
        fillOpacity: 1,
        fillColor: feature.properties.original ? "#000" : "red",
      });
    },
  });

  leafletMap.addLayer(satellitesLayer);

  window.requestAnimationFrame(draw);
}

function draw(elapsed) {
  var dateInMs = activeClock.elapsed(elapsed).date();
  var date = new Date(dateInMs);
  satellitesLayer.clearLayers();

  var bounds = leafletMap.getBounds();
  var westBoundingLongitude = bounds.getWest();
  var eastBoundingLongitude = bounds.getEast();

  var features = satrecs.reduce(function (acc, cur) {
    var feature = satrecToFeature(cur, date);
    var wrapped = extrapolateWrappedPointFeatures(
      feature,
      westBoundingLongitude,
      eastBoundingLongitude,
    );
    wrapped.features[0].properties = {
      original: true,
      height: wrapped.features[0].properties.height,
    };
    return acc.concat(wrapped.features);
  }, []);

  var featureCollection = {
    type: "FeatureCollection",
    features: features,
  };
  satellitesLayer.addData(featureCollection);
  attributionControl.setPrefix(date);
  window.requestAnimationFrame(draw);
}
