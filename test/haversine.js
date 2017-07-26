import test from 'ava';
import { getDistance } from '../';

const cases = [
    [[36.833333333333336, 3], [-15.166666666666666, 12.15], 5861.227773371244], // distance between Algiers and Namibe
    [[18.216666666666665, -63.05], [-34.666666666666664, -58.5], 5900.007001285861], // distance between The Valley and Buenos Aires
    [[-31.533333333333335, -64.35], [40.166666666666664, 44.516666666666666], 13702.215477634574], // distance between C├│rdoba and Yerevan
    [[-35.28333333333333, 149.13333333333333], [-28.933333333333334, 134.75], 1525.4505279955392], // distance between Canberra and Coober Pedy
    [[-12.466666666666667, 130.83333333333334], [-17.316666666666666, 123.63333333333334], 942.8611891418506], // distance between Darwin and Derby
    [[-23.333333333333332, 119.56666666666666], [-31.933333333333334, 115.83333333333333], 1024.3290032452553], // distance between Newman and Perth
    [[-19.216666666666665, 146.8], [48.2, 16.366666666666667], 14545.53996435433], // distance between Townsville and Vienna
    [[40.36666666666667, 49.88333333333333], [25.05, -77.48333333333333], 10932.603948149997], // distance between Baku and Nassau
    [[26.216666666666665, 50.56666666666667], [23.716666666666665, 90.41666666666667], 4011.15302848387], // distance between Al-Manamah and Dhaka
    [[13.1, -59.61666666666667], [53.85, 27.5], 8647.107578345416], // distance between Bridgetown and Minsk
    [[50.833333333333336, 4.333333333333333], [17.216666666666665, -88.8], 8747.400597323569], // distance between Brussels and Belmopan
    [[6.483333333333333, 2.6166666666666667], [32.3, -64.8], 7504.417822967659], // distance between Porto-Novo and Hamilton
    [[-22.9, -47.05], [-7.25, -58.416666666666664], 2122.7532011557078], // distance between Campinas and Cuiaba
    [[-3.1, -60], [-8.75, -63.9], 761.971485767316], // distance between Manaus and Porto Velho
    [[-2.4333333333333336, -54.68333333333333], [-23.533333333333335, -46.61666666666667], 2501.7094655826786], // distance between Santar├®m and S├úo Paulo
    [[58.75, -94], [67.81666666666666, -115.35], 1454.1887320807396], // distance between Churchill, Manitoba and Kugluktuk, Nunavut
    [[45.416666666666664, -75.71666666666667], [60.71666666666667, -135.05], 4138.510091668486], // distance between Ottawa and Whitehorse
    [[49.88333333333333, -97.15], [14.916666666666666, -23.516666666666666], 7577.0924846265425], // distance between Winnipeg and Praia
    [[19.333333333333332, -81.38333333333334], [4.383333333333334, 18.616666666666667], 10890.030753972691], // distance between George Town and Bangui
    [[12.166666666666666, 14.983333333333333], [-23.666666666666668, -70.38333333333334], 10085.765033521004], // distance between NDjamena and Antofagasta
    [[-27.083333333333332, -109.33333333333333], [25.083333333333332, 121.53333333333333], 14964.92779744408], // distance between Hanga Roa and Taipei
    [[-12.166666666666666, 96.81666666666666], [4.6, -74.08333333333333], 18708.014165561537], // distance between West Island and Bogot├í
    [[-11.666666666666666, 43.266666666666666], [-4.766666666666667, 11.883333333333333], 3534.9718267265966], // distance between Moroni and Pointe Noire
    [[-4.3, 15.3], [0.55, 25.233333333333334], 1228.3322298823268], // distance between Kinshasa and Kisangani
    [[-11.683333333333334, 27.483333333333334], [-21.2, 159.76666666666668], 13649.6682124557], // distance between Lubumbashi and Avarua
    [[9.933333333333334, -84.08333333333333], [5.316666666666666, -0.08333333333333333], 9250.784926356246], // distance between San Jos├® and Abidjan
    [[15.3, -61.38333333333333], [18.466666666666665, -69.9], 971.9959509924026], // distance between Roseau and Santo Domingo
    [[-2.1666666666666665, -79.83333333333333], [-0.23333333333333334, -78.5], 261.1212738872913], // distance between Guayaquil and Quito
    [[24.083333333333332, 32.93333333333333], [30.05, 31.25], 684.0464611390282], // distance between Aswan and Cairo
    [[13.666666666666666, -89.16666666666667], [51.5, -0.16666666666666666], 8754.16097487608], // distance between San Salvador and London
    [[3.75, 8.8], [15.333333333333334, 38.96666666666667], 3543.1392795415104], // distance between Malabo and Asmara
    [[59.43333333333333, 24.716666666666665], [-23.166666666666668, -135], 15679.848777980793], // distance between Tallinn and Gambier Island
    [[-17.533333333333335, -149.56666666666666], [0.5, 9.416666666666666], 17036.7279266675], // distance between Papeete and Libreville
    [[13.466666666666667, -16.65], [52.53333333333333, 13.416666666666666], 5095.858903091402], // distance between Banjul and Berlin
    [[53.55, 9.983333333333333], [5.55, -0.25], 5417.548278829202], // distance between Hamburg and Accra
    [[12.066666666666666, 61.733333333333334], [9.483333333333333, -13.716666666666667], 8220.98500255838], // distance between Saint George's and Conakry
    [[11.866666666666667, -15.65], [6.8, -58.166666666666664], 4694.34449263447], // distance between Bissau and Georgetown
    [[18.533333333333335, -72.33333333333333], [47.5, 19.083333333333332], 8604.080727402308], // distance between Port Au Prince and Budapest
];

for (const [a, b, expected] of cases) {

  test('can calculate distance between various coordinates', t => {

    const actual = getDistance(a, b);

    // note: we compare a truncated value since implementations may vary in their
    // level of accuracy, in our SLA for accuracy for haversine distance we expect
    // there to be 10 decimals which is 0.1 of a micrometre (which is ridiculous).
    t.is(actual.toFixed(10), expected.toFixed(10));

  });

}
