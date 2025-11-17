import type { Curso } from "../types";
import { useTrilha } from "../hooks/useTrilha";
import { useFavoritos } from "../hooks/useFavoritos";

export default function CourseCard({ c }: { c: Curso }) {
  const { adicionar } = useTrilha();
  const { isFavorito, toggleFavorito } = useFavoritos();

  return (
    <div
      className="
        relative flex flex-col justify-between
        h-[260px]
        rounded-2xl border border-slate-200
        p-4 bg-white
        shadow-sm hover:shadow-lg transition
        hover:-translate-y-1
      "
    >
      {/* Ícone de favorito */}
      <button
        onClick={() => toggleFavorito(c)}
        className="absolute top-3 right-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFavorito(c.id) ? "#e63946" : "none"}
          stroke={isFavorito(c.id) ? "#e63946" : "#64748b"}
          strokeWidth="2"
          className="h-6 w-6 transition-all hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
            2 5.42 4.42 3 7.5 3 
            c1.74 0 3.41.81 4.5 2.09 
            C13.09 3.81 14.76 3 16.5 3 
            19.58 3 22 5.42 22 8.5 
            c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      <div>
        <h3 className="text-lg font-semibold text-slate-900">{c.titulo}</h3>
        <p className="text-sm text-slate-600 mt-1">
          {c.provedor} • {c.cargaHoraria}h • ⭐ {c.rating}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {c.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100"
          >
            #{t}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => adicionar(c)}
          className="rounded-xl bg-sky-600 text-white py-2 font-medium hover:bg-sky-700 transition"
        >
          Trilha
        </button>
        <button className="rounded-xl border border-slate-300 py-2 font-medium hover:bg-slate-50 transition">
          Inscrever
        </button>
      </div>
    </div>
  );
}
