import React, { useEffect, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { UsePerson } from '../../../Hooks/UsePerson'
import axios from 'axios'

export const Feed = () => {
    const { error, getPersonData, isLoading, personInfo } = UsePerson()

    const [show, setShow] = useState(false)
    const [selectedInfo, setSelectedInfo] = useState('')

    const [description, setDescription] = useState('')
    const [isLoadingDescription, setIsLoadingDescription] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        getPersonData()
    }, [])

    const fetchDescription = async(imageUrl)=>{
        setIsLoadingDescription(true)
        try {
            const response = await axios.post('http://192.168.133.176:2880/img/describir',{
                imageUrl:imageUrl
            })
            setDescription(response.data.description)
        } catch (error) {
            console.error('Error al generar descripción')
            setDescription('Error al obtener Descripción')   
        }finally{
            setIsLoadingDescription(false)
        }
    }

    return (
        <div>



            <span style={{
                fontFamily: 'nunito',
                fontWeight: 'bold',
                fontSize: '3vh',
                color: '#383C3F',
                marginLeft: '2vh'
            }}>
                Notificaciones
            </span>
            <Card style={{ margin: '2vh 2vh 10vh 2vh'}}>
                <div>
                    {isLoading ? (
                        <p>Cargando Datos</p>
                    ) : error ? (
                        <p>Error al Cargar Datos</p>
                    ) : personInfo && personInfo.length > 0 ? (
                        <div>
                            {personInfo.map((info) => (
                                <div style={{ display: 'flex', margin: '2vh 0 2vh 2vh' }}>
                                    <img src={info.picture} style={{ borderRadius: '1vh', height: '15vh' }} />
                                    <div>
                                        <span style={{
                                            fontFamily: 'nunito',
                                            fontWeight: 'bold',
                                            color: '#383C3F',
                                            marginLeft: '1vh'
                                        }}>Cámara :</span>
                                        <br />
                                        <span style={{ marginLeft: '1vh' }}>Principal</span>
                                        <br />

                                        {/* //Modal */}


                                        <Button onClick={() => {
                                            console.log(info.picture)
                                            setSelectedInfo(info)
                                            setDescription('')
                                            handleShow()
                                        }} style={{ marginTop: '5vh' }}>Describir</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No Hay Datos</p>
                    )}
                </div>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Informacion</Modal.Title>
                </Modal.Header>
                {selectedInfo && (
                    <>
                        <img src={selectedInfo.picture} style={{ margin: '2vh', borderRadius: '1vh' }} />
                        <Button onClick={()=> fetchDescription(selectedInfo.picture)}>Describir</Button>
                        <span>Descripción:</span>
                        {isLoadingDescription ? (
                            <p>Cargando Descripción...</p>
                        ):(
                            <p>{description}</p>
                        )}
                    </>
                )}
            </Modal>
        </div>
    )
}
