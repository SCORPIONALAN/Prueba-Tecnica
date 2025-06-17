import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const usuarioAutenticado = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ mensaje: "No estás autenticado!" });
        }

        // Decodificamos el Token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Comprobamos que el token sea valido
        if (!decodedToken || !decodedToken.usuarioId) {
            return res.status(401).json({ mensaje: "Token inválido" });
        }

        // Buscar usuario en la base de datos, trayendo toda su informacion menos la contraseña.
        const usuario = await User.findById(decodedToken.usuarioId).select("-password");

        if (!usuario) {
            return res.status(404).json({ mensaje: "El usuario no existe" });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log("Error durante el middleware", error.message);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};
