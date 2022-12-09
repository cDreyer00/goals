import express from "express"
import { run } from "./database.js";


const app = express();

app.get("/", async (req, res) => {
    const dbRun = await run();

    return res.json(dbRun);
})

app.listen(5000, () => console.log("SERVER RUNNING ON http://localhost:5000"))

