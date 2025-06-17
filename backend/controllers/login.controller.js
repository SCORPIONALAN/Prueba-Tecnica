import User from "../models/user.model.js";
import { generarToken } from "../lib/utils.js";
// Controlador para la parte de login
export const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const usuario = await User.findOne({email});
        // En caso de que el usuario no exista
        if(!usuario) return res.status(404).json({mensaje: "No existe user"});
        // Una vez confirmado su correo
        // Comprobamos su contraseña, en caso de que no sea la misma mostramos el mismo mensaje para no dar pista a atacantes de que esta mal
        if(usuario.password != password) return res.status(404).json({mensaje: "Credenciales no validas"});
        generarToken(usuario._id, res);
        // Respondemos con una creacion de token
        res.status(200).json({
            _id:usuario._id,
            email: usuario.email,
            nombre: usuario.nombre
        })
    } catch (error) {
        console.log("Algo salio mal al iniciar sesion: ", error);
        res.status(500).json({mensaje: "error interno del servidor"});
    }
}

// Controlador para la parte de logout
export const logout = async (req, res) =>{
    try {
        //Vaciamos y expiramos la cookie
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Saliendo de la sesion!"})
    } catch (error) {
        console.log("Algo salio mal en el cerrar sesion: ", error);
        res.status(500).json({mensaje: "error interno del servidor"});
    }
}

// Controlador para checar la autenticacion del usuario
export const checarAutenticado = async (req, res) => {
    try {
        //Enviamos el usuario de nuevo al cliente con el fin de siempre checar su cookie
        res.status(200).json(req.usuario)
    } catch (error) {
        console.log("Algo salio mal en la autenticacion: ", error);
        res.status(500).json({mensaje: "error interno del servidor"});
    }
}