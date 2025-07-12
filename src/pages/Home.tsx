import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

import { getMascotas } from "../services/mascotasServices";
import { getClientes } from "../services/clientesService";
import { getProveedores } from "../services/proveedoresServices";

//import type { IMascota } from "@/types/Mascota";

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const Inicio = () => {
  const [totalProveedores, setTotalProveedores] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalMascotas, setTotalMascotas] = useState(0);
  //const [ordenesMensuales, setOrdenesMensuales] = useState<{ mes: string, total: number }[]>([]);

  //const [mascotas, setMascotas] = useState<IMascota[]>([]);
  //const [porEspecie, setPorEspecie] = useState<{ nombre: string; total: number }[]>([]);
  const [porSexo, setPorSexo] = useState<{ nombre: string; total: number }[]>([]);

  const [entidadActiva, setEntidadActiva] = useState<'clientes' | 'proveedores' | 'mascotas' | null>('mascotas');
  const [datosBarras, setDatosBarras] = useState<Array<{nombre:string; total:number}>>([]);
  const [barraActiva, setBarraActiva] = useState('');

  useEffect(() => {
    //Consultar y mapear datos para fichas individuales
    getProveedores().then((data) => setTotalProveedores(data.length));
    getClientes().then((data) => setTotalClientes(data.length));
    //getMascotas().then(data => setTotalMascotas(data.length));

    //Asignar datos para diagramas de barras
    getMascotas()
      .then((data) => {
        //setMascotas(data);
        //agruparDatos(data);
        setTotalMascotas(data.length);
      })
      .catch(console.error);
  }, []);
  /*
  const agruparDatos = (lista: IMascota[]) => {
    const especieMap: Record<string, number> = {};
    const sexoMap: Record<string, number> = {};

    lista.forEach((m) => {
      especieMap[m.especie] = (especieMap[m.especie] || 0) + 1;
      sexoMap[m.sexo === "M" ? "Macho" : "Hembra"] =
        (sexoMap[m.sexo === "M" ? "Macho" : "Hembra"] || 0) + 1;
    });

    /*setPorEspecie(
      Object.entries(especieMap).map(([nombre, total]) => ({ nombre, total }))
    );* /
    setPorSexo(
      Object.entries(sexoMap).map(([nombre, total]) => ({ nombre, total }))
    );
  };*/

  useEffect(() => {
    //console.log('useEffect #1')
    //console.log('Entidad:', entidadActiva, 'Barra:', barraActiva );
    const cargarDatos = async() => {
      if(!entidadActiva) return;
      let url = '';
      switch (entidadActiva) {
        case 'proveedores': url = '/stats/proveedores/por-naturaleza'; break;
        case 'clientes': url = '/stats/clientes/por-ciudad'; break;
        case 'mascotas': url = '/stats/mascotas/por-especie'; break;
      }

      const resp = await fetch(`${import.meta.env.VITE_APIURL}${url}`);
      const datos = await resp.json();
      /**
       * Como el compilador indica error con el ANY entonces se aplica 
       * la siguiente configuración para ingnoralo durante la ejecución
       * así:
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const datosHomologados = datos.map((item: any) => ({
        nombre: item.especie ?? item.idCiudad ?? item.tipoDocumento,
        total: item.total,
      }));
      setDatosBarras(datosHomologados);
    };
    cargarDatos();
  }, [entidadActiva, barraActiva]);

  const defineTituloBarras = () => {
    if (entidadActiva === "mascotas") return "Mascotas por Especie";
    if (entidadActiva === "clientes") return "Clientes por Ciudad";
    if (entidadActiva === "proveedores") return "Proveedores por Tipo de Cuenta";
    return "";
  };

  useEffect(() => {
    if(!entidadActiva || entidadActiva !== 'mascotas') return;
    //console.log('useEffect #2')
    //console.log('Entidad:', entidadActiva, 'Barra:', barraActiva );
    const cargarDatos = async() => {
      if(!barraActiva || entidadActiva !== 'mascotas') return;
      const url = '/stats/mascotas/sexo-por-especie/'+barraActiva;
      const resp = await fetch(`${import.meta.env.VITE_APIURL}${url}`);
      const datos = await resp.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const datosHomologados = datos.map((item: any) => ({
        nombre: item.sexo === 'H' ? 'Hembra' : 'Macho',
        total: Number(item.total),
      }));
      setPorSexo(datosHomologados);
    };
    cargarDatos();
  }, [barraActiva, entidadActiva]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClickBarras = (data:any) => {
    if(!entidadActiva || entidadActiva !== 'mascotas') return;
    setBarraActiva(data.nombre);
  };
  
  const onClickTarjeta = (entidad:string) => {
    switch (entidad) {
      case 'proveedores': setEntidadActiva('proveedores'); break;
      case 'clientes': setEntidadActiva('clientes'); break;
      case 'mascotas': setEntidadActiva('mascotas'); break;
      default: setEntidadActiva(null); break;
    }
    setBarraActiva('');
    setPorSexo([]);
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 p-4">
        <Card onClick={()=>onClickTarjeta('proveedores')}
          className={`cursor-pointer transition-colors duration-200 ${
            entidadActiva === 'proveedores'
              ? 'bg-emerald-100 border-emerald-400'
              : 'hover:bg-gray-100'
          }`}>
          <CardContent className="p-3">
            <h2 className="text-xl font-semibold">Proveedores</h2>
            <p className="text-4xl">{totalProveedores}</p>
          </CardContent>
        </Card>

        <Card onClick={()=>onClickTarjeta('clientes')}
          className={`cursor-pointer transition-colors duration-200 ${
            entidadActiva === 'clientes'
              ? 'bg-emerald-100 border-emerald-400'
              : 'hover:bg-gray-100'
          }`}>
          <CardContent className="p-3">
            <h2 className="text-xl font-semibold">Clientes</h2>
            <p className="text-4xl">{totalClientes}</p>
          </CardContent>
        </Card>

        <Card onClick={()=>onClickTarjeta('mascotas')}
          className={`cursor-pointer transition-colors duration-200 ${
            entidadActiva === 'mascotas'
              ? 'bg-emerald-100 border-emerald-400'
              : 'hover:bg-gray-100'
          }`}>
          <CardContent className="p-3">
            <h2 className="text-xl font-semibold">Mascotas</h2>
            <p className="text-4xl">{totalMascotas}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 p-4">

        {entidadActiva && (
        <div>
          <h2 className="text-xl font-semibold mb-2">{defineTituloBarras()}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosBarras}>
              <XAxis dataKey="nombre" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#3b82f6" onClick={onClickBarras}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        )}

        {/*porSexo.length === 0 && <p>No hay datos para mostrar.</p>*/}
        
        <div className={porSexo.length > 0 && entidadActiva === 'mascotas' ? 'visible' : 'invisible'}>
          <h2 className="text-xl font-semibold mb-2">Distribución de {barraActiva} por Sexo</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart width={400} height={300}>
              <Pie data={porSexo} dataKey="total" nameKey="nombre" cx="50%" cy="50%" outerRadius={100} fill="#10b981" 
              label={({ nombre, total }) => `${nombre} > ${total}`}>
                {porSexo.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Inicio;

/**
        <div>
          <h2 className="text-xl font-semibold mb-2">Mascotas por Sexo</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={porSexo}>
              <XAxis dataKey="nombre" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Mascotas por Especie</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={porEspecie}>
              <XAxis dataKey="nombre" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>


 */
