import { S3 } from 'aws-sdk'
import 'dotenv/config'

export const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    endpoint: process.env.ENDPOINT
})