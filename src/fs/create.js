import { writeFile } from 'node:fs/promises';

import { getPath } from '../helpers/index.js';

const create = async () => {
  try {
    const content = 'I am fresh and young 2';

    const path = getPath(import.meta.url, 'files', 'fresh.txt');

    await writeFile(path, content, { flag: 'wx' });
  } catch (err) {
    if (err.code === 'EEXIST' || err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw err;
  }
};

await create();
