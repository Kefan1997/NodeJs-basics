import { readFile } from 'node:fs/promises';

import { getPath } from '../helpers/index.js';

const read = async () => {
  const pathToFile = getPath(import.meta.url, 'files', 'fileToRead.txt');

  try {
    const content = await readFile(pathToFile, 'utf-8');
    console.log('File content:', content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw err;
  }
};

await read();
