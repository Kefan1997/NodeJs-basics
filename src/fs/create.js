import { writeFile } from 'node:fs';

import { getPath, doesPathExist, operationFail } from '../helpers/index.js';

const create = async () => {
  const content = 'I am fresh and young';

  const path = getPath(import.meta.url, 'files', 'fresh.txt');
  const pathExists = await doesPathExist(path);

  if (pathExists) {
    operationFail();

    return;
  }

  await writeFile(path, content, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('File created successfully');
    }
  });
};

await create();
