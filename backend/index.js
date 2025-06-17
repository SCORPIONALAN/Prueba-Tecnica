import express from 'express';
import dotenv from "dotenv";
import { conexionDB } from './lib/db.js';
import autenticacion from "./routes/autenticacion.route.js";
import inicio from "./routes/inicio.routes.js";
import path from "path";
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve()

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

// Rutas
app.use("/api/autenticacion", autenticacion);
app.use("/api/inicio", inicio);

// Vistas
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    //EntryPoint de la aplicacion en React
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

// Puerto y conexion a la base de datos
app.listen(PORT, ()=>{
    //Parte encargada a la conexion de mi base de datos
    conexionDB();
    console.log("servidor corriendo");
})

