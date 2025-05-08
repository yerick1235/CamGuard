import { useState } from "react"
import { listarPalabras } from "../Services/api"

export const UseWord = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [wordsInfo, setWordsInfo] = useState(null)
    const [error, setError] = useState(null)

    const getWordsData = async()=>{
        setIsLoading(true)
        try {
            const response = await listarPalabras()
            if(response.data){
                setWordsInfo(response.data)
            }else{
                setError('Error Al Obtener Data')
            }
        } catch (error) {
            setIsLoading(false)
            setError('Error al Obtener DATA')
            console.error(error)
        }finally{
            setIsLoading(false)
        }
    }
    return{
        isLoading,
        wordsInfo,
        error,
        getWordsData
    }
}
