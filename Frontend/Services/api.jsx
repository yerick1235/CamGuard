import axios from "axios"
import toast from "react-hot-toast"

const apiClient = axios.create({
    baseURL: 'http://192.168.133.176:2880',
    timeout: 5000
});

//# Listar Palabras
export const listarPalabras = async () => {
    try {
        return await apiClient.get('/img/listWords')
    } catch (error) {
        console.error('Error Capturando Data', error)
        throw error
    }
}

//# Agregar Palabras
export const agregarPalabras = async (data) => {
    try {
        return await apiClient.post('/img/addWord', data)
    } catch (error) {
        console.error('Error al registrar data',error)
        throw error
    }
}

//# Listar fotos
export const listarFotos = async () => {
    try {
        return await apiClient.get('/img/listPictures')
    } catch (error) {
        console.error('Error Capturando Data', error)
        throw error
    }
}