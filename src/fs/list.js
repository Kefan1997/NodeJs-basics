import { readdir } from 'node:fs/promises';

import { getPath, doesPathExist, operationFail } from '../helpers/index.js';

const list = async () => {
  const pathToFolder = getPath(import.meta.url, 'files');

  if (!(await doesPathExist(pathToFolder))) {
    operationFail();
    return;
  }

  try {
    const files = await readdir(pathToFolder);
    console.log('Files in the folder:', files);
  } catch (err) {
    throw err;
  }
};

await list();
