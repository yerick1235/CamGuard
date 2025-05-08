import React, { useEffect, useState } from 'react'
import { data, useLocation, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, ButtonGroup, Button, Dropdown, Modal, Form, ListGroup, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { UseWord } from '../../../Hooks/UseWord'
import { agregarPalabras } from '../../../Services/api'

export const BottomNavBar = () => {
    const { error, getWordsData, isLoading, wordsInfo } = UseWord()
    const [formData, setFormData] = useState({
        word: '',
        phrase: ''
    })

    const navigate = useNavigate()
    const location = useLocation()

    const navigateTo = (path) => {
        navigate(path)
    }

    const isHome = location.pathname === '/'
    const isFeed = location.pathname === '/feed'


    useEffect(() => {
        //getWordsData()
    }, [])


    //# Speech-Recognition
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    if (!('webkitSpeechRecognition' in window)) {
        return alert('Tu navegador no soporta reconocimiento de voz.')
    }

    if (!browserSupportsSpeechRecognition) {
        return alert('Tu navegador no soporta reconocimiento por voz')
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [show, setShow] = useState(false)
    const handelClose = () => setShow(false)
    const handelShow = () => setShow(true)

    const handleSubmit = async () => {
        try {
            const response = await agregarPalabras(formData)
            console.log('FormData ', formData)
            console.log('response ', response)
            getWordsData()
        } catch (error) {
            console.error('Error al agregar la aplabra', error)
        }
    }

    return (
        <>

            <Modal show={show} onHide={handelClose}>
                <div style={{ margin: '2vh' }}>
                    <Modal.Title>Palabras Clave</Modal.Title>
                    <ListGroup>
                        {isLoading ? (
                            <p>Cargando Datos...</p>
                        ) : error ? (
                            <p>Error al Cargar Datos</p>
                        ) : wordsInfo && wordsInfo.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{width:'1vh'}}>#</th>
                                        <th>Palabra</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wordsInfo.map((info) => (
                                        
                                        <tr>
                                            <td>{info.wordID}</td>
                                            <td>{info.word}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>


                        ) : (
                            <p>No Hay Datos</p>
                        )}
                    </ListGroup>
                    <hr />
                    <Modal.Title>Agregar Palabras</Modal.Title>


                    <Form>
                        Frase
                        <Form.Control type='text' name='word' value={formData.word} onChange={handleChange} />
                        <br />
                        Alerta
                        <Form.Control as='textarea' name='phrase' value={formData.phrase} onChange={handleChange} />
                        <div style={{marginTop:'2vh'}}>
                            <Button variant='primary' onClick={handleSubmit} style={{marginRight:'2vh'}}>Agregar</Button>
                            <Button variant='secondary' onClick={handelClose}>Cancelar</Button>
                        </div>
                    </Form>
                </div>

            </Modal>

            {/* <Dropdown style={{ position: 'absolute', top: '0', right: '0', margin: '2vh' }}>
                <Dropdown.Toggle>
                    MENU
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handelShow}>
                            Palabra clave
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Toggle>
            </Dropdown> */}

            {listening && (
                <div>
                    fsdffdsf
                </div>
            )}
            {/* <p>Microfono{listening ? 'on' : 'off'}</p>
            <button style={{ position: 'absolute', top: '0' }} onClick={() => SpeechRecognition.startListening()}>Encender</button>
            <button onClick={SpeechRecognition.stopListening}>Apagar</button>
            <button onClick={resetTranscript}>Resetear</button>
            <button onClick={() => { alert('ALERTAAAA') }}>Alerta</button>
            <p>{transcript}</p> */}

            <Navbar className='bg-body-tertiary' fixed='bottom' style={{}}>
                <Container style={{maxWidth:'fit-content'}}>
                    <Nav className='me-auto'>
                        <Nav.Link href='/'>
                            <img style={{ height: '3.5vh', marginRight:'5vh'}} src={isHome ? "https://img.icons8.com/?size=100&id=1iF9PyJ2Thzo&format=png&color=0d6efd" : "https://img.icons8.com/?size=100&id=1iF9PyJ2Thzo&format=png&color=888D91"} />
                        </Nav.Link>
                        <Nav.Link href='/feed'>
                            <img style={{ height: '3.5vh' }} src={isFeed ? 'https://img.icons8.com/?size=100&id=11668&format=png&color=0d6efd' : 'https://img.icons8.com/?size=100&id=11668&format=png&color=888D91'} />
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
