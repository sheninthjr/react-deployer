import fs from 'fs';
import path from 'path';

export const getAllFiles = (folderPath: string) => {
  let res: string[] = [];
  const allFiles = fs.readdirSync(folderPath);
  allFiles.forEach((file) => {
    const fullPath = path.join(folderPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      res = res.concat(getAllFiles(fullPath));
    } else {
      res.push(fullPath);
    }
  });
  return res;
};
