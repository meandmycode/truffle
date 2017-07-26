/* eslint-disable no-console */
import minimist from "minimist";
import fs from "fs";
import { promisify } from 'util';
import { interfeasterize, JsonStream } from "../";

const readFile = promisify(fs.readFile);

// we'll use minimist to parse command line arguments as its solid at handling this
const args = minimist(process.argv.slice(2));

const [filePath] = args._;
const location = args.from.split(",").map(parseFloat);
const maxDistance = args.distance;

/**
 * devnote: we could lazily pipe a stream through line-by-line and pipe out any lines
 * that match, this way we could filter large datasets without consuming much memory.
 * however; in this case we are required to sort our results, as such we're required
 * to buffer the whole dataset anyway, so we might as well just buffer the the input.
 */
readFile(filePath, 'utf8').then(source => {

  const entries = JsonStream.parse(source);
  const matching = interfeasterize(entries, { location, maxDistance });

  console.log(matching);

}).catch(err => {

    if (err.code === JsonStream.PARSE_LINE_ERROR) {
      console.log(err.source);
      console.log('^^');
    }

    console.error(err.stack);

    process.exit(1);

});

