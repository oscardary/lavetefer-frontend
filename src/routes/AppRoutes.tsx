import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Clientes from "../pages/Clientes";
import Proveedores from "../pages/Proveedores";
import Mascotas from "../pages/Mascotas";
import Ordenes from "../pages/Ordenes";

import CrearCliente from '../pages/ClientesCrear';
import EditarCliente from "../pages/ClientesEditar";

import CrearProveedor from '../pages/ProveedoresCrear';
import EditarProveedor from '../pages/ProveedoresEditar';

import CrearMascota from '../pages/MascotasCrear';
import EditarMascota from '../pages/MascotasEditar';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/proveedores" element={<Proveedores />} />
      <Route path="/mascotas" element={<Mascotas />} />
      <Route path="/ordenes" element={<Ordenes />} />
      <Route path="/clientes/nuevo" element={<CrearCliente />} />
      <Route path="/clientes/editar/:id" element={<EditarCliente />} />
      <Route path="/proveedores/nuevo" element={<CrearProveedor />} />
      <Route path="/proveedores/editar/:id" element={<EditarProveedor/>} />
      <Route path="/mascotas/nuevo" element={<CrearMascota/>}/>
      <Route path="/mascotas/editar/:id" element={<EditarMascota/>}/>
    </Routes>
  );
};

export default AppRoutes;