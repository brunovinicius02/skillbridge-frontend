// src/pages/Perfil.tsx
import { cursos, usuarioDemo } from "../services/api";
import { useFavoritos } from "../hooks/useFavoritos";

type UsuarioPerfil = typeof usuarioDemo & {
  email?: string;
  fotoUrl?: string;
  nivelAtual?: "iniciante" | "intermediario" | "avancado";
};

export function Perfil() {
  // tenta carregar o usuário salvo no login
  let usuario: UsuarioPerfil;
  const salvo = localStorage.getItem("skillbridge_user");

  if (salvo) {
    try {
      usuario = JSON.parse(salvo) as UsuarioPerfil;
    } catch {
      usuario = { ...usuarioDemo, nivelAtual: "iniciante" };
    }
  } else {
    usuario = { ...usuarioDemo, nivelAtual: "iniciante" };
  }

  const { favoritos } = useFavoritos();

  const iniciais =
    usuario.nome
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "SB";

  const fotoUrl =
    usuario.fotoUrl && usuario.fotoUrl.trim() !== ""
      ? usuario.fotoUrl
      : undefined;

  const nivelLabel =
    usuario.nivelAtual === "intermediario"
      ? "Intermediário"
      : usuario.nivelAtual === "avancado"
      ? "Avançado"
      : "Iniciante";

  return (
    <div className="pb-16 px-4 md:px-6 lg:px-10 max-w-7xl mx-auto">
      {/* HEADER DO PERFIL */}
      <section className="mt-8 mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-600">
          Perfil do aluno
        </p>

        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Olá, {usuario.nome}
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-600 max-w-xl">
              Aqui você acompanha seus dados, interesses e como a SkillBridge
              monta recomendações e trilhas sob medida para o seu momento.
            </p>
          </div>

          <div className="mt-2 flex flex-col items-start gap-2 md:items-end md:mt-0">
            <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 border border-sky-100">
              Disponibilidade:{" "}
              <span className="ml-1 font-semibold">
                {usuario.disponibilidadeSemanal}h/sem
              </span>
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-50">
              Nível atual: <span className="ml-1 font-semibold">{nivelLabel}</span>
            </span>
          </div>
        </div>

        <div
          className="mx-auto mt-5 h-[3px] w-24 rounded-full"
          style={{
            background: "linear-gradient(90deg, #0EA5E9, #0369A1)",
          }}
        />
      </section>

      {/* BLOCO PRINCIPAL: FOTO + INFO */}
      <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,280px),minmax(0,1fr)] items-start">
        {/* CARD: AVATAR + INFO BÁSICA */}
        <div className="rounded-3xl bg-white/95 border border-slate-100 shadow-md px-5 py-6 flex flex-col items-center text-center">
          {/* Avatar (foto ou iniciais) */}
          {fotoUrl ? (
            <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-sky-500 shadow-md">
              <img
                src={fotoUrl}
                alt={usuario.nome}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-24 w-24 rounded-full bg-linear-to-br from-sky-500 to-sky-700 flex items-center justify-center text-3xl font-bold text-white shadow-md">
              {iniciais}
            </div>
          )}

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            {usuario.nome}
          </h2>
          <p className="text-xs text-slate-500">
            {usuario.email || "e-mail não informado"}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Aluna SkillBridge · {nivelLabel}
          </p>

          <button className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition">
            Editar informações (em breve)
          </button>

          <p className="mt-4 text-[11px] text-slate-400 leading-relaxed">
            Os dados exibidos aqui foram preenchidos no seu login. Em versões
            futuras, você poderá editar seu perfil, atualizar objetivos e
            conectar contas como GitHub e LinkedIn.
          </p>
        </div>

        {/* CARD: INTERESSES, COMPETÊNCIAS, RESUMO */}
        <div className="rounded-3xl bg-white/95 border border-slate-100 shadow-md px-5 py-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Sobre você
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Interesses */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 mb-1">
                Interesses
              </p>
              {usuario.interesses && usuario.interesses.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {usuario.interesses.map((i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 border border-sky-100"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400">
                  Nenhum interesse selecionado ainda. Você pode marcá-los no
                  login.
                </p>
              )}
            </div>

            {/* Competências */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600 mb-1">
                Competências
              </p>
              {usuario.competencias && usuario.competencias.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {usuario.competencias.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-700 border border-slate-100"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400">
                  Suas competências poderão ser preenchidas a partir de cursos
                  concluídos e integrações futuras.
                </p>
              )}
            </div>
          </div>

          {/* Resumo da leitura do perfil */}
          <div className="mt-5 rounded-2xl bg-sky-50/70 border border-sky-100 px-4 py-3">
            <p className="text-xs font-semibold text-sky-800 mb-1">
              Como usamos seu perfil
            </p>
            <p className="text-[11px] text-sky-900/90 leading-relaxed">
              A SkillBridge cruza seus interesses, nível ({nivelLabel}) e tempo
              disponível ({usuario.disponibilidadeSemanal}h/sem) para sugerir
              cursos, trilhas e conteúdos externos (vídeos, artigos, sites) que
              façam sentido para o seu momento de carreira, sem sobrecarregar a
              sua rotina.
            </p>
          </div>
        </div>
      </section>

      {/* MÉTRICAS / VISÃO GERAL */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white/95 border border-slate-100 shadow-sm px-4 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Tempo disponível
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {usuario.disponibilidadeSemanal}h/sem
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Usado para montar sua carga ideal de estudos.
          </p>
        </div>

        <div className="rounded-2xl bg-white/95 border border-slate-100 shadow-sm px-4 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Cursos na base
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {cursos.length}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Usados como base para recomendações e trilhas.
          </p>
        </div>

        <div className="rounded-2xl bg-white/95 border border-slate-100 shadow-sm px-4 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Favoritos
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {favoritos.length}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Cursos marcados com o coração no catálogo.
          </p>
        </div>
      </section>
    </div>
  );
}
