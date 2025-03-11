import { Routes, Route, useLocation } from "react-router-dom";
import Navegacion from "./components/Navegacion";
import ListaUsuario from "./components/ListaUsuario";
import CrearUsuario from "./components/CrearUsuario";
import Login from "./components/Login";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <AuthProvider>
            <>
                {!isLoginPage && <Navegacion />}
                {!isLoginPage && <Toaster />}
                <Routes>
                    {/* Rutas accesibles sin autenticación */}
                    <Route path="/login" element={<Login />} />

                    {/* Rutas accesibles con autenticación */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<ListaUsuario />} />
                        <Route
                            path="/crearUsuario"
                            element={<CrearUsuario />}
                        />
                        <Route path="/edit/:id" element={<CrearUsuario />} />
                    </Route>
                </Routes>
            </>
        </AuthProvider>
    );
}
