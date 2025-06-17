import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import { instanciaAxios } from '../lib/axios';
import toast from 'react-hot-toast';

const CrearUsuario = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    direccion:{
      calle: "",
      numero: "",
      colonia: "",
      cp: "",
      municipio: "",
      estado:""
    },
    email: ""
  });


  // Edicion del usuario con put
  const crearUsuario = async (e) => {
    e.preventDefault();
    console.log(usuario);
    if (!usuario.nombre || !usuario.apellidoPaterno || !usuario.direccion.calle || !usuario.direccion.colonia || !usuario.direccion.cp || !usuario.email) {
      return toast.error('Los campos de nombre, apellido paterno, calle, colonia, cp y email son obligatorios');
    }
    try {
      await instanciaAxios.post(`/inicio/user`, usuario);
      toast.success("Usuario registrados correctamente");
      navigate("/"); // Redirigimos una vez terminada la accion
    } catch (error) {
      console.error("Error al crear usuario:", error.message);
      toast.error("Error al crear usuario");
    }
  };

    return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Editar Usuario</h2>
        <form onSubmit={crearUsuario} className="card shadow p-4">
          <fieldset className="mb-3">
            <legend className="h5">Datos Personales</legend>

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" value={usuario.nombre} onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })} />
            </div>

            <div className="mb-3">
              <label htmlFor="apellidoPaterno" className="form-label">Apellido Paterno</label>
              <input type="text" className="form-control" id="apellidoPaterno" value={usuario.apellidoPaterno} onChange={(e) => setUsuario({ ...usuario, apellidoPaterno: e.target.value })} />
            </div>

            <div className="mb-3">
              <label htmlFor="apellidoMaterno" className="form-label">Apellido Materno</label>
              <input type="text" className="form-control" id="apellidoMaterno" value={usuario.apellidoMaterno} onChange={(e) => setUsuario({ ...usuario, apellidoMaterno: e.target.value })} />
            </div>
          </fieldset>

          <fieldset className="mb-3">
            <legend className="h5">Dirección</legend>

            <div className="mb-3">
              <label htmlFor="calle" className="form-label">Calle</label>
              <input type="text" className="form-control" id="calle" value={usuario.direccion.calle} onChange={(e) => setUsuario({ ...usuario, direccion:{...usuario.direccion, calle: e.target.value} })} />
            </div>

            <div className="mb-3">
              <label htmlFor="numero" className="form-label">Número</label>
              <input type="text" className="form-control" id="numero" value={usuario.direccion.numero} onChange={(e) => setUsuario({ ...usuario,  direccion:{...usuario.direccion, numero: e.target.value} })} />
            </div>

            <div className="mb-3">
              <label htmlFor="colonia" className="form-label">Colonia</label>
              <input type="text" className="form-control" id="colonia" value={usuario.direccion.colonia} onChange={(e) => setUsuario({ ...usuario,  direccion:{...usuario.direccion, colonia: e.target.value} })} />
            </div>

            <div className="mb-3">
              <label htmlFor="cp" className="form-label">Código Postal</label>
              <input type="text" className="form-control" id="cp" value={usuario.direccion.cp} onChange={(e) => setUsuario({ ...usuario, direccion:{...usuario.direccion, cp: e.target.value}})} />
            </div>

            <div className="mb-3">
              <label htmlFor="municipio" className="form-label">Municipio</label>
              <input type="text" className="form-control" id="municipio" value={usuario.direccion.municipio} onChange={(e) => setUsuario({ ...usuario, direccion:{...usuario.direccion, municipio: e.target.value} })} />
            </div>

            <div className="mb-3">
              <label htmlFor="estado" className="form-label">Estado</label>
              <input type="text" className="form-control" id="estado" value={usuario.direccion.estado} onChange={(e) => setUsuario({ ...usuario, direccion:{...usuario.direccion, estado: e.target.value} })} />
            </div>

          </fieldset>

          <fieldset className="mb-3">
            <legend className="h5">Contacto</legend>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={usuario.email} onChange={(e) => setUsuario({ ...usuario, email: e.target.value })} />
            </div>
          </fieldset>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearUsuario;
