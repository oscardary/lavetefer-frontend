import { useState, useEffect, useRef } from "react";
import ciudades from "@/data/colombia_ciudades.json";

interface Ciudad {
  pais: string;
  departamento: string;
  ciudad: string;
  codigo: string;
}

interface Props {
  onSelect: (codigoCiudad: string) => void;
  valorInicial?: string; // ? = opcional
}

const AutocompleteCiudad = ({ onSelect, valorInicial }: Props) => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<Ciudad[]>([]);
  const [showLista, setShowLista] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Filtrado dinámico
  useEffect(() => {
    if (busqueda.trim() === "") {
      setResultados([]);
      return;
    }

    const texto = busqueda.toLowerCase();
    const filtrados = ciudades.filter((c) =>
      `${c.ciudad} ${c.departamento} ${c.codigo}`.toLowerCase().includes(texto)
    );

    setResultados(filtrados.slice(0, 10)); // máximo 10 sugerencias
  }, [busqueda]);

  // Ocultar lista al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowLista(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Buscar el texto completo a partir del código inicial
  useEffect(() => {
    if (valorInicial) {
      const ciudadEncontrada = ciudades.find((c) => c.codigo === valorInicial);
      if (ciudadEncontrada) {
        setBusqueda(`${ciudadEncontrada.ciudad} - ${ciudadEncontrada.departamento}`);
      }
    }
  }, [valorInicial]);

  const handleSelect = (ciudad: Ciudad) => {
    setBusqueda(`${ciudad.ciudad} - ${ciudad.departamento}`);
    onSelect(ciudad.codigo); // solo envías el código
    setShowLista(false);
  };

  return (
    <div className="relative w-full" ref={ref}>
      <input
        type="text"
        placeholder="Buscar ciudad, departamento o código"
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setShowLista(true);
        }}
        className="border p-2 w-full rounded"
      />

      {showLista && resultados.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full max-h-60 overflow-auto rounded shadow">
          {resultados.map((c) => (
            <li
              key={c.codigo}
              onClick={() => handleSelect(c)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {c.ciudad} - {c.departamento} ({c.codigo})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteCiudad;