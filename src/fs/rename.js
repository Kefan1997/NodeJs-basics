import { rename } from 'node:fs/promises';

import { getPath, doesPathExist, operationFail } from '../helpers/index.js';

const renameFn = async () => {
  const oldPath = getPath(import.meta.url, 'files', 'wrongFilename.txt');
  const newPath = getPath(import.meta.url, 'files', 'properFilename.md');

  if (!(await doesPathExist(oldPath)) || (await doesPathExist(newPath))) {
    operationFail();
    return;
  }

  try {
    await rename(oldPath, newPath);
  } catch (err) {
    throw err;
  }
};

await renameFn();
