const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            trim: true,
        },
        apellido: {
            type: String,
            required: [true, "El apellido es obligatorio"],
            trim: true,
        },
        edad: {
            type: Number,
            required: [true, "La edad es obligatoria"],
            min: [18, "Debes tener al menos 18 años"],
        },
        telefono: {
            type: String,
            required: [true, "El teléfono es obligatorio"],
            match: [
                /^\d{10,15}$/,
                "El teléfono debe tener entre 10 y 15 dígitos",
            ],
        },
        correo: {
            type: String,
            required: [true, "El correo es obligatorio"],
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "El correo debe tener un formato válido"],
        },
        contrasena: {
            type: String,
            required: [true, "La contraseña es obligatoria"],
            minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
        },
        imagen: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Middleware para hashear la contraseña antes de guardar
UsuarioSchema.pre("save", async function (next) {
    if (!this.isModified("contrasena")) return next();
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
});

// Método para comparar contraseñas
UsuarioSchema.methods.compararContrasena = async function (
    contrasenaIngresada
) {
    return await bcrypt.compare(contrasenaIngresada, this.contrasena);
};

module.exports = model("usuario", UsuarioSchema);
