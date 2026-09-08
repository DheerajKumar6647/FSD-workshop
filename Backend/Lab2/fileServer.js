import fs from "node:fs/promises";
const filePath = "data.txt";

async function createFile(content)  {
    try{
        await fs.writeFile(filePath , content , "utf8");
        console.log("File Created Successfully!");
    }catch(err){
        console.error("Error created file: ", err);
    }
}

async function readFile()  {
    try{
        const data = await fs.readFile(filePath , "utf8");
        console.log("File Content : \n" , data);
        return data;
    }catch(err){
    console.log("error");
    }
}


async function appendFile( content)  {
    const data = await fs.appendFile(filePath , content , "utf8");
    console.log("File content : \n")
}
function deleteFile()  {

}
await createFile("WelCome to backend");
await readFile();