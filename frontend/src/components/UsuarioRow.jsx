import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function UsuarioRow({
    id,
    nombre,
    apellido,
    edad,
    correo,
    telefono,
    imagen,
    usuarios,
    setUsuarios,
}) {
    const deleteUser = async () => {
        const response = await fetch(`http://localhost9000/api/usuario/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            toast.success("Usuario eliminado");
            setUsuarios(usuarios.filter((usuario) => usuario._id != id));
        } else {
            toast.error("Error al eliminar usuario");
        }
    };

    const imageUrl = imagen.startsWith("http")
        ? imagen
        : `http://localhost9000/uploads/${imagen.replace("uploads\\", "")}`;

    return (
        <tr>
            <td className="p-4 border-b">
                <img src={imageUrl} alt="Profile" width={50} />
            </td>
            <td className="p-4 border-b">
                <p className="block font-sans text-sm antialiased font-normal leading-normal">
                    {nombre}
                </p>
            </td>
            <td className="p-4 border-b">
                <p className="block font-sans text-sm antialiased font-normal leading-normal">
                    {apellido}
                </p>
            </td>
            <td className="p-4 border-b">
                <p className="block font-sans text-sm antialiased font-normal leading-normal">
                    {edad}
                </p>
            </td>
            <td className="p-4 border-b">
                <p className="block font-sans text-sm antialiased font-normal leading-normal">
                    {correo}
                </p>
            </td>
            <td className="p-4 border-b">
                <p className="block font-sans text-sm antialiased font-normal leading-normal">
                    {telefono}
                </p>
            </td>
            <td className="p-4 border-b">
                <button
                    onClick={deleteUser}
                    className="font-sans text-sm antialiased font-medium leading-normal cursor-pointer hover:text-red-500 mr-2"
                >
                    Eliminar
                </button>
                <Link
                    className="font-sans text-sm antialiased font-medium leading-normal cursor-pointer hover:text-red-500"
                    to={`/edit/${id}`}
                >
                    Editar
                </Link>
            </td>
        </tr>
    );
}
