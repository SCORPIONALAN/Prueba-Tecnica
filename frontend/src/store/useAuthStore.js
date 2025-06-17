/*
            REACT ESTADOS GLOBALES
    En la aplicacion de react necesitaremos hacer el inicio de sesion y cerrado de sesion asignando los valores a un objeto o elemento de estado.
    Como nuestra aplicacion se va ir moviendo por diversas partes. Si o si necesitaremos de guardar globalmente nuestro objeto con el fin de verificar
    su sesion activa y ya.
*/
import { create } from "zustand";
import { instanciaAxios } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoggingIn: false,
    isCheckingAuth: true,
    usuarioNombre: "",

    // Verificación de la sesión
    checkAuth: async () => {
        try {
            const res = await instanciaAxios.get("/autenticacion/check");
            set({ authUser: res.data, usuarioNombre: res.data.nombre });
        } catch (error) {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    // Login de los usuarios Admin
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await instanciaAxios.post("/autenticacion/login", data);
            set({ authUser: res.data });
            toast.success("Sesión iniciada correctamente");
        } catch (error) {
            toast.error(error?.response?.data?.mensaje || "Error al iniciar sesión");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await instanciaAxios.post("/autenticacion/logout");
            set({ authUser: null, usuarioNombre:"" });
            toast.success("Cuenta cerrada correctamente");
        } catch (error) {
            toast.error(error?.response?.data?.mensaje || "Error al cerrar sesión");
        }
    }
}));