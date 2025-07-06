import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearCliente } from '../services/clientesService';
import AutocompleteCiudad from '@/components/AutocompleteCiudad';

const CrearCliente = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    //id: 0,
    doc_tipo: '',
    doc_numero: '',
    cli_nombre: '',
    cli_apellido: '',
    num_contacto1: '',
    num_contacto2: '',
    id_ciudad: '',
    direccion1: '',
    direccion2: '',
    observaciones: '',
  });

  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.doc_tipo) errors.doc_tipo = 'Tipo de documento requerido';
    if (!formData.doc_numero) errors.doc_numero = 'Número de documento requerido';
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
      await crearCliente(formData);
      navigate('/clientes');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado');
      }
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear Cliente</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label>Tipo Documento *</label>
          <select
            name="doc_tipo"
            value={formData.doc_tipo}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Seleccione</option>
            <option value="CC">Cédula (CC)</option>
            <option value="CE">Cédula Extranjera (CE)</option>
            <option value="NIT">NIT</option>
          </select>
          {formErrors.doc_tipo && (
            <p className="text-red-500 text-sm">{formErrors.doc_tipo}</p>
          )}
        </div>

        <div>
          <label>Número Documento *</label>
          <input
            type="text"
            name="doc_numero"
            value={formData.doc_numero}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          {formErrors.doc_numero && (
            <p className="text-red-500 text-sm">{formErrors.doc_numero}</p>
          )}
        </div>

        <input
          type="text"
          name="cli_nombre"
          placeholder="Nombre"
          value={formData.cli_nombre}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="cli_apellido"
          placeholder="Apellido"
          value={formData.cli_apellido}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="num_contacto1"
          placeholder="Número de contacto 1"
          value={formData.num_contacto1}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="num_contacto2"
          placeholder="Número de contacto 2"
          value={formData.num_contacto2}
          onChange={handleChange}
          className="border p-2 rounded"
        />


        <AutocompleteCiudad onSelect={(codigoCiudad) => 
          setFormData((formDataActual) => ({...formDataActual, id_ciudad: codigoCiudad})
        )} />


        <input
          type="text"
          name="direccion1"
          placeholder="Dirección 1"
          value={formData.direccion1}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="direccion2"
          placeholder="Dirección 2"
          value={formData.direccion2}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="observaciones"
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Guardar Cliente
        </button>
      </form>
    </div>
  );
};

export default CrearCliente;