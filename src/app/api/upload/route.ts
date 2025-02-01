import fs from "fs";
import path from "path"
import { NextResponse } from "next/server";

export const POST =async(req: any)=>{

    try{
        console.log("okk")
        const formData=await req.formData();
        const file=formData.get("file");

        if(!file)
        {
            return NextResponse.json({messege:"no file upload"},{status:400})
        }

        const bite=await file.arrayBuffer();
        const buffer=Buffer.from(bite);

        const createPath=path.join(process.cwd(),"public",file.name);

        fs.writeFileSync(createPath,buffer);
        return NextResponse.json({message:"file uploaded",url:`/${file.name}`});
    }
    catch(error)
    {
        console.log("error "+error)
    }
}