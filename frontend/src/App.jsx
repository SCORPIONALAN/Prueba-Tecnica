import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore.js';
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import LoginPage from './paginas/LoginPage';
import HomePage from './paginas/HomePage';
import CrearUsuario from './paginas/CrearUsuario.jsx';
import EditarUsuario from './paginas/EditarUsuario.jsx';
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Mostrar algo mientras verificas la sesión (puede ser un spinner, loader o mensaje)
  if (isCheckingAuth) {
    return <p className="text-center mt-5">Verificando sesión...</p>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/edit-user/:id" element={authUser ? <EditarUsuario /> : <Navigate to="/login" />} />
        <Route path="/create-user" element={authUser ? <CrearUsuario/> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
