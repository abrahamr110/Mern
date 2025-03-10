import { useState, useEffect } from "react";
import UsuarioRow from "./UsuarioRow";

export default function ListaUsuario() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const response = await fetch("http://localhost9000/api/usuario/");
            const data = await response.json();
            setUsuarios(data);
        };

        fetchUsuarios();
    }, []);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
            <div>
                <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <table className="w-full text-left table-auto border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                                </th>
                                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        nombre
                                        {/* {data.nombre} */}
                                    </p>
                                </th>
                                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Apellido
                                    </p>
                                </th>
                                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Edad
                                    </p>
                                </th>
                                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Correo
                                    </p>
                                </th>
                                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Teléfono
                                    </p>
                                </th>
                                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <UsuarioRow
                                    key={usuario._id}
                                    id={usuario._id}
                                    nombre={usuario.nombre}
                                    apellido={usuario.apellido}
                                    edad={usuario.edad}
                                    correo={usuario.correo}
                                    telefono={usuario.telefono}
                                    imagen={
                                        usuario.imagen ||
                                        "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                                    }
                                    usuarios={usuarios}
                                    setUsuarios={setUsuarios}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
