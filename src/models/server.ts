import express from "express"
import cors from 'cors'
import db from "../db/connection";
import userRouter from '../routes/user'
import noteRouter from '../routes/note'

class Server {

    private app: express.Application;
    private port: string;
    private apiPaths = {
        user: '/api/user',
        note: '/api/note',
    }
    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8080';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database Online')
        } catch (error) {
            throw new Error('error')
        }
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.apiPaths.user, userRouter),
            this.app.use(this.apiPaths.note, noteRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`server running in port ${this.port}`)
        })
    }
}

export default Server