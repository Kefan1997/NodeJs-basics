import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { getPath, operationFail } from '../helpers/index.js';

const calcHash = async () => {
  const pathToFile = getPath(import.meta.url, 'files', 'fileToCalculateHashFor.txt');

  const hash = createHash('sha256').setEncoding('hex');
  const readStream = createReadStream(pathToFile);

  try {
    await pipeline(readStream, hash);

    hash.end();

    process.stdout.write(`Hash: ${hash.read()}\n`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      operationFail();
      return;
    } else if (err.code === 'EACCES') {
      console.error('You do not have permission to read this file');
      return;
    } else {
      console.error('An error occurred:', err.message);
    }
  }
};

await calcHash();
