import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navegacion() {
    const { logout } = useAuth();

    return (
        <header className="bg-gray-800 flex justify-between items-center p-4">
            <Link to="/" className="text-white font-bold">
                INICIO
            </Link>
            <nav className="flex justify-between items-center">
                <ul className="flex flex-row gap-4">
                    <li className="text-white hover:text-gray-300">
                        <Link to="/crearUsuario">Crear usuario</Link>
                    </li>
                    <li className="text-white hover:text-gray-300">
                        <button onClick={logout}>Cerrar sesión</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
