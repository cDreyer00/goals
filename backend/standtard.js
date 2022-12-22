import express from "express";

const app = express();

app.get("/",(req, res)=>{
    return res.send("Hello from ec2 server!");
})

app.listen(3000, () => console.log("SERVER RUNNING"));