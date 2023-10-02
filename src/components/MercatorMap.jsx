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
import { useControls } from "leva";
import Button from "@mui/material/Button";

var TLE_DATA_DATE = new Date(2018, 0, 26).getTime();
var leafletMap;
var attributionControl;
var activeClock;
var satellitesLayer;
var satrecs;

const voyagerMap="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png";
const esriMap = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";
const esriGreyMap ="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";

function MercatorMap() {
  const [baseMap,setBaseMap] = useState({label:"Voyager",value:"voyagerMap"});
  const { dropDown } = useControls({
    baseMap: { value: {baseMap}, options: ["Sunny"] },
    fillColor: {
      value: "#cfcfcf",
      label: "fill",
      render: (get) => get("fillMode") === "color",
    },
    fillImage: {
      image: undefined,
      label: "fill",
      render: (get) => get("fillMode") === "image",
    },
  });

  //d3.text("../data/tles.txt").then(parseTle).then(update);
  //https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=83fc6ba4587a4571b92373659a78aaaf
  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <Button sx={{ width: 0, height: 0 }} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
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
