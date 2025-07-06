import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  actualizarMascota,
  eliminarMascota,
  obtenerMascotasPorId
} from "../services/mascotasServices";

const EditarMascota = () => {
  const { id } = useParams<{ id: string }>();
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const cargarMascota = async () => {
      try {
        if (id) {
          const mascota = await obtenerMascotasPorId(Number(id));
          setFormData(mascota);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error inesperado");
        }
      } finally {
        setLoading(false);
      }
    };
    cargarMascota();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (id) {
        //await actualizarCliente(Number(id), { ...formData, idCliente: Number(id) });
        await actualizarMascota(Number(id), formData);
        navigate("/mascotas");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("mensaje: " + err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    }
  };

  const handleDelete = async () => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta mascota?");
    if (!confirmacion || !id) return;
  
    try {
      await eliminarMascota(Number(id));
      navigate('/mascotas');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado al eliminar");
      }
    }
  };  

  if (loading) return <p>Cargando mascota...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Editar Mascota</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label>Propietario *</label>
          <select
            name="propietario"
            value={formData.propietario}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required>
            <option value="">Seleccione</option>
          </select>
          {formErrors.propietario && (
            <p className="text-red-500 text-sm">{formErrors.propietario}</p>
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
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Eliminar Proveedor
        </button>
      </form>
    </div>
  );
};

export default EditarMascota;
