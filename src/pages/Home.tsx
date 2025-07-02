//Versión 1: Antes del cambio
//const Home = () => <div className="p-4">Bienvenido a LaveteferApp</div>;
//export default Home;

//Versión 2: Implementación de contadores y graficos
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

import { getMascotas } from "../services/mascotasServices"; 
import { getClientes } from "../services/clientesService"; 
//import { getProveedores } from "../services/proveedoresServices"; 

import type { IMascota } from "@/types/Mascota";

const Inicio = () => {
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalMascotas, setTotalMascotas] = useState(0);
  //const [ordenesMensuales, setOrdenesMensuales] = useState<{ mes: string, total: number }[]>([]);

  //const [mascotas, setMascotas] = useState<IMascota[]>([]);
  const [porEspecie, setPorEspecie] = useState<{ nombre: string; total: number }[]>([]);
  const [porSexo, setPorSexo] = useState<{ nombre: string; total: number }[]>([]);

  useEffect(() => {
    //Consultar y mapear datos para fichas individuales
    getClientes().then(data => setTotalClientes(data.length));
    
    //getMascotas().then(data => setTotalMascotas(data.length));
    
    /*getOrdenes().then(data => {
      // Agrupar por mes (ejemplo simple)
      const agrupado = agruparOrdenesPorMes(data);
      setOrdenesMensuales(agrupado);
    });*/

    //Asignar datos para diagramas de barras
    getMascotas()
      .then((data) => {
        //setMascotas(data);
        agruparDatos(data);
        setTotalMascotas(data.length);
      })
      .catch(console.error);

  }, []);

  const agruparDatos = (lista: IMascota[]) => {
    const especieMap: Record<string, number> = {};
    const sexoMap: Record<string, number> = {};

    lista.forEach((m) => {
      especieMap[m.especie] = (especieMap[m.especie] || 0) + 1;
      sexoMap[m.sexo === 'M' ? 'Macho' : 'Hembra'] = (sexoMap[m.sexo === 'M' ? 'Macho' : 'Hembra'] || 0) + 1;
    });

    setPorEspecie(Object.entries(especieMap).map(([nombre, total]) => ({ nombre, total })));
    setPorSexo(Object.entries(sexoMap).map(([nombre, total]) => ({ nombre, total })));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 p-4">
      
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Clientes registrados</h2>
          <p className="text-4xl">{totalClientes}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Mascotas registradas</h2>
          <p className="text-4xl">{totalMascotas}</p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-2">Mascotas por Especie</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={porEspecie}>
            <XAxis dataKey="nombre" />
            <YAxis allowDecimals={false}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Mascotas por Sexo</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={porSexo}>
            <XAxis dataKey="nombre" />
            <YAxis allowDecimals={false}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>

  );
};

export default Inicio;
