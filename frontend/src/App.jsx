import { Routes, Route, useLocation } from "react-router-dom";
import Navegacion from "./components/Navegacion";
import ListaUsuario from "./components/ListaUsuario";
import CrearUsuario from "./components/CrearUsuario";
import Login from "./components/Login";
import { Toaster } from "sonner";

export default function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <>
            {!isLoginPage && <Navegacion />}
            {!isLoginPage && <Toaster />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ListaUsuario />} />
                <Route path="/crearUsuario" element={<CrearUsuario />} />
                <Route path="/edit/:id" element={<CrearUsuario />} />
            </Routes>
        </>
    );
}
