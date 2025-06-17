import express from "express";
import {checarAutenticado, login, logout} from "../controllers/login.controller.js";
import { usuarioAutenticado } from "../middlewares/usuarioAuth.middleware.js";
const router = express.Router();
router.post("/login", login);
router.post("/logout", logout)
router.get("/check", usuarioAutenticado, checarAutenticado);
export default router;