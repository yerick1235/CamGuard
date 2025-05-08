import { initServer } from "./configs/app.js";
import { connection } from "./configs/DB/SQLConnection.js";
import { cloudinaryConnection } from "./src/Middleware/CloudinaryConnection.js";

initServer()
connection()
cloudinaryConnection()
