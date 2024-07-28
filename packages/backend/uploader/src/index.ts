import express from 'express'
import cors from 'cors'
import { createClient } from 'redis'
import simpleGit from 'simple-git'
import path from 'path'
import { randomString } from './randomString'
import { getAllFiles } from './getAllFiles'
import { uploadFile } from './uploadFIles'
import 'dotenv/config'; 

const app = express()

const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect();

app.use(express.json())
app.use(cors())

app.post('/upload', async(req,res) => {
    const url = req.body.url;
    const id = randomString();
    await simpleGit().clone(url, path.join(__dirname, `output/${id}`));
    const files = await getAllFiles(path.join(__dirname, `output/${id}`))
    files.forEach(async file => {
        await uploadFile(file.slice(__dirname.length+1),file);
    })
    publisher.lPush("build-queue",id);
    publisher.hSet("status",id,"uploaded");
    res.json({
        id : id
    })
})

app.get("/status",async(req,res)=> {
    const id = req.query.id;
    const response = await subscriber.hGet("status",id as string);
    res.json({
        status: response
    })
})

app.listen(3000,() => {
    console.log("Server is listening on port 3000")
})