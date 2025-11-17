// src/pages/Trilha.tsx
import { useTrilha } from "../hooks/useTrilha";

export function Trilha() {
  const { itens, remover, limpar } = useTrilha();

  const cargaTotal = itens.reduce((acc, c) => acc + c.cargaHoraria, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 pb-16">
      {/* HEADER */}
      <div className="mt-10 mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-700">
            Minha Trilha
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Seu caminho de estudos organizado
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl">
            Aqui ficam os cursos que você escolheu para estudar. Use essa trilha
            como roteiro para manter o foco, planejar a semana e acompanhar sua
            evolução.
          </p>
        </div>

        {itens.length > 0 && (
          <div className="flex flex-col items-end gap-2 text-sm">
            <p className="text-slate-500">
              <span className="font-semibold text-slate-800">
                {itens.length}
              </span>{" "}
              curso(s) na trilha •{" "}
              <span className="font-semibold text-slate-800">
                {cargaTotal}h
              </span>{" "}
              no total
            </p>
            <button
              onClick={limpar}
              className="text-xs md:text-sm rounded-xl border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50 transition"
            >
              Limpar trilha
            </button>
          </div>
        )}
      </div>

      {/* LISTA DE CURSOS DA TRILHA */}
      {itens.length > 0 ? (
        <div className="space-y-4">
          {itens.map((c) => {
            const semanas = Math.max(1, Math.ceil(c.cargaHoraria / 5));

            return (
              <div
                key={c.id}
                className="
                  rounded-2xl border border-slate-100 bg-white
                  p-4 md:p-5 shadow-sm
                  flex flex-col gap-4 md:flex-row md:items-stretch
                "
              >
                {/* Bloco esquerdo - info principal */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base md:text-lg font-semibold text-slate-900">
                      {c.titulo}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-700 border border-sky-100">
                      Nível: {c.nivel}
                    </span>
                  </div>

                  <p className="mt-1 text-xs md:text-sm text-slate-500">
                    {c.provedor} • {c.cargaHoraria}h • ⭐ {c.rating}
                  </p>

                  {/* descrição vinda do api.ts */}
                  <p className="mt-3 text-xs md:text-sm text-slate-600">
                    {c.descricao}
                  </p>

                  {/* tags / focos do curso */}
                  {c.tags && c.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 border border-slate-100"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bloco direito - resumo e ações */}
                <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4 flex flex-col justify-between">
                  <div className="space-y-2 text-xs md:text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-800">
                        Carga estimada:
                      </span>{" "}
                      {c.cargaHoraria} horas
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">
                        Sugestão de ritmo:
                      </span>{" "}
                      {semanas} semana(s) com ~
                      {Math.ceil(c.cargaHoraria / semanas)}h/semana
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">
                        Foco principal:
                      </span>{" "}
                      {c.tags && c.tags.length > 0
                        ? c.tags[0]
                        : "Habilidade-chave"}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => remover(c.id)}
                      className="
                        flex-1 rounded-xl border border-slate-200
                        px-3 py-2 text-xs md:text-sm font-medium
                        text-slate-700 hover:bg-slate-50 transition
                      "
                    >
                      Remover da trilha
                    </button>

                    {/* Botão / link para o vídeo do curso no YouTube */}
                    <a
                      href={c.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        flex-1 inline-flex items-center justify-center gap-1
                        rounded-xl bg-sky-600 text-white
                        px-3 py-2 text-xs md:text-sm font-semibold
                        hover:bg-sky-700 transition
                      "
                    >
                      Ver curso / vídeo
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 max-w-md text-center mx-auto">
          <p className="text-slate-700 text-lg font-semibold">
            Sua trilha ainda está vazia
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Vá até o catálogo e clique em{" "}
            <span className="font-semibold">“Adicionar à trilha”</span> nos
            cursos que fazem sentido para o seu momento. Eles vão aparecer aqui
            com uma descrição e um vídeo explicando melhor o conteúdo.
          </p>
        </div>
      )}
    </div>
  );
}
