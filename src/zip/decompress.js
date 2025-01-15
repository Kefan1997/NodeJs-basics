import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

import { getPath, doesPathExist } from '../helpers/index.js';

const decompress = async () => {
  const sourcePath = getPath(import.meta.url, 'files', 'archive.gz');
  const destinationPath = getPath(import.meta.url, 'files', 'decompressed.txt');

  if (!(await doesPathExist(sourcePath))) {
    throw new Error('FS operation failed');
  }

  try {
    const readStream = createReadStream(sourcePath);
    const gunzipStream = createGunzip();
    const writeStream = createWriteStream(destinationPath);

    await pipeline(readStream, gunzipStream, writeStream);

    console.log('File decompressed successfully');
  } catch (err) {
    console.error('An error occurred:', err.message);
  }
};

await decompress();
