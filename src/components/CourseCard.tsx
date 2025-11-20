// src/components/CourseCard.tsx
import { useState } from "react";
import type { Curso } from "../types";
import { useTrilha } from "../hooks/useTrilha";
import { useFavoritos } from "../hooks/useFavoritos";

type Props = {
  c: Curso;
  // controle opcional vindo do pai
  jaNaTrilhaExternamente?: boolean;
  onAdicionarTrilhaClick?: (curso: Curso) => void;
};

export default function CourseCard({
  c,
  jaNaTrilhaExternamente,
  onAdicionarTrilhaClick,
}: Props) {
  const { adicionar } = useTrilha();
  const { toggleFavorito, isFavorito } = useFavoritos();

  const favorito = isFavorito(c.id);

  // estado local só como fallback, se o pai não controlar
  const [jaNaTrilhaLocal, setJaNaTrilhaLocal] = useState(false);

  const jaNaTrilha = jaNaTrilhaExternamente ?? jaNaTrilhaLocal;

  const handleAdicionarTrilha = () => {
    if (jaNaTrilha) return;

    if (onAdicionarTrilhaClick) {
      onAdicionarTrilhaClick(c); // pai cuida
    } else {
      adicionar(c); // fallback: add direto aqui
      setJaNaTrilhaLocal(true);
    }
  };

  return (
    <div
      className="
        relative flex flex-col justify-between
        h-[300px]
        rounded-2xl border border-slate-100
        p-4 bg-white
        shadow-sm hover:shadow-md hover:-translate-y-1
        transition
      "
    >
      {/* Coração de favoritos */}
      <button
        type="button"
        onClick={() => toggleFavorito(c)}
        className="
          absolute right-3 top-3
          inline-flex h-8 w-8 items-center justify-center
          rounded-full bg-white/90 shadow-sm border border-slate-100
          hover:bg-rose-50 transition
        "
      >
        <span className={favorito ? "text-rose-500" : "text-slate-400"}>
          {favorito ? "❤️" : "🤍"}
        </span>
      </button>

      {/* Conteúdo principal */}
      <div>
        <h3 className="pr-8 text-base md:text-lg font-semibold text-slate-900 line-clamp-2">
          {c.titulo}
        </h3>

        <p className="mt-1 text-xs md:text-sm text-slate-500">
          {c.provedor} • {c.cargaHoraria}h • ⭐ {c.rating}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 border border-slate-100">
            Nível: {c.nivel}
          </span>
          {c.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700 border border-sky-100"
            >
              #{t}
            </span>
          ))}
        </div>

        <p className="mt-3 text-xs md:text-sm text-slate-600 line-clamp-3">
          Este curso ajuda você a evoluir em{" "}
          <span className="font-semibold">
            {c.tags && c.tags.length > 0
              ? c.tags.slice(0, 2).join(", ")
              : "competências essenciais"}
          </span>{" "}
          dentro da sua trilha de carreira.
        </p>
      </div>

      {/* Ações */}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleAdicionarTrilha}
          disabled={jaNaTrilha}
          className={`
            w-full rounded-xl px-3 py-2 text-xs md:text-sm font-semibold
            text-white shadow-sm transition
            ${
              jaNaTrilha
                ? "bg-emerald-600/90 cursor-default"
                : "bg-sky-600 hover:bg-sky-700"
            }
          `}
        >
          {jaNaTrilha ? "Já na sua trilha ✅" : "Adicionar à trilha"}
        </button>
      </div>
    </div>
  );
}
