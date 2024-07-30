import { exec } from 'child_process';
import path from 'path';

export const buildFile = (id:string) => {
    return new Promise((resolve) => {
        const build = exec(`cd ${path.join(__dirname,`output/${id}`)} && npm install && npm run build`);
        build.stdout?.on('data',(data)=>{
            console.log(`output: ${data}`);
        })
        build.stderr?.on('data',(data)=>{
            console.log(`error: ${data}`);  
        })
        build.on("close",()=>{
            resolve("")
        })
    })  
}