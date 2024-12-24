import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

import { getPath, doesPathExist, operationFail } from '../helpers/index.js';

const calcHash = async () => {
  const pathToFile = getPath(import.meta.url, 'files', 'fileToCalculateHashFor.txt');

  if (!(await doesPathExist(pathToFile))) {
    operationFail();
    return;
  }

  const hash = createHash('sha256');
  const stream = createReadStream(pathToFile);

  try {
    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      console.log('Hash:', hash.digest('hex'));
    });

    stream.on('error', (err) => {
      throw err;
    });
  } catch (err) {
    throw err;
  }
};

await calcHash();
