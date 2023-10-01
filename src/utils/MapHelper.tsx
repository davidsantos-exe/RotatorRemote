/* =============================================== */
/* =============== CLOCK ========================= */
/* =============================================== */

/**
 * Factory function for keeping track of elapsed time and rates.
 */
export function clock() {
  var rate = 60; // 1ms elapsed : 60sec simulated
  var date = d3.now();
  var elapsed = 0;

  function clock() {}

  clock.date = function (timeInMs) {
    if (!arguments.length) return date + elapsed * rate;
    date = timeInMs;
    return clock;
  };

  clock.elapsed = function (ms) {
    if (!arguments.length) return date - d3.now(); // calculates elapsed
    elapsed = ms;
    return clock;
  };

  clock.rate = function (secondsPerMsElapsed) {
    if (!arguments.length) return rate;
    rate = secondsPerMsElapsed;
    return clock;
  };

  return clock;
}

/* ==================================================== */
/* =============== CONVERSION ========================= */
/* ==================================================== */

export function radiansToDegrees(radians) {
  return (radians * 180) / Math.PI;
}

export function satrecToFeature(satrec, date, props) {
  var properties = props || {};
  var positionAndVelocity = satellite.propagate(satrec, date);
  var gmst = satellite.gstime(date);
  var positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);
  properties.height = positionGd.height;
  return {
    type: "Feature",
    properties: properties,
    geometry: {
      type: "Point",
      coordinates: [
        radiansToDegrees(positionGd.longitude),
        radiansToDegrees(positionGd.latitude),
      ],
    },
  };
}

/**
 * Given lngLat and longitude bounds this function interpolates the
 * longitude so that you get appropriate amount of markers on map
 * without weird wraping effects.
 * @param {number[]} lngLat [lng, lat]
 * @param {number} westBoundingLongitude
 * @param {number} eastBoundingLongitude
 * @return {number[][]} [[lng, lat], ...]
 */
export function extrapolateWrappedCoordinates(
  lngLat,
  westBoundingLongitude,
  eastBoundingLongitude,
) {
  var coords = [[lngLat[0], lngLat[1]]];

  for (var lng0 = lngLat[0] - 360; westBoundingLongitude < lng0; lng0 -= 360) {
    coords.push([lng0, lngLat[1]]);
  }

  for (var lng1 = lngLat[0] + 360; eastBoundingLongitude > lng1; lng1 += 360) {
    coords.push([lng1, lngLat[1]]);
  }

  return coords;
}

/**
 * Extrapolates a point geojson feature to fill west and east longitude
 * bounds so that there is seamless wrap for maps over 180 or under -180 limits.
 * @param {GeoJSONPointFeature} feature GeoJSON point feature
 * @param {number} westBoundingLongitude
 * @param {number} eastBoundingLongitude
 * @return {GeoJSONFeatureCollection} Feature collection containing all points
 */
export function extrapolateWrappedPointFeatures(
  feature,
  westBoundingLongitude,
  eastBoundingLongitude,
) {
  const features = extrapolateWrappedCoordinates(
    feature.geometry.coordinates,
    westBoundingLongitude,
    eastBoundingLongitude,
  ).map(function (lngLat) {
    return {
      type: "Feature",
      properties: feature.properties,
      geometry: {
        type: "Point",
        coordinates: lngLat,
      },
    };
  });

  return {
    type: "FeatureCollection",
    features: features,
  };
}

/* ==================================================== */
/* =============== TLE ================================ */
/* ==================================================== */

/**
 * Factory function for working with TLE.
 */
export function tle() {
  var _properties;
  var _date;
  var _lines = function (arry) {
    return arry.slice(0, 2);
  };

  function tle() {}

  tle.satrecs = function (tles) {
    return tles.map(function (d) {
      return satellite.twoline2satrec.apply(null, _lines(d));
    });
  };

  tle.features = function (tles) {
    var date = _date || d3.now();

    return tles.map(function (d) {
      var satrec = satellite.twoline2satrec.apply(null, _lines(d));
      return satrecToFeature(satrec, date, _properties(d));
    });
  };

  tle.lines = function (func) {
    if (!arguments.length) return _lines;
    _lines = func;
    return tle;
  };

  tle.properties = function (func) {
    if (!arguments.length) return _properties;
    _properties = func;
    return tle;
  };

  tle.date = function (ms) {
    if (!arguments.length) return _date;
    _date = ms;
    return tle;
  };

  return tle;
}

/* ==================================================== */
/* =============== PARSE ============================== */
/* ==================================================== */

/**
 * Parses text file string of tle into groups.
 * @return {Array<string[]>} Like [['tle line 1', 'tle line 2'], ...]
 */
export function parseTle(threeleString) {
  // remove last newline so that we can properly split all the lines
  var lines = threeleString.replace(/\r?\n$/g, "").split(/\r?\n/);

  return lines.reduce(function (acc, cur, index) {
    if (index % 2 === 0) acc.push([]);
    acc[acc.length - 1].push(cur);
    return acc;
  }, []);
}
