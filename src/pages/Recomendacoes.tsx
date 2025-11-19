// src/pages/Recomendacoes.tsx
import { cursos, recomendarCursos, usuarioDemo } from "../services/api";
import CourseCard from "../components/CourseCard";

export function Recomendacoes() {
  
  let usuario = usuarioDemo;

  if (typeof window !== "undefined") {
    const salvo = localStorage.getItem("skillbridge_user");
    if (salvo) {
      try {
        usuario = JSON.parse(salvo);
      } catch {
        usuario = usuarioDemo;
      }
    }
  }


  const listaBase = recomendarCursos(usuario, cursos);

 
  let listaFiltrada = listaBase;

  if (usuario.interesses && usuario.interesses.length > 0) {
    const interessesNormalizados = new Set(
      usuario.interesses.map((i: string) => i.toLowerCase().trim())
    );

    listaFiltrada = listaBase.filter((curso) => {
      if (!curso.tags || curso.tags.length === 0) return false;

  
      return curso.tags.some((tag: string) =>
        interessesNormalizados.has(tag.toLowerCase().trim())
      );
    });
  }

  const lista = listaFiltrada;

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
          Com base nos interesses e na disponibilidade de{" "}
          <span className="font-semibold">{usuario.nome}</span>, selecionamos
          os cursos com maior aderência para acelerar sua evolução.
        </p>

        {/* Chips resumo do perfil */}
        <div className="mt-5 flex flex-wrap justify-center gap-2 text-[11px] md:text-xs">
          {usuario.interesses && usuario.interesses.length > 0 && (
            <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 border border-slate-100 text-slate-600">
              Interesses:{" "}
              <span className="ml-1 font-semibold">
                {usuario.interesses.join(", ")}
              </span>
            </span>
          )}

          {usuario.disponibilidadeSemanal && (
            <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 border border-slate-100 text-slate-600">
              Disponibilidade:{" "}
              <span className="ml-1 font-semibold">
                {usuario.disponibilidadeSemanal}h/sem
              </span>
            </span>
          )}
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
          Abaixo estão os cursos em ordem de prioridade, filtrados pelos seus
          interesses e pelo seu momento de carreira.
        </p>

        {lista.length > 0 && (
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
        )}

        {lista.length === 0 && (
          <div className="mt-16 text-center max-w-md mx-auto">
            <p className="text-slate-700 text-lg font-medium">
              Nenhuma recomendação encontrada com os filtros atuais 😥
            </p>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Tente ajustar seus interesses no perfil ou ampliar as áreas de
              interesse para que a IA consiga sugerir mais opções de cursos.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
