import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const rotatingWords = ["Tecnologia", "Dados", "UX/UI", "Cloud", "IA/ML"];

const destaques = [
  {
    titulo: "Trilha Full-Stack",
    desc: "Do zero ao deploy com React, APIs REST e Banco de Dados, focando em criar aplicações completas para o mundo real.",
    tag: "Popular",
    img: "/logo.png",
  },
  {
    titulo: "Trilha Dados & IA",
    desc: "Fundamentos de Python, SQL, ETL, visualização de dados e introdução a Machine Learning para iniciar em Dados e IA.",
    tag: "Em alta",
    img: "/logo.png",
  },
  {
    titulo: "Trilha UX/UI",
    desc: "Pesquisa com usuários, wireframes, Figma e testes de usabilidade, com foco em portfólio aplicado em produtos digitais.",
    tag: "Design",
    img: "/logo.png",
  },
];

const depoimentos = [
  {
    nome: "Ana",
    texto: "As recomendações estavam alinhadas com o que eu buscava. Consegui meu primeiro estágio em tecnologia.",
    cargo: "Desenvolvedora Júnior",
  },
  {
    nome: "João",
    texto: "A curadoria ajudou a organizar meus estudos. Parei de pular de curso em curso.",
    cargo: "Analista de Dados",
  },
  {
    nome: "Carlos",
    texto: "Segui a trilha sugerida e cheguei na certificação que eu queria.",
    cargo: "Cloud Trainee",
  },
  {
    nome: "Mariana",
    texto: "Consegui montar um portfólio sólido em pouco tempo, com projetos bem direcionados.",
    cargo: "UX/UI Designer",
  },
];

export function Home() {
  const [wIndex, setWIndex] = useState(0);
  const [slide, setSlide] = useState(0);
  const total = destaques.length;

  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);

  // rotacionar palavra do título
  useEffect(() => {
    const id = setInterval(
      () => setWIndex((i) => (i + 1) % rotatingWords.length),
      1800
    );
    return () => clearInterval(id);
  }, []);

  const palavraAtual = useMemo(() => rotatingWords[wIndex], [wIndex]);

  // carrossel de destaques
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % total), 4200);
    return () => clearInterval(id);
  }, [total]);

  // pegar nome do usuário logado
  useEffect(() => {
    try {
      const raw = localStorage.getItem("skillbridge_user");
      if (raw) {
        const user = JSON.parse(raw);
        if (user?.nome) setNomeUsuario(user.nome as string);
      }
    } catch {
      setNomeUsuario(null);
    }
  }, []);

  return (
    <div className="relative bg-slate-50/40 overflow-x-hidden">
      {/* FUNDO DECORATIVO (seus blobs custom) */}
      <div className="blobs pointer-events-none">
        <div className="blob a" />
        <div className="blob b" />
        <div className="blob c" />
      </div>

      {/* ===== HERO ===== */}
      <section className="relative bg-linear-to-b from-sky-50 via-white to-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-14 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Coluna texto */}
            <div className="text-center lg:text-left">
              <p
                className="mb-2 text-xs sm:text-sm font-medium text-sky-700"
                style={{
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Olá, {nomeUsuario ?? "bem-vinda"}
              </p>

              <p
                className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm bg-white/90 border-sky-100"
                style={{ color: "var(--sb-ink)" }}
              >
                <span
                  className="h-2 w-2 animate-pulse rounded-full"
                  style={{ background: "var(--sb-primary)" }}
                />
                IA focada na sua jornada de carreira
              </p>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight"
                style={{ color: "var(--sb-ink)" }}
              >
                Seu próximo passo em{" "}
                <span
                  key={palavraAtual}
                  className="gradient-text inline-block align-baseline"
                >
                  {palavraAtual}
                </span>
                .
              </h1>

              <p
                className="mt-4 mx-auto lg:mx-0 max-w-xl text-sm sm:text-base lg:text-lg"
                style={{ color: "var(--sb-muted)" }}
              >
                A <strong>SkillBridge</strong> mapeia o seu momento, cruza
                habilidades, objetivos e tempo disponível e monta uma trilha
                personalizada para você evoluir com foco, sem se perder em
                dezenas de cursos soltos.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  to="/recomendacoes"
                  className="rounded-2xl px-5 py-3 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition hover:-translate-y-px"
                  style={{
                    background: "var(--sb-primary)",
                    color: "#fff",
                  }}
                >
                  Ver minhas recomendações
                </Link>
                <Link
                  to="/catalogo"
                  className="rounded-2xl px-5 py-3 text-sm sm:text-base font-medium bg-white hover:bg-slate-50 border"
                  style={{
                    borderColor: "var(--sb-primary-20)",
                    color: "var(--sb-ink)"!,
                  }}
                >
                  Explorar catálogo
                </Link>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-semibold text-emerald-700">
                    98%
                  </span>
                  <span style={{ color: "var(--sb-muted)" }}>
                    das pessoas relatam mais clareza sobre o que estudar depois
                    de organizar a trilha.
                  </span>
                </div>
                <span
                  className="rounded-full bg-white px-3 py-1 text-[11px] font-medium shadow-sm border border-sky-100"
                  style={{ color: "var(--sb-ink)" }}
                >
                  Projeto desenvolvido como Global Solution FIAP
                </span>
              </div>
            </div>

            {/* Coluna carrossel */}
            <div className="relative mt-8 lg:mt-0 max-w-md w-full mx-auto lg:max-w-none">
              <div className="card overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${slide * 100}%)`,
                  }}
                >
                  {destaques.map((d, i) => (
                    <article
                      key={i}
                      className="w-full shrink-0 p-6 sm:p-7 lg:p-8 flex flex-col h-full"
                    >
                      <span
                        className="inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                        style={{
                          background: "var(--sb-primary-20)",
                          color: "var(--sb-ink)",
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: "var(--sb-primary)" }}
                        />
                        {d.tag}
                      </span>

                      <h3
                        className="mt-4 text-xl sm:text-2xl font-bold"
                        style={{ color: "var(--sb-ink)" }}
                      >
                        {d.titulo}
                      </h3>

                      <p
                        className="mt-2 text-sm sm:text-base"
                        style={{ color: "var(--sb-muted)" }}
                      >
                        {d.desc}
                      </p>

                      <img
                        src={d.img}
                        alt={d.titulo}
                        className="mt-6 h-32 sm:h-40 w-full rounded-2xl object-contain bg-slate-50"
                      />

                      <div className="mt-6">
                        <Link
                          to="/recomendacoes"
                          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-slate-50 hover:bg-slate-100 border"
                          style={{
                            borderColor: "var(--sb-primary-20)",
                            color: "var(--sb-ink)",
                          }}
                        >
                          Ver recomendações relacionadas
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Dots do carrossel */}
                <div className="flex items-center justify-center gap-2 p-3">
                  {destaques.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className={`h-2.5 w-2.5 rounded-full transition-all ${
                        i === slide ? "scale-110" : "opacity-60"
                      }`}
                      style={{
                        background:
                          i === slide
                            ? "var(--sb-primary)"
                            : "var(--sb-primary-20)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRILHAS SUGERIDAS ===== */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="text-center md:text-left">
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "var(--sb-ink)" }}
              >
                Trilhas sugeridas
              </h2>
              <p
                className="text-sm sm:text-base mt-1"
                style={{ color: "var(--sb-muted)" }}
              >
                Escolha uma trilha para começar com um caminho claro, em vez de
                decidir curso a curso.
              </p>
            </div>
            <div className="text-center md:text-right">
              <Link
                to="/catalogo"
                className="text-sm font-medium hover:underline"
                style={{ color: "var(--sb-primary)" }}
              >
                Ver catálogo completo
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destaques.map((d, i) => (
              <CardTrilha key={i} {...d} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== MÉTRICAS ===== */}
      <section className="border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 pt-8 sm:pt-10">
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <Metric valor="120+" label="Cursos selecionados e organizados" />
            <Metric valor="35" label="Trilhas estruturadas" />
            <Metric valor="98%" label="Relatam mais clareza no plano" />
            <Metric valor="7 dias" label="Tempo médio para aplicar o plano" />
          </div>
        </div>
      </section>

      {/* ===== SOBRE O PROJETO ===== */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr] items-center">
            {/* Texto */}
            <div className="relative">
              <div className="hidden sm:block absolute -left-4 top-0 h-16 w-1 rounded-full bg-linear-to-b from-sky-400 via-sky-500 to-sky-300 lg:-left-6" />
              <div className="pl-0 sm:pl-4 lg:pl-6">
                <h2
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: "var(--sb-ink)" }}
                >
                  Sobre o projeto SkillBridge
                </h2>
                <p
                  className="mt-3 text-sm sm:text-base"
                  style={{ color: "var(--sb-muted)" }}
                >
                  A <strong>SkillBridge</strong> foi pensada para conectar
                  estudantes e profissionais às trilhas certas de
                  desenvolvimento, evitando escolhas aleatórias e planos
                  desconectados da realidade do mercado.
                </p>
                <p
                  className="mt-3 text-sm sm:text-base"
                  style={{ color: "var(--sb-muted)" }}
                >
                  A partir de objetivos, nível de experiência e tempo
                  disponível, a plataforma recomenda conteúdos, trilhas e
                  competências com foco em aplicação prática e portfólio.
                </p>

                <ul className="mt-4 space-y-2 text-sm sm:text-base">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-4 rounded-full bg-sky-400" />
                    <span style={{ color: "var(--sb-ink)" }}>
                      <strong>Objetivo:</strong> reduzir frustração e indecisão
                      na escolha de cursos.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-4 rounded-full bg-sky-400" />
                    <span style={{ color: "var(--sb-ink)" }}>
                      <strong>Como:</strong> combinando IA, curadoria humana e
                      acompanhamento da evolução.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-4 rounded-full bg-sky-400" />
                    <span style={{ color: "var(--sb-ink)" }}>
                      <strong>Foco:</strong> trilhas em tecnologia, dados,
                      UX/UI, cloud e inteligência artificial.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card lateral */}
            <div className="card rounded-3xl bg-slate-50/80 p-6 sm:p-7 shadow-md border border-sky-100">
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--sb-ink)" }}
              >
                Por que usar a SkillBridge
              </h3>
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--sb-muted)" }}
              >
                Em vez de uma lista solta de links, a plataforma propõe um
                caminho estruturado de estudo:
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>• Ordem sugerida de estudos</li>
                <li>• Tempo estimado para cada etapa</li>
                <li>• Habilidades desenvolvidas em cada módulo</li>
                <li>• Sugestões de projetos para portfólio</li>
              </ul>
              <div className="mt-4">
                <Link
                  to="/recomendacoes"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition"
                  style={{
                    background: "var(--sb-primary)",
                    color: "#fff",
                  }}
                >
                  Ver minhas recomendações
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      <section
  className="border-t border-slate-100 py-12"
  style={{
    background:
      "radial-gradient(circle at top, var(--sb-primary-10), #ffffff 55%)",
  }}
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* Cabeçalho */}
    <div className="text-center max-w-2xl mx-auto mb-8">
      <h2
        className="text-2xl sm:text-3xl font-bold"
        style={{ color: "var(--sb-ink)" }}
      >
        Depoimentos de quem já usou a SkillBridge
      </h2>
      <p
        className="mt-2 text-sm sm:text-base"
        style={{ color: "var(--sb-muted)" }}
      >
        Resultados reais de pessoas que organizaram sua trilha de estudos com a plataforma.
      </p>
    </div>

    {/* Grid de depoimentos */}
    <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {depoimentos.map((dep, i) => (
        <article
          key={i}
          className="relative flex h-full flex-col rounded-2xl bg-white/95 border border-slate-100 shadow-sm px-4 py-5 sm:px-5 sm:py-6 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {/* barra de cor em cima */}
          <div
            className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(90deg, #0EA5E9, #0369A1)"
                  : "linear-gradient(90deg, #22C55E, #16A34A)",
            }}
          />

          {/* aspas */}
          <div className="mt-2 mb-3 text-3xl leading-none text-sky-300">
            &ldquo;
          </div>

          <p
            className="text-sm leading-relaxed flex-1"
            style={{ color: "var(--sb-ink)" }}
          >
            {dep.texto}
          </p>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--sb-ink)" }}
            >
              {dep.nome}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--sb-muted)" }}
            >
              {dep.cargo}
            </span>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

    </div>
  );
}

function Metric({ valor, label }: { valor: string; label: string }) {
  return (
    <div className="card rounded-2xl bg-white px-4 py-6 shadow-sm border border-slate-100">
      <div
        className="text-2xl md:text-3xl font-bold"
        style={{ color: "var(--sb-ink)" }}
      >
        {valor}
      </div>
      <div
        className="mt-1 text-[11px] md:text-xs"
        style={{ color: "var(--sb-muted)" }}
      >
        {label}
      </div>
    </div>
  );
}

function CardTrilha({
  titulo,
  desc,
  tag,
  img,
}: {
  titulo: string;
  desc: string;
  tag: string;
  img: string;
}) {
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  return (
    <article className="group relative card rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:-translate-y-0.5 hover:shadow-md transition">
      <span
        className="inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
        style={{
          background: "var(--sb-primary-20)",
          color: "var(--sb-ink)",
        }}
      >
        {tag}
      </span>

      <h3
        className="mt-3 text-lg font-semibold"
        style={{ color: "var(--sb-ink)" }}
      >
        {titulo}
      </h3>

      <p
        className="mt-1 text-sm line-clamp-2"
        style={{ color: "var(--sb-muted)" }}
      >
        {desc}
      </p>

      <img
        src={img}
        alt={titulo}
        className="mt-4 h-24 w-full rounded-xl object-contain bg-slate-50"
      />

      {/* AÇÃO: VER DETALHES (NÃO VAI PARA /trilha) */}
      <button
        type="button"
        onClick={() => setMostrarDetalhes((prev) => !prev)}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium"
        style={{ color: "var(--sb-primary)" }}
      >
        {mostrarDetalhes ? "Esconder detalhes" : "Ver detalhes"}
      </button>

      {/* CAIXA DE DETALHES */}
      {mostrarDetalhes && (
        <div className="mt-3 rounded-xl bg-slate-50 px-3 py-3 text-xs sm:text-sm border border-slate-100">
          <p
            className="font-medium mb-1"
            style={{ color: "var(--sb-ink)" }}
          >
            Sobre esta trilha
          </p>
          <p style={{ color: "var(--sb-muted)" }}>{desc}</p>
        </div>
      )}
    </article>
  );
}
