/**
 * Parses a given string of newline deliminated JSON items and return an array of all items.
 * @param {string} str The newline deliminated JSON to parse from.
 * @returns {Array} An array of items for each line within the source.
 */
export function parse(str) {

  // we want to split by newlines as we want to treat each line as JSON,
  // note we split by carriage return, line feed or a combined crlf and
  const lines = str.split(/\r\n|\n|\r/);

  const items = lines.reduce((items, line, i) => {

    // if the line is just an empty string then its likely this is just
    // a terminating line (unix style) and we can just skip over it
    // we don't explicitly check for this being the last line which
    // makes us a little more forgiving on the source data.
    // we could do this with a trim, but we'd still need to cover
    // branching for a blank string, and it would also throw our
    // line numbers off when reporting errors
    if (line === '') return items;

    const item = JSON.parse(line);

    return [...items, item];

  }, []);

  return items;
}
