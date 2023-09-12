import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import conexion from "./config/database.js"
import router from "./routes/routes.js"
const app = express();
dotenv.config()


async function iniciarServer(){
    try {
        await conexion.sync({force:false})
    }catch (error){
        console.log("Error al sincronizar: "+ error)
        return;
    }
}

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}))
app.use(router)
app.listen(process.env.APP_PORT)

console.log(`Escuchando en el puerto 3000`)
iniciarServer()