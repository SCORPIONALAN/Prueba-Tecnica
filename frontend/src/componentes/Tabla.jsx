import React, { useEffect, useState } from 'react';
import { instanciaAxios } from '../lib/axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Tabla = () => {
  const [usuarios, setUsuarios] = useState([]); // Estado de usuarios inicialmente vacio
  const [busqueda, setBusqueda] = useState(""); // Estado del input de búsqueda
  const navigate = useNavigate();

  // Al cargar la pagina lo primero que hara sera buscar a todos los usuarios
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await instanciaAxios.get("/inicio/users");
        setUsuarios(res.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error.message);
      }
    };

    obtenerUsuarios();
  }, []);

  // Funcion a ejecutar cuando queremos eliminar un elemento
  const eliminarElemento = async (id) => {
    try {
      await instanciaAxios.delete(`/inicio/delete-user/${id}`); // Mandamos a llamar al endpoint de borrado
      setUsuarios(prev => prev.filter(usuario => usuario._id !== id)); //Hacemos un refresh de la pagina sin ese usuario, haciendo una copia sin el elemento previo
      toast.success("Usuario Eliminado correctamente"); //Anuncio de eliminacion
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
    }
  };

  // Funcion para buscar por nombre
  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) // Búsqueda en tiempo real
  );

  return (
    <div className="container mt-0">
      <div className='d-flex justify-content-between align-items-center mt-5 mb-2'>
        <h2>Lista de Usuarios</h2>
        <Link to="/create-user" className="btn btn-outline-primary me-2 ">
          Crea un usuario
        </Link>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Conditional Rendering para mostrar o no usuarios */}
          {usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map(usuario => (
              <tr key={usuario._id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellidoPaterno}</td>
                <td>{usuario.apellidoMaterno || "-"}</td>
                <td>
                  {usuario.direccion?.calle}, {usuario.direccion?.numero}, {usuario.direccion?.colonia}, {usuario.direccion?.cp}, {usuario.direccion?.municipio}, {usuario.direccion?.estado}
                </td>
                <td>{usuario.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning w-100 mb-1"
                    onClick={() => navigate(`/edit-user/${usuario._id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger w-100"
                    onClick={() => eliminarElemento(usuario._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No hay usuarios que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
