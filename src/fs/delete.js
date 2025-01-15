import { unlink } from 'node:fs/promises';

import { getPath } from '../helpers/index.js';

const remove = async () => {
  const pathToFile = getPath(import.meta.url, 'files', 'fileToRemove.txt');

  try {
    await unlink(pathToFile);
    console.log('File removed successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw err;
  }
};

await remove();
