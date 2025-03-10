import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        try {
            // Simulación de autenticación (reemplazar con API real)
            if (email === "admin@example.com" && password === "password") {
                alert("Inicio de sesión exitoso");
            } else {
                throw new Error("Credenciales incorrectas");
            }
        } catch (err) {
            setError(err.message);
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
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}
                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
