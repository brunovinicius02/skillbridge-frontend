import type { Curso } from "../types";
import { useTrilha } from "../hooks/useTrilha";

export default function CourseCard({ c }: { c: Curso }) {
  const { adicionar } = useTrilha();

  return (
    <div className="rounded-2xl border p-4 shadow-sm hover:shadow transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{c.titulo}</h3>
        <span className="text-sm px-2 py-1 rounded bg-slate-100">{c.nivel}</span>
      </div>
      <p className="text-sm text-slate-600 mt-1">{c.provedor} • {c.cargaHoraria}h • ⭐ {c.rating}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {c.tags.map(t => (
          <span key={t} className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700">#{t}</span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => adicionar(c)}
          className="rounded-xl bg-slate-900 text-white py-2 font-medium hover:bg-slate-800"
        >
          Salvar na Trilha
        </button>
        <button className="rounded-xl border py-2 font-medium">Inscrever</button>
      </div>
    </div>
  );
}
