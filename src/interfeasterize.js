import getDistance from "./haversine";

/**
 * @typedef UserLocation
 * @property {number} latitude The latitude of the user.
 * @property {number} longitude The longitude of the user.
 *
 * @typedef InterfeastConfig
 * @property {[number, number]} location The location from which to compare each user location against.
 * @property {number} maxDistance The maximum (inclusive) distance in kilometers a user must be to be included.
 *
 * @typedef FilterItem
 * @property {UserLocation} entry The user location of the matching entry.
 * @property {number} distance The distance the user was from the target location.
 */

/**
 * Interfeasterizes an array of entries based on a given latitude and longitude coordinate and maximum distance.
 * @param {Array.UserLocation} entries An array of user locations.
 * @param {InterfeastConfig} param1
 * @returns {Array.FilterItem} The matching entries.
 */
export default function interfeasterize(entries, { location, maxDistance }) {

  // we'll use reduce to both map and reduce our original set of entries
  // rather than a map then a filter, in this case we calculate the distance
  // and if it is greater than our maximum allowed distance then we skip that
  // entry by returning a current reduction; otherwise we return a new reduction
  // with the matching entry and the distance that it was from the target coordinate
  const matching = entries.reduce((matching, entry) => {
    const distance = getDistance(location, [entry.latitude, entry.longitude]);

    if (distance > maxDistance) return matching;

    return [...matching, { entry, distance }];
  }, []);

  // ensure we sort our matching items by their user id ascending
  const sorted = matching
    .sort((a, b) => a.entry.user_id - b.entry.user_id);

  return sorted;
}
