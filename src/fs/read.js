import { readFile } from 'node:fs/promises';

import { getPath, doesPathExist} from '../helpers/index.js';

const read = async () => {
  const pathToFile = getPath(import.meta.url, 'files', 'fileToRead.txt');

  if (!(await doesPathExist(pathToFile))) {
    throw new Error('FS operation failed');
  }

  try {
    const content = await readFile(pathToFile, 'utf-8');
    console.log('File content:', content); 
  } catch(err) {
    throw err;
  }
}

await read();
