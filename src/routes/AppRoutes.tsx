import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Clientes from "../pages/Clientes";
import Proveedores from "../pages/Proveedores";
import Mascotas from "../pages/Mascotas";
import Ordenes from "../pages/Ordenes";

import CrearCliente from '../pages/CrearCliente';
import EditarCliente from "../pages/EditarCliente";


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
    </Routes>
  );
};

export default AppRoutes;