import React from "react";
import { Polyline, Circle } from "react-leaflet";
import { gstime, eciToGeodetic, propagate } from "satellite.js";
import { chaikinSmooth } from "../utils/MapHelper.jsx";

function radiansToDegrees(radians) {
  return (radians * 180) / Math.PI;
}

const SatelliteLayer = ({ satellites }) => {
  const getPath = (sat, orbit) => {
    var date = new Date();
    var positionAndVelocity = propagate(sat.satRec, date);
    var gmst = gstime(date);
    var positionGd = eciToGeodetic(positionAndVelocity.position, gmst);
    var path = [];

    var lon = 0;
    var lat = 0;
    var sign = 1;

    for (let i = 0; i < 1000; i++) {
      var newDate = new Date(date);
      newDate.setMinutes(date.getMinutes() - i);
      positionAndVelocity = propagate(sat.satRec, newDate);
      gmst = gstime(newDate);
      positionGd = eciToGeodetic(positionAndVelocity.position, gmst);
      lon = radiansToDegrees(positionGd.longitude);
      lat = radiansToDegrees(positionGd.latitude);
      path.push([lat, lon]);
      if (i === 0) {
        // console.log("from1: " + lon);
      }
      if (path.length > 1 && Math.abs(path[i][1] - path[i - 1][1]) > 50) {
        // console.log("to: " + path[i - 1][1]);
        path.slice(1);
        path.pop();

        for (let j = 0; j < 1000; j++) {
          newDate = new Date(date);
          newDate.setMinutes(date.getMinutes() + j);
          positionAndVelocity = propagate(sat.satRec, newDate);
          gmst = gstime(newDate);
          positionGd = eciToGeodetic(positionAndVelocity.position, gmst);
          lon = radiansToDegrees(positionGd.longitude);
          lat = radiansToDegrees(positionGd.latitude);
          path.push([lat, lon]);

          if (j === 0) {
            //console.log("from2: " + lon);
          }
          // console.log("Added: " + path[i + j][1]);

          if (j > 1 && Math.abs(path[i + j][1] - path[i + j - 1][1]) > 50) {
            //console.log("to: " + path[i + j - 1][1]);
            path.pop();
            break;
          }
        }
        break;
      }
    }

    path.sort((a, b) => a[1] - b[1]);

    for (var i = 0; i < path.length; i++) {
      path[i][1] += orbit;
    }


    return path;
  };

  const getSatCenter = (sat) => {
    var date = new Date();
    var positionAndVelocity = propagate(sat.satRec, date);
    var gmst = gstime(date);
    var positionGd = eciToGeodetic(positionAndVelocity.position, gmst);
    var lon = radiansToDegrees(positionGd.longitude);
    var lat = radiansToDegrees(positionGd.latitude);
    return [lat, lon];
  };

  const getFootPrint = (sat) => {
    var date = new Date();
    var positionAndVelocity = propagate(sat.satRec, date);
    var gmst = gstime(date);
    var positionGd = eciToGeodetic(positionAndVelocity.position, gmst);
    var lon = radiansToDegrees(positionGd.longitude);
    var lat = radiansToDegrees(positionGd.latitude);

    return 1000;
  };

  const groundTrackColors = ["#2ff33A", "#e3ff00", "#20d9ac", "#FF69B4", "#00D7FF" ,"#AEFF77", "#FF7792", "#FF77E4", "#7777FF", "#FFFF77" ]

  return satellites.map((sat, index) => (
    <div key={index}>
      <Polyline 
        pathOptions={{color:groundTrackColors[index],weight:1}}
        positions={getPath(sat, 0)}
      />
      <Polyline
        pathOptions={{color:groundTrackColors[index],weight:1}}
        positions={getPath(sat, -360)}
      />
      <Polyline
        pathOptions={{color:groundTrackColors[index],weight:1}}
        positions={getPath(sat, 360)}
      /><Polyline
      pathOptions={{color:groundTrackColors[index],weight:1}}
      positions={getPath(sat, -720)}
    />
    <Polyline
      pathOptions={{color:groundTrackColors[index],weight:1}}
      positions={getPath(sat, 720)}
    />
    <Polyline
      pathOptions={{color:groundTrackColors[index],weight:1}}
      positions={getPath(sat, -1080)}
    />
    <Polyline
      pathOptions={{color:groundTrackColors[index],weight:1}}
      positions={getPath(sat, 1080)}
    />
      {/*<Circle center={getSatCenter(sat)} pathOptions={{fillColor:'blue'}} radius={500} />*/}
      <Circle
        center={getSatCenter(sat)}
        pathOptions={{ fillColor: "red" }}
        radius={300}
      />
    </div>
  ));
};

export default SatelliteLayer;
