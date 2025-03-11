import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ListaUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();
    const handleDelete = async (usuarioId) => {
        const response = await fetch(
            `http://localhost:9000/api/usuario/${usuarioId}`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            setUsuarios(
                usuarios.filter((usuario) => usuario._id !== usuarioId)
            );
            console.log("Usuario eliminado");
        } else {
            console.log("Error al eliminar usuario");
        }
    };

    const handleEdit = (usuarioId) => {
        // Redirige a la página de edición pasando el id del usuario
        navigate(`/edit/${usuarioId}`);
    };

    useEffect(() => {
        const fetchUsuarios = async () => {
            const response = await fetch("http://localhost:9000/api/usuario/");
            const data = await response.json();
            setUsuarios(data);
        };

        fetchUsuarios();
    }, []);
    return (
        <main className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Lista de Usuarios
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {usuarios.map((usuario) => (
                    <div
                        key={usuario._id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
                    >
                        <div className="relative">
                            <img
                                src={usuario.imagen}
                                alt="x"
                                className="w-full h-48 object-cover"
                            />

                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                                <h2 className="text-xl font-bold">
                                    {usuario.nombre} {usuario.apellido}
                                </h2>
                                <p className="text-sm">{usuario.edad} años</p>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-700">
                                <strong>Correo:</strong> {usuario.correo}
                            </p>
                            <p className="text-gray-700">
                                <strong>Teléfono:</strong> {usuario.telefono}
                            </p>
                            <div className="mt-4 flex flex-row justify-end space-x-4">
                                <button
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-all duration-300 hover:cursor-pointer"
                                    onClick={() => handleEdit(usuario._id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-all duration-300 hover:cursor-pointer"
                                    onClick={() => {
                                        handleDelete(usuario._id);
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
