import React, { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../componentes/Navbar';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login, isLoggingIn } = useAuthStore();

  const iniciarSesion = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error('Todos los campos son obligatorios');
    }
    login(formData);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Iniciar Sesión</h3>
                <p>
                  Bienvenido a la prueba técnica de Alan Giovanni Torres Mora.
                  No se encontró cookie para loguearte en automático, favor de iniciar sesión.
                </p>
                <form onSubmit={iniciarSesion}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      autoFocus
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    {isLoggingIn ? 'Ingresando...' : 'Ingresar'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
