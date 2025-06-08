import { useEffect, useState } from "react";
import { getClientes } from "../services/clientesService";
import type { interfaceCliente } from "../types/Cliente";
import { Link } from "react-router-dom";

/*
const Clientes = () => <div className="p-4">Gestión de Clientes</div>;
export default Clientes;*/

export default function Clientes() {
  const [clientes, setClientes] = useState<interfaceCliente[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    getClientes().then(setClientes).catch(console.error);
  }, []);

  const clientesFiltrados = clientes.filter((cliente) =>
    `${cliente.cli_nombre} ${cliente.cli_apellido}`
      .toLowerCase()
      .includes(busqueda.toLowerCase()) ||
    cliente.doc_numero.includes(busqueda)
  );

  /*return (
    <div>
      <div className="p-4">Gestión de Clientes</div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
          <li
            key={cliente.id}
            className="flex items-center justify-between border-b py-2"
          >
            <span>
              {cliente.cli_nombre} {cliente.cli_apellido}
            </span>
            <Link
              to={`/clientes/editar/${cliente.id}`}
              className="text-blue-500 hover:text-blue-700"
              title="Editar cliente"
            >
               Edit
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/clientes/nuevo"
        className="bg-green-500 text-white p-2 rounded"
      >
        + Nuevo Cliente
      </Link>
    </div>
  );*/

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Clientes</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nombre o documento..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <Link
          to="/clientes/nuevo"
          className="bg-green-500 text-white p-2 rounded"
        >
          + Nuevo Cliente
        </Link>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Documento</th>
            <th className="p-2 border">Ciudad</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-gray-50">
              <td className="p-2 border">
                {cliente.cli_nombre} {cliente.cli_apellido}
              </td>
              <td className="p-2 border">{cliente.doc_tipo} {cliente.doc_numero}</td>
              <td className="p-2 border">{cliente.id_ciudad}</td>
              <td className="p-2 border space-x-2">
                <Link
                  to={`/clientes/editar/${cliente.id}`}
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
