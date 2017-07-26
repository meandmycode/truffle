import test from "ava";
import { interfeasterize } from "../";

test("should correctly filter and sort a sample dataset", t => {
  const entries = [
    { latitude: 52.986375, longitude: -6.043701, user_id: 12 },
    { latitude: 51.92893, longitude: -10.27699, user_id: 1 },
    { latitude: 51.8856167, longitude: -10.4240951, user_id: 2 },
    { latitude: 52.3191841, longitude: -8.5072391, user_id: 3 },
    { latitude: 53.807778, longitude: -7.714444, user_id: 28 },
    { latitude: 53.4692815, longitude: -9.436036, user_id: 7 },
    { latitude: 54.0894797, longitude: -6.18671, user_id: 8 },
    { latitude: 53.038056, longitude: -7.653889, user_id: 26 },
    { latitude: 54.1225, longitude: -8.143333, user_id: 27 },
    { latitude: 53.1229599, longitude: -6.2705202, user_id: 6 },
    { latitude: 52.2559432, longitude: -7.1048927, user_id: 9 },
    { latitude: 52.240382, longitude: -6.972413, user_id: 10 },
    { latitude: 53.2451022, longitude: -6.238335, user_id: 4 },
    { latitude: 53.1302756, longitude: -6.2397222, user_id: 5 },
    { latitude: 53.008769, longitude: -6.1056711, user_id: 11 },
    { latitude: 53.1489345, longitude: -6.8422408, user_id: 31 },
    { latitude: 53, longitude: -7, user_id: 13 },
    { latitude: 51.999447, longitude: -9.742744, user_id: 14 },
    { latitude: 52.966, longitude: -6.463, user_id: 15 },
    { latitude: 52.366037, longitude: -8.179118, user_id: 16 },
    { latitude: 54.180238, longitude: -5.920898, user_id: 17 },
    { latitude: 53.0033946, longitude: -6.3877505, user_id: 39 },
    { latitude: 52.228056, longitude: -7.915833, user_id: 18 },
    { latitude: 54.133333, longitude: -6.433333, user_id: 24 },
    { latitude: 55.033, longitude: -8.112, user_id: 19 },
    { latitude: 53.521111, longitude: -9.831111, user_id: 20 },
    { latitude: 51.802, longitude: -9.442, user_id: 21 },
    { latitude: 54.374208, longitude: -8.371639, user_id: 22 },
    { latitude: 53.74452, longitude: -7.11167, user_id: 29 },
    { latitude: 53.761389, longitude: -7.2875, user_id: 30 },
    { latitude: 54.080556, longitude: -6.361944, user_id: 23 },
    { latitude: 52.833502, longitude: -8.522366, user_id: 25 }
  ];

  const location = [53.3393, -6.2576841];
  const maxDistance = 100;

  const expected = [4, 5, 6, 8, 11, 12, 13, 15, 17, 23, 24, 26, 29, 30, 31, 39];

  const actual = interfeasterize(entries, { location, maxDistance })
    .map(({ entry }) => entry.user_id);

  t.deepEqual(actual, expected);

});
