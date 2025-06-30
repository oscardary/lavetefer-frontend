import type { interfaceProveedores } from "@/types/Proveedor";

const APIURL = `${import.meta.env.VITE_APIURL}/proveedor`; //"http://localhost:3000/api/cliente";

export async function getProveedores() {
    const res = await fetch(APIURL);
    if (!res.ok) throw new Error("Error al obtener proveedores");
    return res.json();
};

export const crearProveedor = async (proveedor: interfaceProveedores) => {
  const response = await fetch(APIURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(proveedor),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.message || "Error desconocido del servidor";
    throw new Error(message);
  }

  return await response.json();
};

export const obtenerProveedorPorId = async (id: number) => {
  const res = await fetch(`${APIURL}/${id}`);
  if (!res.ok) throw new Error("Proveedor no encontrado");
  return await res.json();
};

export const actualizarProveedor = async (id: number, proveedor: interfaceProveedores) => {
  const res = await fetch(`${APIURL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(proveedor)
  });
  if (!res.ok) throw new Error("Error al actualizar proveedor");
  return await res.json();
};

export const eliminarProveedor = async (id: number): Promise<void> => {
  const res = await fetch(`${APIURL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar proveedor");
  return await res.json();
};