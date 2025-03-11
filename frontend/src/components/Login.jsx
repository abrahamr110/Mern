import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        setError("");
        const response = await fetch(
            "http://localhost:9000/api/usuario/login",
            {
                method: "POST",
                body: JSON.stringify({
                    correo: correo,
                    contrasena: contrasena,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            login(data); // Guardar usuario en el contexto
            alert("Inicio de sesión exitoso");
            navigate("/");
        } else {
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-96 p-6 bg-white rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
                        Iniciar Sesión
                    </h2>
                    {error && (
                        <p className="text-red-500 text-sm text-center mb-2">
                            {error}
                        </p>
                    )}
                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            onClick={handleLogin}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold"
                        >
                            Entrar
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
