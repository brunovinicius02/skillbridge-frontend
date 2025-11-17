import { cursos, recomendarCursos, usuarioDemo } from "../services/api";
import CourseCard from "../components/CourseCard";


export function Recomendacoes() {
  const lista = recomendarCursos(usuarioDemo, cursos);

  return (
    <div className="pb-16 px-4 md:px-6 lg:px-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <section className="mt-10 mb-8 text-center">
        <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-700">
          Recomendações da IA
        </div>

        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Sugestões de cursos para o seu momento
        </h2>

        <p className="text-slate-600 text-sm md:text-base mt-3 max-w-2xl mx-auto">
          Com base nos interesses e na disponibilidade da {usuarioDemo.nome},
          selecionamos os cursos com maior aderência para acelerar sua evolução.
        </p>

        {/* Chips resumo do perfil */}
        <div className="mt-5 flex flex-wrap justify-center gap-2 text-[11px] md:text-xs">
          <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 border border-slate-100 text-slate-600">
            Interesses:{" "}
            <span className="ml-1 font-semibold">
              {usuarioDemo.interesses.join(", ")}
            </span>
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 border border-slate-100 text-slate-600">
            Disponibilidade:{" "}
            <span className="ml-1 font-semibold">
              {usuarioDemo.disponibilidadeSemanal}h/sem
            </span>
          </span>
        </div>

        <div
          className="mx-auto mt-6 h-[3px] w-24 rounded-full"
          style={{
            background: "linear-gradient(90deg, #0EA5E9, #0369A1)",
          }}
        />
      </section>

      {/* LISTA DE CURSOS RECOMENDADOS */}
      <section>
        <p className="mb-4 text-sm text-slate-500">
          Abaixo estão os cursos em ordem de prioridade, dos mais aderentes ao
          seu perfil para os menos prioritários.
        </p>

        <div
          className="
            grid gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {lista.map((c, index) => (
            <div
              key={c.id}
              className="opacity-0 translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <CourseCard c={c} />
            </div>
          ))}
        </div>

        {lista.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-slate-700 text-lg font-medium">
              Nenhuma recomendação disponível
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Revise seus dados de perfil para gerar novas sugestões.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
