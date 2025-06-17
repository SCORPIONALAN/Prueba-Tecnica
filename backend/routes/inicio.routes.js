import express from "express";
import { usuarioAutenticado } from "../middlewares/usuarioAuth.middleware.js";
import { buscarUsuario, crearUsuario, eliminarUsuario, updateUsuario, verUsuarios } from "../controllers/usuariosCRUD.controller.js";
const router = express.Router();
// Rutas para el CRUD
router.get("/users", usuarioAutenticado, verUsuarios);
router.get("/user/:id", usuarioAutenticado, buscarUsuario);
router.post("/user", usuarioAutenticado, crearUsuario);
router.put("/edit-user/:id", usuarioAutenticado , updateUsuario);
router.delete("/delete-user/:id", usuarioAutenticado, eliminarUsuario);

export default router;