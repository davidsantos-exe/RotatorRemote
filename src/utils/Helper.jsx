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
    const satRec = getSatRec(TLE);
    const satPass = getSatPass()
    //[TO-DO]: pass getters
    const InitialSatData = {
      TLE: TLE,
      satRec: satRec,
      pass: satPass,
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
  } else if (Item === "height") {
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

function getSatPass(){

  const currentDate = new Date();
  const mm = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month because it's 0-indexed
  const dd = currentDate.getDate().toString().padStart(2, '0');
  const yy = currentDate.getFullYear().toString().slice(-2); // Extract the last two digits of the year
  const date = `${mm}/${dd}/${yy}`;

  const data ={
    Retrieved: date,
    NextPass: "1hr 5min",
    Visible: "Yes",
    MaxE: "76",
    Inclination: "32",
    Start: {Time:"00:00:01",Azimuth:"35", Elevation:"55"},
    Peak: {Time:"00:00:02",Azimuth:"35", Elevation:"55"},
    Finish: {Time:"00:00:03",Azimuth:"35", Elevation:"55"}
  }
  return data;
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



//////////////////////////////////////////////////////////////
//////////////       Control Interface           /////////////
//////////////////////////////////////////////////////////////

export function goToPosition(azimuth,elevation){
  console.log("Moving to Position: (" + azimuth + "," + elevation+ ")");
}
