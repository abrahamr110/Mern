import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CrearUsuario() {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:9000/api/usuario/${id}`)
                .then((res) => res.json())
                .then((data) => setUsuario(data))
                .catch(() => toast.error("Error al cargar el usuario"));
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const response = await fetch(
            `http://localhost:9000/api/usuario/${id ? id : ""}`,
            {
                method: id ? "PUT" : "POST",
                body: formData,
            }
        );

        if (response.ok) {
            toast.success(
                id
                    ? "Usuario actualizado correctamente"
                    : "Usuario creado correctamente"
            );
            if (!id) event.target.reset();
        } else {
            toast.error(
                "Error al " + (id ? "actualizar" : "crear") + " el usuario"
            );
        }
    };

    return (
        <main className="flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
                    {id ? "Editando usuario" : "Crear Usuario"}
                </h1>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div>
                        <label htmlFor="nombre" className="block text-gray-600">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            defaultValue={usuario?.nombre || ""}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="apellido"
                            className="block text-gray-600"
                        >
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            defaultValue={usuario?.apellido || ""}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="edad" className="block text-gray-600">
                            Edad
                        </label>
                        <input
                            type="number"
                            id="edad"
                            name="edad"
                            min={1}
                            defaultValue={usuario?.edad || ""}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="correo" className="block text-gray-600">
                            Correo
                        </label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            defaultValue={usuario?.correo || ""}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="contrasena"
                            className="block text-gray-600"
                        >
                            Contraseña
                        </label>
                        <input
                            type="contrasena"
                            id="contrasena"
                            name="contrasena"
                            defaultValue={usuario?.contrasena || ""}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="telefono"
                            className="block text-gray-600"
                        >
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            defaultValue={usuario?.telefono || ""}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="imagen" className="block text-gray-600">
                            Imagen
                        </label>
                        <input
                            type="file"
                            id="imagen"
                            name="imagen"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        {id ? "Actualizar" : "Crear"}
                    </button>
                </form>
            </div>
        </main>
    );
}
