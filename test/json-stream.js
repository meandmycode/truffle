import test from 'ava';
import { JsonStream } from '../';

const cases = [
  // empty
  ['', [], 'an empty string'],
  // various cases of single items
  ['1', [1], 'a single number'],
  ['""', [""], 'a single empty string'],
  ['"hello world"', ["hello world"], 'a single string'],
  ['{}', [{}], 'a single empty object'],
  ['{"a":42,"b":"hello world"}', [{ a: 42, b: 'hello world' }], 'a single object'],
  // multiple line-feed split items
  ['1\n2\n3\n4\n5', [1, 2, 3, 4, 5], 'multiple numbers across line-feeds'],
  ['""\n""\n""\n""\n""', ['', '', '', '', ''], 'multiple empty strings across line-feeds'],
  ['{}\n{}\n{}\n{}\n{}', [{}, {}, {}, {}, {}], 'multiple empty objects across line-feeds'],
  // trailing..
  ['\n', [], 'trailing line-feed'],
  ['\r', [], 'trailing carriage-return'],
  ['\r\n', [], 'trailing crlf'],
  ['1\n', [1], 'trailing line-feed'],
  ['1\r', [1], 'trailing carriage-return'],
  ['1\r\n', [1], 'trailing crlf'],
];

for (const [str, expected, name] of cases) {

  test(`can parse ${name}`, t => {

    const actual = JsonStream.parse(str);

    t.deepEqual(actual, expected);

  });

}

const repeatingCases = [
  // multiple line-feed split items
  ['1', 1, '\n', 'multiple numbers across line-feeds'],
  ['""', '', '\n', 'multiple empty strings across line-feeds'],
  ['"hello world"', 'hello world', '\n', 'multiple strings across line-feeds'],
  ['{}', {}, '\n', 'multiple empty objects across line-feeds'],
  ['{"a":42,"b":"hello world"}', { "a": 42, "b": "hello world" }, '\n', 'multiple objects across line-feeds'],
  // multiple carriage-return split items
  ['1', 1, '\r', 'multiple numbers across carriage-return'],
  ['""', '', '\r', 'multiple empty strings across carriage-return'],
  ['"hello world"', 'hello world', '\r', 'multiple strings across carriage-return'],
  ['{}', {}, '\r', 'multiple empty objects across carriage-return'],
  ['{"a":42,"b":"hello world"}', { "a": 42, "b": "hello world" }, '\r', 'multiple objects across carriage-return'],
  // multiple crlf split items
  ['1', 1, '\r\n', 'multiple numbers across crlfs'],
  ['""', '', '\r\n', 'multiple empty strings across crlfs'],
  ['"hello world"', 'hello world', '\r\n', 'multiple strings across crlfs'],
  ['{}', {}, '\r\n', 'multiple empty objects across crlfs'],
  ['{"a":42,"b":"hello world"}', { "a": 42, "b": "hello world" }, '\r\n', 'multiple objects across crlfs'],
];

for (const [strItem, expectedItem, sep, name] of repeatingCases) {

  test(`can parse ${name}`, t => {

    const str = new Array(5).fill(strItem).join(sep);

    const expected = new Array(5).fill(expectedItem);

    const actual = JsonStream.parse(str);

    t.deepEqual(actual, expected);

  });

}

const malformedCases = [
  'a\n1',
  '1\n2\n3a\n4',
  '1\n2\n3\n4\na',
  'a\r1',
  '1\r2\r3a\r4',
  '1\r2\r3\r4\ra',
  'a\r\n1',
  '1\r\n2\r\n3a\r\n4',
  '1\r\n2\r\n3\r\n4\r\na',
];

for (const str of malformedCases) {

  test('throws with malformed json', t => {
    t.throws(() => JsonStream.parse(str));
  });

}
