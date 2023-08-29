import express from "express";
const app = express();

import conexion from "./config/database.js"
import router from "./routes/routes.js"

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
app.use(router)
app.listen(3000)

console.log(`Escuchando en el puerto 3000`)
iniciarServer()