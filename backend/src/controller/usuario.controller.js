const usuarioCtrl = {};

const Usuario = require("../models/usuario");
const fs = require("fs");

usuarioCtrl.getAll = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error });
    }
};

usuarioCtrl.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error });
    }
};

usuarioCtrl.create = async (req, res) => {
    try {
        const { nombre, apellido, edad, telefono, correo, contrasena } =
            req.body;

        if (
            !nombre ||
            !apellido ||
            !edad ||
            !telefono ||
            !correo ||
            !contrasena
        ) {
            return res.status(400).json({ error: "Faltan campos" });
        }

        let imagePath = null;
        if (req.file) {
            imagePath = req.file.path;
        }

        const newUsuario = new Usuario({
            nombre,
            apellido,
            edad,
            telefono,
            correo,
            contrasena,
            imagen: imagePath,
        });

        await newUsuario.save();

        res.status(201).json(newUsuario);
    } catch (error) {
        res.status(500).json({ error });
    }
};

usuarioCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, edad, telefono, correo, contrasena } =
            req.body;

        if (
            !nombre ||
            !apellido ||
            !edad ||
            !telefono ||
            !correo ||
            !contrasena
        ) {
            return res.status(400).json({ error: "Faltan campos" });
        }

        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        if (usuario.imagen) {
            fs.unlink(usuario.imagen, (err) => {
                if (err) throw err;
            });
        }

        let imagePath = null;
        if (req.file) {
            imagePath = req.file.path;
        }

        const updatedUsuario = await Usuario.findByIdAndUpdate(
            id,
            {
                nombre,
                apellido,
                edad,
                telefono,
                correo,
                contrasena,
                imagen: imagePath,
            },
            { new: true }
        );

        res.status(200).json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ error });
    }
};

usuarioCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);
        const imagen = usuario.imagen;
        if (imagen) {
            fs.unlink(imagen, (err) => {
                if (err) throw err;
            });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error });
    }
};

usuarioCtrl.login = async (req, res) => {
    try {
        console.log("Datos recibidos en el backend:", req.body);
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({ error: "Faltan campos" });
        }

        // Buscar al usuario por correo
        const usuario = await Usuario.findOne({ correo });
        console.log("Usuario encontrado en la base de datos:", usuario);

        if (!usuario) {
            return res.status(401).json({ error: "Correo incorrecto" });
        }

        // Comparar la contraseña
        const isMatch = await usuario.compararContrasena(contrasena);
        console.log("¿Contraseña correcta?:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                id: usuario.id,
                correo: usuario.correo,
            },
        });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = usuarioCtrl;
