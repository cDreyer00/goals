import express from "express"
import { router } from "./routes.js";
import bodyParser from "body-parser";
import "dotenv/config"
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


app.use(router);

app.listen(process.env.PORT, () => console.log(`SERVER RUNNING ON http://localhost:${process.env.PORT}`))