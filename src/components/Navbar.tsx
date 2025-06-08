import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">LaveteferApp</h1>
      <ul className="flex gap-4">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/proveedores">Proveedores</Link></li>
        <li><Link to="/mascotas">Mascotas</Link></li>
        <li><Link to="/ordenes">Órdenes</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;