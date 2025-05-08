import fileUpload from "express-fileupload"
import { v2 as cloudinary } from "cloudinary"

/*
cloudinary.config({
    cloud_name: 'dkdkhgrpf',
    api_key: '961774454333654',
    api_secret: 'vtQ0N_hed-p-1PmhpZOQINKOzzI'
})*/

//# Cloudinary Configs
//todo !!! Cambiar las credenciales a un .env por motivos de Seguridad !!!!!!!
export const cloudinaryConnection = () => {
    try {
        cloudinary.config({
            cloud_name: 'dkdkhgrpf',
            api_key: '961774454333654',
            api_secret: 'vtQ0N_hed-p-1PmhpZOQINKOzzI'
        })
        console.log('Cloudinary Connection Successful !!')
    } catch (error) {
        return console.error('Cloudinary Connection Error: ', error)
    }
}