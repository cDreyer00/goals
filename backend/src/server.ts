import express, { Request, Response } from "express"
import { router } from "./routes"

const app = express();
const port = 3333;

app.use(express.json())

const cookeParser = require("cookie-parser");
app.use(cookeParser());

app.use(router)

app.listen(port, () => console.log(`SERVER RUNNING: http://localhost:${port}`));