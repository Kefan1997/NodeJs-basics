import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

import { getPath} from '../helpers/index.js';

const compress = async () => {
  const pathToFile = getPath(import.meta.url, 'files', 'fileToCompress.txt');
  const pathToCompressedFile = getPath(import.meta.url, 'files', 'archive.gz');

  try {
    const readStream = createReadStream(pathToFile);
    const gzipStream = createGzip();
    const writeStream = createWriteStream(pathToCompressedFile);

    await pipeline(readStream, gzipStream, writeStream);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      console.error('An error occurred:', err.message);
    }
  }
};

await compress();
