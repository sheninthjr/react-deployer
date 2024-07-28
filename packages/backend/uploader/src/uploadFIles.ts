import { S3 } from 'aws-sdk'
import fs from 'fs'
import 'dotenv/config'

const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    endpoint: process.env.ENDPOINT
})

export const uploadFile = async(fileName:string,localPath:string) => {
    const fileContent = fs.readFileSync(localPath);
    const res = await s3.upload({
        Body: fileContent,
        Bucket:"vercel-clone",
        Key: fileName
    }).promise()
}