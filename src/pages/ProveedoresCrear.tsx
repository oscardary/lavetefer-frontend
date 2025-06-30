import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearProveedor } from '../services/proveedoresServices';

const CrearProveedor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doc_tipo: '',
    doc_numero: '',
    prov_nombre: '',
    banco_nombre: '',
    banco_tipo: '',
    banco_numero: '',
    contacto_nombre: '',
    contacto_numero: ''
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
      await crearProveedor(formData);
      navigate('/proveedores');
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
      <h2 className="text-xl font-bold mb-4">Crear Proveedor</h2>

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
            placeholder="Escriba aquí..."
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
          name="prov_nombre"
          placeholder="Nombre"
          value={formData.prov_nombre}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="banco_nombre"
          placeholder="Banco"
          value={formData.banco_nombre}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="banco_numero"
          placeholder="# Cuenta"
          value={formData.banco_numero}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <div>
          <label>Tipo Cuenta</label>
          <select
            name="banco_tipo"
            value={formData.banco_tipo}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Seleccione</option>
            <option value="Ahorros">Ahorros </option>
            <option value="Corriente">Corriente</option>
          </select>
          {formErrors.banco_tipo && (
            <p className="text-red-500 text-sm">{formErrors.banco_tipo}</p>
          )}
        </div>

        <input
          type="text"
          name="contacto_nombre"
          placeholder="Nombre de contacto"
          value={formData.contacto_nombre}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="contacto_numero"
          placeholder="Número de contacto"
          value={formData.contacto_numero}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Guardar Proveedor
        </button>
      </form>
    </div>
  );
};

export default CrearProveedor;