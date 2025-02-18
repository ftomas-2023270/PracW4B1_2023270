'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {dbConnection} from './mongo.js';
import limiter from "../src/middlewares/validar-cant-peticion.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import classRoutes from "../src/class/class.routes.js"

const middlewares = (app)=>{
    app.use(express.urlencoded({extended:false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) =>{
    app.use('/academySystem/v1/auth' , authRoutes)
    app.use('/academySystem/v1/user', userRoutes)
    app.use('/academySystem/v1/class', classRoutes)
}

const conectarDB = async()=>{
    try {
        await dbConnection();
        console.log('Mongo DB | DataBase conection successfully');
    } catch (error) {
        console.error('Error conectando a la base de datos',error);
        process.exit(1);
    }
}

export const initServer= async()=>{
    const app = express();
    const port = process.env.port || 3001;

    try {
        middlewares(app);
        conectarDB();
        app.listen(port);
        routes(app);
        console.log(`Mongo DB | Server running on port ${port}`)
    } catch (e) {
        console.log(`Server init failed: ${e}`)
    }
}