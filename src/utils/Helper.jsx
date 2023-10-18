import {
  ecfToLookAngles,
  propagate,
  gstime,
  twoline2satrec,
  eciToEcf,
  eciToGeodetic,
  degreesLong,
  degreesLat,
} from "satellite.js";
import satellites from "../data/ActiveSatelliteDatabase.json";

///////////////////////////////////////////////////////////////
/////////    Satellite/Rotator Object Constructors     ////////
///////////////////////////////////////////////////////////////
export async function getSatelliteData(satelliteName) {
  const TLE = await fetchOrbitalData(satelliteName, "TLE");
  if (TLE === "No GP data found") {
    console.log("Unable to retrieve orbital data");
    
  } else {
    //console.log(TLE);
    const satRec = getSatRec(TLE);
    const InitialSatData = {
      TLE: TLE,
      satRec: satRec,
    };
    return InitialSatData;
  }
}

export function getSatData(Item, satRec) {
  const positionGd = getPositionGd(satRec);
  const returnItem = positionGd[Item];
  if (Item === "latitude") {
    return Math.floor(degreesLat(returnItem));
  } else if (Item === "longitude") {
    return Math.floor(degreesLong(returnItem));
  } else {
    return Math.floor(returnItem);
  }
}

///////////////////////////////////////////////////////////////
///////////       Orbital Dynamics/Other          /////////////
///////////////////////////////////////////////////////////////
export function getPositionGd(satRec) {
  // get time
  const gmst = gstime(new Date());

  // propagate position
  const positionEci = propagate(satRec, new Date()).position;

  // convert/return geodetic coordinates
  return eciToGeodetic(positionEci, gmst);
}

function getSatRec(tle) {
  // parse tle lines
  var line1 = tle.split("\n")[1];
  var line2 = tle.split("\n")[2];

  // create satrec object
  const satrec = twoline2satrec(line1, line2);

  return satrec;
}
///////////////////////////////////////////////////////////////
//////////////            Data Fetching           /////////////
///////////////////////////////////////////////////////////////
function fetchOrbitalData(satelliteName, format) {
  // contruct url from satellite name and format
  const url = `https://www.celestrak.com/NORAD/elements/gp.php?NAME=${satelliteName}&FORMAT=${format}`;
  // request document
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      if (format === "TLE") {
        // retirn tle string
        return data;
      } else {
        // parse/return JSON into Object
        return JSON.parse(data)[0];
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
