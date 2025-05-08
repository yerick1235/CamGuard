import express, { urlencoded } from "express"
import { config } from "dotenv"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import fileUpload from "express-fileupload"
import { v2 as cloudinary } from "cloudinary"
import imgRoutes from '../src/Img/Image.routes.js'

const app = express()
config()
const port = process.env.PORT || 3200

app.use(urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(fileUpload(/*{
    useTempFiles: true,
    tempFileDir: './uploads'
}*/))

//# Routes
app.use('/img', imgRoutes)

//# Initialize Server
export const initServer = async () => {
    app.listen(port)
    console.log(`Server HTTP Running on port: ${port}`)
}