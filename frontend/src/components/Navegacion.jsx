import { Link } from "react-router-dom";

export default function Navegacion() {
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
                </ul>
            </nav>
        </header>
    );
}
