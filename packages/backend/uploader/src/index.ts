import express from 'express'
import cors from 'cors'
import simpleGit from 'simple-git'
import { randomString } from './randomString'

const app = express()
app.use(express.json())
app.use(cors())

app.post('/upload', async(req,res) => {
    const url = req.body.url;
    const id = randomString();
    await simpleGit().clone(url,`output/${id}`);
    
    res.json({
        id : id
    })
})

app.listen(3000,() => {
    console.log("Server is listening on port 3000")
})