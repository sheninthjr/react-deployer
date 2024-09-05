import { s3 } from 'common';
import fs from 'fs';
import 'dotenv/config';

console.log(s3);

export const uploadFile = async (fileName: string, localPath: string) => {
  const fileContent = fs.readFileSync(localPath);
  const res = await s3
    .upload({
      Body: fileContent,
      Bucket: 'vercel-clone',
      Key: fileName,
    })
    .promise();
};
