import { connection } from "../../configs/DB/SQLConnection.js"
import { v2 as cloudinary } from "cloudinary"
import { exec, execFile } from 'child_process'
import fs from 'fs'
import path, { resolve } from "path"
import { error, log } from "console"
import { stderr, stdout } from "process"
import axios from "axios"
import { url } from "inspector"
import { GoogleGenAI } from "@google/genai"
import { response } from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"

const dbConnection = connection()
const genAI = new GoogleGenerativeAI('AIzaSyAoYyPL4Ui7LG3nJUwgiKG7QNboWh3Aleg')
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

export const test = (req, res) => {
    try {
        const rutaScript = path.resolve('./src/GeminiIA/Gemini.py')
        execFile('python', [rutaScript], (error, stdout, stderr) => {
            if (error) {
                console.error('Error al ejecutar Script:', error)
                return res.status(500).send({ message: 'Error al ejecutar el script Python' });
            }
            if (stderr) {
                console.error('Error en el script Python:', stderr);
                return res.status(500).send({ message: 'Error en el script Python' });
            }
            console.log('Resultado del script Python:', stdout);
            return res.send({ message: 'Script ejecutado correctamente', result: stdout });
        })
    } catch (error) {
        return res.status(500).send({ message: 'error al subir archivo' })
    }
}

export const testESP = (req, res) => {
    console.log('Intruso Detectado');
    return res.send({ message: 'Intruso Detectado' })
}

export const upload = async (req, res) => {
    /* try {
        //# Validate is File was uploaded
        if (!req.files || !req.files.image) {
            console.log('Data: ', req.files)
            console.log('Data: ', req.files.image)
            return res.status(400).send({ message: "Image was not uploaded" })
        }
        
        const file = req.files.image
        
        //# Upload Img to Cloudinary
        const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.data.toString('base64')}`,{
            folder:'Home',
            public_id: `image_${Date.now()}`
        })
        return res.send({message: "Image was Uploaded Successfully !!"})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: "Error Uploading file, Try Again" })
    } */

}

export const insertTest = async (req, res) => {
    try {
        const { nombre, carrera } = req.body
        dbConnection.query(
            "call sp_insertTest(?,?)",
            [nombre, carrera],
            (error) => {
                if (error) {
                    console.error(error)
                    return res.status(500).send({ message: 'DB Error, Intente Otra Vez' })
                }
                return res.send({ message: 'Data send successfully' })
            }
        )
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'DB Error, Intente Otra Vez' })
    }
}

//# CRUD Palabras Clave

//# Agregar
export const agregarPalabra = async (req, res) => {
    try {
        const { word, phrase } = req.body
        dbConnection.query(
            "call sp_AgregarPalabra(?,?)",
            [word, phrase],
            (error) => {
                if (error) {
                    console.error(error)
                    return res.status(500).send({ message: 'DB Error, Intente Otra Vez' })
                }
                return res.send({ message: 'Data Enviada Satisfactoriamente' })
            }
        )
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'DB Error, Intente Otra Vez' })
    }
}

//# Listar Palabras
export const listarPalabras = async (req, res) => {
    try {
        dbConnection.query('call sp_ListarPalabras()', (error, [results]) => {
            if (error) {
                console.error(error)
                return res.status(500).send({ message: 'DB Error, Intente Otra Vez' })
            }
            return res.json(results)
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'DB Error, Intente Otra Vez' })
    }
}

//# Capturar imagen y mandarla a cloudinary
export const subirCaptura = async (req, res) => {
    try {
        //await axios.get('http://192.168.28.136/control?var=face_detect&val=0')
        //await axios.get('http://192.168.28.136/control?var=face_recognize&val=0')
        //await axios.get('http://192.168.28.136/control?var=stream&val=0')
        //# Obtener Imagen del endpoint de la ESP32
        const esp32Response = await axios.get('http://192.168.133.136/capture', {
            responseType: 'arraybuffer'
        })
        console.log('1');

        //# Convertir la imagen a base64
        const imageBase64 = Buffer.from(esp32Response.data).toString('base64')
        console.log('2');


        //# Subir a Cloudinary
        const result = await cloudinary.uploader.upload(
            `data:image/jpeg;base64,${imageBase64}`, {
            folder: 'ESP32-CAM',
            public_id: `captura:${Date.now()}`,
            resource_type: 'image'
        }
        )
        console.log('3');

        dbConnection.query("call sp_agregarPersona(?)", [result.secure_url], (error) => {
            if (error) {
                console.error(error)
                return res.status(500).send({ message: 'Error al guardad foto' })
            }
        })


        //# Respuestas
        res.status(200).json({
            message: 'Imagen subida',
            url: result.secure_url
        })


        //# Guardar información en base de datos

        //await axios.get('http:/192.168.0.15/start-stream')
        //await axios.get('http://192.168.28.136/control?var=face_detect&val=1')
        //await axios.get('http://192.168.28.136/control?var=face_recognize&val=1')
        //await axios.get('http://192.168.28.136/control?var=stream&val=0')
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al Subir a Cloudinary' })
    }
}

//# Listar Fotos
export const listarFotos = async (req, res) => {
    try {
        dbConnection.query("call sp_listarFotos()", (error, [results]) => {
            if (error) {
                console.error(error)
                return res.status(500).send({ message: 'DB Error, Intente Otra Vez' })
            }
            return res.json(results)
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'DB Error, Intente Otra Vez' })
    }
}

//# Ejecutar Api Python
export const describirImagen = async (req, res) => {
    try {
        const { imageUrl } = req.body
        const promptDescription = `
Describe de manera detallada y objetiva a la persona visible en la imagen capturada por la ESP32-CAM, considerando las limitaciones típicas del dispositivo (baja resolución, ruido, poca iluminación o colores distorsionados). Incluye únicamente lo que sea claramente identificable, evitando suposiciones no verificables.

**1. Rasgos físicos:**
   - **Género aparente** (solo si es evidente; de lo contrario, omítelo).
   - **Edad aproximada** (rango amplio, ej. '30-50 años').
   - **Color y longitud del cabello** (ej. 'pelo corto negro', 'coleta rubia desenfocada').
   - **Vello facial** (ej. 'barba incipiente', 'bigote visible', 'sin vello facial discernible').

**2. Vestimenta:**
   - **Color y tipo de prenda superior** (ej. 'camiseta blanca', 'sudadera gris con capucha').
   - **Prenda inferior** (si es visible, ej. 'pantalones azules oscuros').
   - **Accesorios** (gorras, gafas, collares, etc., solo si son claros).

**3. Calidad de la imagen:**
   - Señala limitaciones como: 'rostro parcialmente borroso por movimiento', 'colores desaturados debido a la iluminación', 'sombras que ocultan detalles'.

**4. Contexto observable (si aplica):**
   - Postura (ej. 'de pie frente a la cámara', 'sentado en una silla').
   - Entorno inmediato (ej. 'fondo blanco difuso', 'pared con estante detrás').

**Ejemplo de respuesta válida:**
"Persona de género masculino aparente, entre 25-40 años, pelo corto negro y barba corta poco definida. Viste una camiseta oscura (posiblemente azul) y pantalón claro. El rostro está ligeramente desenfocado por movimiento, y la imagen tiene ruido en zonas oscuras. Fondo irreconocible por baja resolución."

**Normas:**
- **No inventes detalles** si no son claramente visibles (ej. emociones, marcas de ropa).
- **Sé conciso** y usa lenguaje neutral.
`
        const result = await model.generateContent({
            contents: [{
                parts: [{
                    text: promptDescription + imageUrl
                }]
            }]
        })

        const response = result.response
        const text = response.text()

        return res.json({
            success: 'true',
            description: text
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al Ejecutar Api' })
    }
}
