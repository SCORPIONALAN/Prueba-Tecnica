import mongoose from "mongoose";
export const conexionDB = async () =>{
    try {
        const conexion = await mongoose.connect(process.env.MONGO_URL);
        console.log("conexion existosa!!!");
    } catch (error) {
        console.log("Algo me fallo: " + error)
    }
}