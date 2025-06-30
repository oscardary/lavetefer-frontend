import type { IMascota } from "@/types/Mascota";

const APIURL = `${import.meta.env.VITE_APIURL}/mascota`;

export async function getMascotas() {
    const res = await fetch(APIURL);
    if (!res.ok) throw new Error("Error al obtener mascotas");
    return res.json();
};

export const crearMascota = async (mascota: IMascota) => {
    const resp = await fetch(APIURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mascota)
    });

    if (!resp.ok) {
        const eBody = await resp.json().catch(() => null);
        const message = eBody?.message || "Error desconocido de servidor";
        throw new Error(message);
    }

    return await resp.json();
};

export const obtenerMascotasPorId = async (id: number) => {
    const resp = await fetch(`${APIURL}/${id}`);
    if (!resp.ok) throw new Error("Mascota no encontrada");
    return await resp.json();
};

export const actualizarMascota = async (id: number, mascota: IMascota) => {
    const resp = await fetch(`${APIURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mascota)
    });
    if (!resp.ok) throw new Error("Error al actualizar mascota");
    return await resp.json();
};

export const eliminarMascota = async (id: number) => {
    const resp = await fetch(`${APIURL}/${id}`, {
        method: "DELETE"
    });
    if (!resp.ok) throw new Error("Error al eliminar mascota");
};