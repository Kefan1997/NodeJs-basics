import { rename } from 'node:fs/promises';

import { getPath, doesPathExist } from '../helpers/index.js';

const renameFn = async () => {
  const oldPath = getPath(import.meta.url, 'files', 'wrongFilename.txt');
  const newPath = getPath(import.meta.url, 'files', 'properFilename.md');

  if (!(await doesPathExist(oldPath)) || (await doesPathExist(newPath))) {
    throw new Error('FS operation failed');
    return;
  }

  try {
    await rename(oldPath, newPath);
  } catch (err) {
    throw err;
  }
};

await renameFn();
