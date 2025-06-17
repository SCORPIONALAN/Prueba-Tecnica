import UsuarioCRUD from "../models/crudUsers.model.js";

// Obtener todos los usuarios

export const verUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioCRUD.find({});
    if (usuarios.length === 0)
      return res.status(200).json({ mensaje: "No hay usuarios disponibles" });
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: "Error del servidor", error: err.message });
  }
};

// Obtener un usuario por ID de mongo
export const buscarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await UsuarioCRUD.findById(id);
    if (!usuario)
      return res.status(404).json({ mensaje: "No existe el usuario" });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(400).json({ mensaje: "ID no válido", error: err.message });
  }
};

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  console.log(req.body)
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno: apellidoMaterno,
    direccion,
    email,
  } = req.body;
  const {calle, numero, colonia,cp, municipio, estado} = direccion || {}; // Destructuracion de direccion

  if (!nombre || !apellidoPaterno || !calle || !colonia || !cp || !email) {
    return res.status(400).json({ mensaje: "Faltan campos requeridos" });
  }

  try {
    const usuario = new UsuarioCRUD({
      nombre,
      apellidoPaterno,
      apellidoMaterno: apellidoMaterno || "No tiene",
      direccion: {
        calle,
        numero: numero || "N/A No.",
        colonia,
        cp,
        municipio: municipio || "Municipio no brindado",
        estado: estado || "Estado no brindado",
      },
      email,
    });

    await usuario.save();
    res.status(201).json({ mensaje: "Usuario creado correctamente", usuario });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ mensaje: "Email ya registrado" });

    res.status(500).json({ mensaje: "Error del servidor", error: err.message });
  }
};

// Eliminar usuario por ID
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await UsuarioCRUD.findByIdAndDelete(id);
    if (!eliminado)
      return res.status(404).json({ mensaje: "No existe el usuario" });
    res.status(200).json({ mensaje: "Usuario eliminado correctamente", eliminado });
  } catch (err) {
    res.status(400).json({ mensaje: "ID no válido", error: err.message });
  }
};

// Actualizar usuario (PUT)
export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const datos = req.body;

  try {
    const usuarioActualizado = await UsuarioCRUD.findByIdAndUpdate(
      id,
      datos,
      {
        new: true,
        runValidators: true
      }
    );

    if (!usuarioActualizado)
      return res.status(404).json({ mensaje: "No existe el usuario" });

    res.status(200).json({ mensaje: "Usuario actualizado correctamente", usuario: usuarioActualizado });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ mensaje: "Email ya registrado" });

    if (err.kind === "ObjectId")
      return res.status(400).json({ mensaje: "ID no válido", error: err.message });

    res.status(500).json({ mensaje: "Error del servidor", error: err.message });
  }
};
