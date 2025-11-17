import { useMemo, useState } from "react";
import { cursos } from "../services/api";
import CourseCard from "../components/CourseCard";
import FilterBar from "../components/FilterBar";
import { useFavoritos } from "../hooks/useFavoritos";

export function Catalogo() {
  const [busca, setBusca] = useState("");
  const [nivel, setNivel] = useState("");
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  const { favoritos } = useFavoritos();

  // lista filtrada por busca + nível
  const lista = useMemo(() => {
    return cursos.filter((c) => {
      const byBusca = busca
        ? (c.titulo + c.provedor).toLowerCase().includes(busca.toLowerCase())
        : true;
      const byNivel = nivel ? c.nivel === nivel : true;
      return byBusca && byNivel;
    });
  }, [busca, nivel]);

  // se "mostrar favoritos" estiver ativo, filtra a lista pelos favoritos
  const exibicao = useMemo(() => {
    if (!mostrarFavoritos) return lista;
    const favIds = new Set(favoritos.map((f) => f.id));
    return lista.filter((c) => favIds.has(c.id));
  }, [lista, favoritos, mostrarFavoritos]);

  const limparFiltros = () => {
    setBusca("");
    setNivel("");
    setMostrarFavoritos(false);
  };

  const quantidadeTexto = mostrarFavoritos ? "favorito(s)" : "encontrado(s)";

  return (
    <div className="pb-16 px-4 md:px-6 lg:px-10 max-w-7xl mx-auto">
      {/* ===== HEADER ===== */}
      <section className="mt-10 mb-10 text-center">
        <div className="inline-flex items-center rounded-full bg-sky-100 px-4 py-1 text-[12px] font-semibold uppercase tracking-widest text-sky-700 shadow-sm">
          Catálogo SkillBridge
        </div>

        <h2 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Descubra o próximo passo da sua carreira
        </h2>

        <p className="text-slate-600 text-sm md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
          Explore nossa curadoria de cursos em tecnologia, IA, UX/UI, cloud e
          dados. Filtre, marque seus favoritos e monte sua trilha personalizada.
        </p>

        <div
          className="mx-auto mt-6 h-1 w-28 rounded-full"
          style={{ background: "linear-gradient(90deg, #0284c7, #0ea5e9)" }}
        />
      </section>

      {/* ===== CARD DE FILTROS ===== */}
      <section className="mb-10">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white/90 backdrop-blur border border-slate-200 shadow-lg px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Filtrar cursos
              </h3>
              <p className="text-[12px] text-slate-500">
                Busque por nome e refine pelo nível para encontrar o curso ideal.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              {/* contador de cursos exibidos */}
              <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 border border-slate-200 shadow-sm">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-sky-500" />
                {exibicao.length} curso(s)
              </span>

              {/* botão favoritos */}
              <button
                onClick={() => setMostrarFavoritos((prev) => !prev)}
                className={`
                  inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold transition
                  border
                  ${
                    mostrarFavoritos
                      ? "border-rose-300 bg-rose-50 text-rose-700"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }
                `}
              >
                <span>{mostrarFavoritos ? "Mostrar todos os cursos" : "Mostrar apenas favoritos"}</span>
                <span
                  className={`h-3 w-3 rounded-full border ${
                    favoritos.length > 0
                      ? "bg-rose-500 border-rose-500"
                      : "bg-slate-200 border-slate-300"
                  }`}
                />
              </button>

              <button
                onClick={limparFiltros}
                className="text-[11px] font-semibold text-sky-700 hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          </div>

          {/* FilterBar simples (busca + nível) */}
          <FilterBar
            busca={busca}
            setBusca={setBusca}
            nivel={nivel}
            setNivel={setNivel}
          />
        </div>
      </section>

      {/* ===== RESULTADOS ===== */}
      <section>
        {exibicao.length > 0 && (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-slate-500">
                Mostrando{" "}
                <span className="font-semibold text-slate-800">
                  {exibicao.length}
                </span>{" "}
                curso(s) {quantidadeTexto}.
              </p>
            </div>

            <div
              className="
                grid gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {exibicao.map((c, index) => (
                <div
                  key={c.id}
                  className="opacity-0 translate-y-2 animate-fadeInUp"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <CourseCard c={c} />
                </div>
              ))}
            </div>
          </>
        )}

        {exibicao.length === 0 && (
          <div className="mt-16 text-center max-w-md mx-auto">
            <p className="text-slate-800 text-lg font-semibold">
              Nenhum curso encontrado
            </p>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              {favoritos.length === 0 && mostrarFavoritos
                ? "Você ainda não marcou nenhum curso como favorito. Clique no coração em um card para adicioná-lo à sua lista de favoritos."
                : "Tente ajustar os filtros, mudar o nível de dificuldade ou limpar a busca para ver mais opções."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
