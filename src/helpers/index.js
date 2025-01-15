import { access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getPath = (currentPath, folderName, fileName = '') => {
  const currentFile = fileURLToPath(currentPath);
  const currentDirName = dirname(currentFile);

  return join(currentDirName, folderName, fileName);
};

export const doesPathExist = async (path) => {
  try {
    await access(path);

    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
};

export const operationFail = () => {
  throw new Error('FS operation failed');
};
