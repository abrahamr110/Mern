const { Router } = require("express");
const router = Router();
const {
    getAll,
    getById,
    create,
    update,
    delete: deleteUsuario,
    login,
} = require("../controller/usuario.controller");

const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

// Configuración de Multer para manejo de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + req.body.correo + path.extname(file.originalname)
        );
    },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes"), false);
    }
};

const upload = multer({ storage, fileFilter });

// Middleware de protección (Autenticación JWT)
const protect = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res
            .status(401)
            .json({ error: "No autorizado, no se proporcionó token" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secreto_jwt"
        );
        req.usuario = decoded; // Añadimos el usuario decodificado al request
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token no válido" });
    }
    return next();
};

// Rutas para usuarios
router
    .route("/")
    .get(protect, getAll) // Se protege la ruta para obtener todos los usuarios
    .post(upload.single("imagen"), create); // Crea un nuevo usuario con imagen

router
    .route("/:id")
    .get(protect, getById) // Se protege la ruta para obtener un usuario por ID
    .put(upload.single("imagen"), update) // Actualiza un usuario por ID
    .delete(protect, deleteUsuario); // Elimina un usuario por ID (protegido)

// Ruta de login
router.post("/login", login); // Llama al controlador login para manejar el login

module.exports = router;
