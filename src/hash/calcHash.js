import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

import { getPath, operationFail } from '../helpers/index.js';

const calcHash = async () => {
  const pathToFile = getPath(import.meta.url, 'files', 'fileToCalculateHashFor.txt');

  const hash = createHash('sha256');
  const stream = createReadStream(pathToFile);

  try {
    await new Promise((resolve, reject) => {
      stream.on('data', (data) => {
        hash.update(data);
      });

      stream.on('end', () => {
        console.log('Hash:', hash.digest('hex'));
        resolve();
      });

      stream.on('error', (err) => {
        reject(err);
      });
    });
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
