import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearMascota } from '@/services/mascotasServices';
import type { interfaceClienteId } from '@/types/Cliente';
import { getClientes } from "../services/clientesService";

const CrearMascota = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propietario: 0,
    nombre: '',
    especie: '',
    raza: '',
    sexo: '',
    color: '',
    complemento: '',
    fecha_nacimiento: '', //new Date("1900-01-01"),
    edad: 0,
    procedencia: '',
  });

  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.propietario) errors.propietario = 'El propietario es requerido';
    if (!formData.nombre) errors.nombre = 'Nombre de mascota es requerido';
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await crearMascota(formData);
      navigate('/mascotas');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado');
      }
    }
  };

  //Consultar y filtrar campo propietario
  const [clientes, setClientes] = useState<interfaceClienteId[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<interfaceClienteId[]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);


  //Consulta principal de propietarios (clientes)
  useEffect(() => {
    getClientes().then(setClientes).catch(console.error);
  }, []);

  //Filtrar los propietarios (clientes)
  useEffect(() => {
    console.log("Buscando:", busqueda);
    console.log("Clientes disponibles para filtrar:", clientes);

    if (busqueda.trim() === "") {
      setResultados([]);
      setMostrarResultados(false);
      return;
    }
  
    const filtrados = clientes.filter((cliente) =>
      `${cliente.id} ${cliente.doc_numero} ${cliente.cli_nombre} ${cliente.cli_apellido}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
  
    console.log("Resultados filtrados:", filtrados);
    setResultados(filtrados);
    setMostrarResultados(true); // solo si hay algo escrito
  }, [busqueda, clientes]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear Mascota</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Buscar propietario</label>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => {
              console.log("Usuario escribe:", e.target.value);
              setBusqueda(e.target.value);
            }}
            placeholder="Buscar cliente"
            className="border p-2 rounded w-full"/>

          {mostrarResultados && resultados.length > 0 && (
            <ul className="border mt-1 max-h-40 overflow-auto rounded bg-white shadow">
              {resultados.map((cliente) => (
                <li
                  key={cliente.id}
                  onClick={() => {
                    setFormData({ ...formData, propietario: cliente.id });
                    setBusqueda(`${cliente.cli_nombre} ${cliente.cli_apellido}`);
                    // Retrasa el cierre de la lista, permite completar el click
                    setTimeout(() => {
                      setMostrarResultados(false);
                      setResultados([]);
                    }, 50);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer">
                  {cliente.doc_numero} - {cliente.cli_nombre} {cliente.cli_apellido}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label>Nombre de mascota *</label>
          <input
            type="text"
            name="nombre"
            placeholder="Escriba aquí..."
            value={formData.nombre}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          {formErrors.nombre && (
            <p className="text-red-500 text-sm">{formErrors.nombre}</p>
          )}
        </div>

        <input
          type="text"
          name="especie"
          placeholder="Especie"
          value={formData.especie}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="raza"
          placeholder="Raza"
          value={formData.raza}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <div>
          <label>Sexo *</label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Seleccione</option>
            <option value="H">Hembra</option>
            <option value="M">Macho</option>
          </select>
          {formErrors.sexo && (
            <p className="text-red-500 text-sm">{formErrors.sexo}</p>
          )}
        </div>

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="complemento"
          placeholder="Datos adicionales"
          value={formData.complemento}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="fecha_nacimiento"
          placeholder="Fecha de nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Guardar Mascota
        </button>
      </form>
    </div>
  );
};

export default CrearMascota;