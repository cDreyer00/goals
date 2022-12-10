import express from "express"
import { router } from "./routes.js";
import bodyParser from "body-parser";
import "dotenv/config"

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(router);

app.listen(process.env.PORT, () => console.log(`SERVER RUNNING ON http://localhost:${process.env.PORT}`))