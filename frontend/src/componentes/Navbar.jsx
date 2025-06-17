import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { useEffect } from 'react';

const Navbar = () => {
  const { authUser, logout, usuarioNombre, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  //Carga inicial de la pagina para rescatar el nombre del usuario que esta modificando
  useEffect(()=>{
    checkAuth();
  }, [usuarioNombre]);

  // Funcion que se manda a llamar una vez cuando se quiere cerrar sesion
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mt-0 sticky-top">
      <div className="container">
        <div className='d-flex gx-2 align-items-center'>
          <img src='/logoEntrevista.png' alt= "logo de mi empresa" style={{ height: '80px', width: 'auto' }}/>
          <h1 className="navbar-brand fw-bold fs-3">Bienvenido {usuarioNombre? usuarioNombre: ""}</h1>
        </div>
        {authUser && (
          <div className="d-flex">
            <Link to="/" className="btn btn-outline-primary me-2">
              Inicio
            </Link>
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
