import app from "./app.js";
import { PORT } from "./config.js";
import {config} from 'dotenv'

config()
app.listen(PORT);
console.log("server on port", PORT);
