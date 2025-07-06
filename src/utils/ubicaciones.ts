import ciudades from '@/data/colombia_ciudades.json';

export const getCiudad = (texto: string) => {
    return ciudades.filter((item) => `${item.ciudad} ${item.departamento} ${item.codigo}`
            .toLowerCase()
            .includes(texto.toLowerCase())
    );
};