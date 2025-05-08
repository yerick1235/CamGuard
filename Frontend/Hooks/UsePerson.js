import { useState } from "react"
import { listarFotos } from "../Services/api"


export const UsePerson = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [personInfo, setPersonInfo] = useState(null)
    const [error, setError] = useState(null)

    const getPersonData = async () => {
        setIsLoading(true)
        try {
            const response = await listarFotos()
            if(response.data){
                setPersonInfo(response.data)
            }else{
                setError('Error al Obtener Data')
            }
        } catch (error) {
            setIsLoading(false)
            setError('Error al Obtener Data')
            console.error(error)
        }finally{
            setIsLoading(false)
        }
    }
    return{
        isLoading,
        personInfo,
        error,
        getPersonData
    }
}
