import axios from 'axios';

export const instanciaAxios = axios.create({
    // URL dinamico que conecta al backend ya sea en desarrollo o produccion
    baseURL: import.meta.env.MODE === "development"? "http://localhost:3000/api" : "/api",
    // Aprobar el envio de cookies por request
    withCredentials: true
})