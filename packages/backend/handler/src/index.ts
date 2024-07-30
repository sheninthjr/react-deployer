import express from "express";
import { S3 } from 'aws-sdk'
import 'dotenv/config'

const app = express();

const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    endpoint: process.env.ENDPOINT
})

app.get("/*", async (req, res) => {
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001);