import { createConnection } from "mysql2"

export const connection = () => {
    try {
        const pool = createConnection({
            host:'qypmh.h.filess.io',
            port:'3307',
            user:'DBCamGuard_factletter',
            password:'f54c4ac80188988a194c85e8d3de70025c0bd55b',
            database:'DBCamGuard_factletter'
        })
        console.log('DB Connection Successful !!')
        return pool
    } catch (error) {
        return console.error('DB Connection Error: ', error)
    }
}
