const http=require("http");
const myServer=http.createServer((req,res)=>{
console.log("new req"),res.end("hello ")});
myServer.listen(8001,()=>console.log("server started"));