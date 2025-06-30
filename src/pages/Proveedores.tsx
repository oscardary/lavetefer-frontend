import { useEffect, useState } from "react";
import { getProveedores } from "../services/proveedoresServices";
import type { interfaceProveedores } from "../types/Proveedor";
import { Link } from "react-router-dom";

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<interfaceProveedores[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    getProveedores().then(setProveedores).catch(console.error);
  }, []);

  const proveedoresFiltrados = proveedores.filter((proveedor) =>
      `${proveedor.doc_numero} ${proveedor.prov_nombre}`
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
        proveedor.contacto_nombre.includes(busqueda) ||
        proveedor.contacto_numero.includes(busqueda)
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Proveedores</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nombre o documento..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <Link
          to="/proveedores/nuevo"
          className="bg-green-500 text-white p-2 rounded"
        >
          + Nuevo Proveedor
        </Link>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Contacto</th>
            <th className="p-2 border">Numero</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedoresFiltrados.map((proveedor) => (
            <tr key={proveedor.id} className="hover:bg-gray-50">
              <td className="p-2 border">
                {proveedor.doc_numero} - {proveedor.prov_nombre}
              </td>
              <td className="p-2 border">{proveedor.contacto_nombre}</td>
              <td className="p-2 border">{proveedor.contacto_numero}</td>
              <td className="p-2 border space-x-2">
                <Link
                  to={`/proveedores/editar/${proveedor.id}`}
                  className="text-blue-600 hover:underline"
                >
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