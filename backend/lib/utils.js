import jwt from "jsonwebtoken";
export const generarToken = (usuarioId, res)=>{
    // Generación del JWT, para algo mas seguro establecemos un secreto
    const token = jwt.sign({usuarioId}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, // 7 dias expresados en milisegundos
        httpOnly: true, //Prevencion de XSS
        sameSite: "strict", //Prevencion CSRF
        secure: process.env.NODE_ENV !== "development" // Solamente sera seguro cuando mandemos a produccion

    });
    return token;
}