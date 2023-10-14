import React, { useState, ReactElement,useRef } from "react";
import { useRotator } from "../classes/RotatorContext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  SVGOverlay
} from "react-leaflet";

import { sgp4, twoline2satrec, gstime,eciToGeodetic, propagate} from 'satellite.js';
import {text, geoPath,geoTransform, now,select,scaleThreshold,schemeCategory10} from "d3";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useControls } from "leva";
import Button from "@mui/material/Button";
import SatelliteLayer from "../utils/MapHelper.jsx"
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
  [-90, -180],
  [90, 180],
];


function MercatorMap() {
  const {rotator} = useRotator();
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
        <SatelliteLayer/>
        <Button sx={{ width: 0, height: 0 }} />
        <TileLayer url={baseMap.url} />
        {rotator!==null &&(<Marker position={[rotator.state.Rotator.Location.Latitude,rotator.state.Rotator.Location.Longitude]}>
          <Popup>
            {rotator.state.CallSign}
          </Popup>
        </Marker>)}
      </MapContainer>
    </div>
  );
}

export default MercatorMap;