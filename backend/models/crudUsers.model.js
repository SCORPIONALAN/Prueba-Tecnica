import mongoose from "mongoose";

const usuarioCRUDSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellidoPaterno: {
      type: String,
      required: true,
    },
    apellidoMaterno: {
      type: String,
      required: false,
    },
    direccion: {
      calle: {
        type: String,
        required: true,
      },
      numero: {
        type: String,
        maxlength: 8,
        required: false,
      },
      colonia: {
        type: String,
        required: true,
      },
      cp: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5,
      },
      municipio: {
        type: String,
        required: true,
        required: false,
      },
      estado: {
        type: String,
        required: false,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Correo no válido'],
    },
  }
);

const UsuarioCRUD = mongoose.model("UsuarioCRUD", usuarioCRUDSchema);
export default UsuarioCRUD;
