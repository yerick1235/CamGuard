import React from 'react'

export const Emergency = () => {
    return (
        <div>
            <div style={{
                color: '#dfdfdf',
                fontWeight: 'bold',
                fontFamily: 'nunito',
                fontSize: '3vh'
            }}>Emergency Response</div>
            <br />
            <div>
                <img src="https://cdn.shopify.com/s/files/1/1100/5760/files/8ff26c96-c0ec-40e6-a3a5-6401d38a957a_480x480.png?v=1695263601" style={{
                    width: '100%',
                    borderRadius: '3vh'
                }} />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '3vh' }}>
                <button>Activate Siren</button>
                <button onClick={() => { window.location.href = 'tel:36848223' }}>Call Emergency Contact</button>
            </div>

            {/* Cards */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%',
                fontFamily: 'nunito',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#dfdfdf',
                marginTop: '3vh'
            }}>
                <div style={{ backgroundColor: '#1f272a', borderRadius: '3vh', padding: '3vh 2vh 3vh 2vh' }} onClick={() => { window.location.href = 'tel:36848223' }}>
                    <img src="https://img.icons8.com/?size=80&id=18515&format=png&color=000000" />
                    <br />
                    <span>Fire</span>
                </div>
                <div style={{ backgroundColor: '#1f272a', borderRadius: '3vh', padding: '3vh 2vh 3vh 2vh' }} onClick={() => { window.location.href = 'tel:36848223' }}>
                    <img src="https://img.icons8.com/?size=80&id=12014&format=png&color=000000" />
                    <br />
                    <span>Police</span>
                </div>
                <div style={{ backgroundColor: '#1f272a', borderRadius: '3vh', padding: '3vh 2vh 3vh 2vh' }} onClick={() => { window.location.href = 'tel:36848223' }}>
                    <img src="https://img.icons8.com/?size=80&id=14799&format=png&color=000000" />
                    <br />
                    <span>Medical</span>
                </div>
            </div>
        </div>
    )
}
