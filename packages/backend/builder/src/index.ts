import { commandOptions, createClient } from "redis";
import { downloadFiles, uploadDistToS3 } from "./s3";
import { buildFile } from "./buildFiles";

const subscriber = createClient();
subscriber.connect();
const publisher = createClient();
publisher.connect();

async function main() {
    while(1) {
        const res = await subscriber.brPop(commandOptions({ isolated: true }),"build-queue",0);
        const id = res?.element;
        await downloadFiles(`output/${id}`);
        await buildFile(id as string);
        await uploadDistToS3(`dist/${id}`);
        publisher.hSet("status",id as string,"builded");        
    }
}

main()