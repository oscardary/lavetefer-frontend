import { useEffect, useState } from "react";
import { getMascotas } from "../services/mascotasServices";
import type { IMascotaExt } from "../types/Mascota";
import { Link } from "react-router-dom";

export default function Mascotas() {
  const [mascotas, setMascotas] = useState<IMascotaExt[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    getMascotas().then(setMascotas).catch(console.error);
  }, []);

  const mascotasFiltrados = mascotas.filter((mascota) =>
      `${mascota.id} ${mascota.nombre}`
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
        mascota.color.includes(busqueda) ||
        mascota.especie.includes(busqueda) ||
        //Como buscar por un propietario cuando este está en otra entidad?
        `${mascota.fk_propietario.cli_nombre} ${mascota.fk_propietario.cli_apellido}`
        .toUpperCase().includes(busqueda.toUpperCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Mascotas</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nombre, documento o propietario..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <Link
          to="/mascotas/nuevo"
          className="bg-green-500 text-white p-2 rounded"
        >
          + Nueva Mascota
        </Link>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Especie</th>
            <th className="p-2 border">Raza</th>
            <th className="p-2 border">Sexo</th>
            <th className="p-2 border">Propietario</th>
            <th className="p-2 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {mascotasFiltrados.map((mascota) => (
            <tr key={mascota.id} className="hover:bg-gray-50">
              <td className="p-2 border">{mascota.nombre}</td>
              <td className="p-2 border">{mascota.especie}</td>
              <td className="p-2 border">{mascota.raza}</td>
              <td className="p-2 border">{mascota.sexo}</td>
              <td className="p-2 border">{mascota.fk_propietario.cli_nombre} {mascota.fk_propietario.cli_apellido}</td>
              <td className="p-2 border space-x-2">
                <Link
                  to={`/mascotas/editar/${mascota.id}`}
                  className="text-blue-600 hover:underline">
                  Editar
                </Link>
                {/* Puedes añadir un botón de eliminar si quieres aquí */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}