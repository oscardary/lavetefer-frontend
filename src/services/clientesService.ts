import type { interfaceCliente } from "../types/Cliente";

const API_URL = "http://localhost:3000/api/cliente";

export async function getClientes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener clientes");
  return res.json();
}

export const crearCliente = async (cliente: interfaceCliente) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.message || "Error desconocido del servidor";
    throw new Error(message);
  }

  return await response.json();
};

export const obtenerClientePorId = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Cliente no encontrado");
  return await res.json();
};

export const actualizarCliente = async (id: number, cliente: interfaceCliente) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  if (!res.ok) throw new Error("Error al actualizar cliente");
  return await res.json();
};

export const eliminarCliente = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error eliminando cliente');
  }
};
