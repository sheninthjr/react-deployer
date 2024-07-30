import fs from 'fs';
import path from 'path';
import { s3 } from 'common';


export const downloadFiles = async (prefix:string) => {
    const allFiles = await s3.listObjectsV2({
        Bucket: "vercel-clone",
        Prefix: prefix
    }).promise();

    const allPromise = allFiles.Contents?.map(async({Key}) => {
        return new Promise(async(resolve) => {
            if(!Key) {
                resolve("")
                return;
            }
            const fileOutputPath = path.join(__dirname,Key);
            const outputFilePath = fs.createWriteStream(fileOutputPath);
            const dirName = path.dirname(fileOutputPath);
            if(!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName, {recursive: true})
            }
            s3.getObject({
                Bucket: "vercel-clone",
                Key
            }).createReadStream().pipe(outputFilePath).on("finish",() => {
                resolve("")
            })
        })
    }) || [];
    await Promise.all(allPromise?.filter(x => x !== undefined))
}

export function uploadDistToS3(id: string) {
    const folderPath = path.join(__dirname, `output/${id}/dist`);
    const allFiles = getAllFiles(folderPath);
    allFiles.forEach(file => {
        uploadFile(`dist/${id}/` + file.slice(folderPath.length + 1), file);
    })
}


export const getAllFiles = (folderPath:string) => {
    let res:string[] = [];
    const allFiles = fs.readdirSync(folderPath);
    allFiles.forEach(file => {
        const fullPath = path.join(folderPath,file);
        if(fs.statSync(fullPath).isDirectory()) {
           res = res.concat(getAllFiles(fullPath));
        }
        else {
            res.push(fullPath);
        }
    });
    return res;
}


export const uploadFile = async(fileName:string,localPath:string) => {
    const fileContent = fs.readFileSync(localPath);
    const res = await s3.upload({
        Body: fileContent,
        Bucket:"vercel-clone",
        Key: fileName
    }).promise()
}