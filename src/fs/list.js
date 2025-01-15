import { readdir } from 'node:fs/promises';

import { getPath } from '../helpers/index.js';

const list = async () => {
  const pathToFolder = getPath(import.meta.url, 'files');

  try {
    const files = await readdir(pathToFolder);
    console.log('Files in the folder:', files);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw err;
  }
};

await list();
