import express from "express"
import { agregarPalabra, describirImagen, insertTest, listarFotos, listarPalabras, subirCaptura, test, testESP, upload } from "./Image.controller.js"

const api = express.Router()

api.get('/test', test)
api.post('/upload', upload)
api.get('/cam', testESP)
api.post('/insert', insertTest)

//# Palabras Clave
api.post('/addWord', agregarPalabra)
api.get('/listWords', listarPalabras)
api.get('/cloudinary', subirCaptura)

//# Notificaciones
api.get('/listPictures', listarFotos)

api.post('/describir', describirImagen)
export default api