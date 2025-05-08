import React, { useEffect, useRef, useState } from 'react'
import { Card, Button } from 'react-bootstrap'

export const MainPage = () => {
    const imgRef = useRef(null)
    const streamURL = 'http://192.168.28.136:81/stream'

    const updateStream = () => {
        if (imgRef.current) {
            const timestamp = new Date().getTime()
            imgRef.current.src = `${streamURL}?t=${timestamp}`
        }
    }

    useEffect(() => {
        const interval = setInterval(updateStream, 100)
        return () => {
            clearInterval(interval)
        }
    }, [])



    return (
        <>
            <div style={{
                fontFamily: 'nunito',
                color: '#383C3F',
                fontSize: '3vh',
                marginLeft: '2vh'
            }}>
                CamGuard
            </div>
            <br />
            <span
                style={{
                    fontFamily: 'nunito',
                    color: '#383C3F',
                    fontSize: '3vh',
                    fontWeight: 'bold',
                    marginLeft: '2vh'
                }}>Cámaras
            </span>
            <div>
                {/* <img src="https://cdn.shopify.com/s/files/1/1100/5760/files/8ff26c96-c0ec-40e6-a3a5-6401d38a957a_480x480.png?v=1695263601" style={{
                    width: '100%',
                    borderRadius:'3vh'
                }} /> */}


                {/* <figure>
                    <div>
                        <img
                            id='stream'
                            src="http://192.168.50.136:81/stream"
                        />
                    </div>
                </figure> */}
            </div>
            <Card style={{ margin: '0 2vh 0 2vh' }}>
                {/* <Card.Img variant="top" src="https://www.experian.com/blogs/ask-experian/wp-content/uploads/what-are-different-types-of-stocks.jpg.webp" /> */}
                <figure>
                    <div>
                        <img
                            id='stream'
                            src='http://192.168.133.136:81/stream'
                        />
                    </div>
                </figure>
                <Card.Body style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                        <Card.Title>Cámara Principal</Card.Title>
                        <Card.Text>Cámara Principal</Card.Text>
                    </div>
                    {/* <span style={{ alignSelf: 'flex-end' }}>BTN Descriptor</span> */}
                </Card.Body>
            </Card>
        </>
    )
}
