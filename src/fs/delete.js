import { unlink } from 'node:fs/promises';

import { getPath, doesPathExist, operationFail } from '../helpers/index.js';

const remove = async () => {
  const pathToFile = getPath(import.meta.url, 'files', 'fileToRemove.txt');

  if (!(await doesPathExist(pathToFile))) {
    operationFail();
    return;
  }

  try {
    await unlink(pathToFile);
    console.log('File removed successfully');
  } catch (err) {
    throw err;
  }
};

await remove();
