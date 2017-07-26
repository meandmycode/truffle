const RADIANS_PER_DEGREE = Math.PI / 180;
const EARTH_RADIUS = 6371; // in kilometers

/**
 * Converts a numeric angle in degrees to radians.
 * @param {number} degrees The angle in degrees to convert.
 * @returns {number} The angle in radians.
 */
export function degreesToRadians(degrees) {
  return degrees * RADIANS_PER_DEGREE;
}

/**
 * Estimates the distance (in kilometers) between two earth coordinates using haversine formula.
 * @param {[number, number]} The first latitude, longitude pair
 * @param {[number, number]} The second latitude, longitude pair
 * @returns {number} The distance (in kilometers) between the two coordinates
 */
export default function distance([lat1, lon1], [lat2, lon2]) {
  const λ1 = degreesToRadians(lat1);
  const λ2 = degreesToRadians(lat2);

  // calculate the distance distance (in radians between our coordinates)
  const deltaLat = degreesToRadians(lat2 - lat1);
  const deltaLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(λ1) * Math.cos(λ2) * Math.sin(deltaLon / 2) ** 2;

  const length = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 2;

  return length * EARTH_RADIUS;
}
