import { useMemo, useState } from "react";
import { cursos } from "../services/api";
import CourseCard from "../components/CourseCard";
import FilterBar from "../components/FilterBar";

export function Catalogo() {
  const [busca, setBusca] = useState("");
  const [nivel, setNivel] = useState("");
  const [tag, setTag] = useState("");

  const lista = useMemo(() => {
    return cursos.filter(c => {
      const byBusca = (busca ? (c.titulo + c.provedor).toLowerCase().includes(busca.toLowerCase()) : true);
      const byNivel = (nivel ? c.nivel === nivel : true);
      const byTag = (tag ? c.tags.includes(tag.toLowerCase()) : true);
      return byBusca && byNivel && byTag;
    });
  }, [busca, nivel, tag]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Catálogo de Cursos</h2>
      <FilterBar busca={busca} setBusca={setBusca} nivel={nivel} setNivel={setNivel} tag={tag} setTag={setTag} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map(c => <CourseCard key={c.id} c={c} />)}
      </div>
      {lista.length === 0 && <p className="text-slate-500 mt-6">Nenhum curso encontrado.</p>}
    </div>
  );
}
