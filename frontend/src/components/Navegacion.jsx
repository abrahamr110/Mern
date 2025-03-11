import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navegacion() {
    const { logout } = useAuth();

    return (
        <header className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="text-white font-bold text-xl hover:text-gray-200 transition-colors duration-200"
                >
                    INICIO
                </Link>
                <nav>
                    <ul className="flex space-x-6 items-center justify-center">
                        <li className="text-white hover:text-gray-200 cursor-pointer transition-colors duration-200">
                            <Link
                                to="/crearUsuario"
                                className="text-lg font-medium"
                            >
                                Crear usuario
                            </Link>
                        </li>
                        <li className="text-white hover:text-gray-200 transition-colors duration-200">
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:cursor-pointer"
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
