import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const rotatingWords = ["Tecnologia", "Dados", "UX/UI", "Cloud", "IA/ML"];

const destaques = [
  {
    titulo: "Trilha Full-Stack",
    desc: "Do zero ao deploy com React, API e Banco de Dados.",
    tag: "Popular",
    img: "/logo.png",
  },
  {
    titulo: "Trilha Dados & IA",
    desc: "Python, SQL, ETL, visualização e Machine Learning.",
    tag: "Em alta",
    img: "/logo.png",
  },
  {
    titulo: "Trilha UX/UI",
    desc: "Pesquisa, wireframes, Figma e testes com usuários.",
    tag: "Design",
    img: "/logo.png",
  },
];

const depoimentos = [
  {
    nome: "Ana",
    texto: "Recomendações certeiras! Consegui meu primeiro estágio.",
    cargo: "Dev Jr.",
  },
  {
    nome: "João",
    texto: "Curadoria perfeita. Economizei muito tempo.",
    cargo: "Analista de Dados",
  },
  {
    nome: "Carlos",
    texto: "A trilha me guiou até minha certificação.",
    cargo: "Cloud Trainee",
  },
  {
    nome: "Mariana",
    texto: "Portfólio pronto rapidinho. Amei!",
    cargo: "UX/UI Designer",
  },
];

export function Home() {
  const [wIndex, setWIndex] = useState(0);
  const [slide, setSlide] = useState(0);
  const total = destaques.length;

  // 👇 Nome vindo do login salvo no localStorage
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(
      () => setWIndex((i) => (i + 1) % rotatingWords.length),
      1800
    );
    return () => clearInterval(id);
  }, []);

  const palavraAtual = useMemo(() => rotatingWords[wIndex], [wIndex]);

  useEffect(() => {
    const id = setInterval(
      () => setSlide((s) => (s + 1) % total),
      4200
    );
    return () => clearInterval(id);
  }, [total]);

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
      {/* BLOBS / FUNDO (suas classes custom) */}
      <div className="blobs pointer-events-none">
        <div className="blob a" />
        <div className="blob b" />
        <div className="blob c" />
      </div>

      {/* ===== HERO ===== */}
      <section className="relative bg-linear-to-b from-sky-50 via-white to-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 md:pt-24 md:pb-16">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Texto principal */}
            <div>
              {/* 👇 Saudação personalizada */}
              <p
                className="mb-2 text-xs md:text-sm font-medium text-sky-700"
                style={{
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Olá, {nomeUsuario ?? "bem-vinda"} 👋
              </p>

              <p
                className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm bg-white/80 border-sky-100"
                style={{ color: "var(--sb-ink)" }}
              >
                <span
                  className="h-2 w-2 animate-pulse rounded-full"
                  style={{ background: "var(--sb-primary)" }}
                />
                IA que entende sua jornada
              </p>

              <h1
                className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
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
                className="mt-4 max-w-xl text-sm md:text-base lg:text-lg"
                style={{ color: "var(--sb-muted)" }}
              >
                A <strong>SkillBridge</strong> mapeia o seu momento, cruza
                habilidades, objetivos e disponibilidade e monta uma trilha
                personalizada para você evoluir com foco — sem se perder no mar
                de cursos.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/recomendacoes"
                  className="rounded-2xl px-5 py-3 text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition hover:-translate-y-px"
                  style={{
                    background: "var(--sb-primary)",
                    color: "#fff",
                  }}
                >
                  Ver minhas recomendações
                </Link>
                <Link
                  to="/catalogo"
                  className="rounded-2xl px-5 py-3 text-sm md:text-base font-medium bg-white/80 hover:bg-slate-50 border"
                  style={{
                    borderColor: "var(--sb-primary-20)",
                    color: "var(--sb-ink)",
                  }}
                >
                  Explorar catálogo
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-semibold text-emerald-700">
                    98%
                  </span>
                  <span style={{ color: "var(--sb-muted)" }}>
                    dos alunos se sentem mais confiantes na carreira
                  </span>
                </div>
                <span
                  className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium shadow-sm border border-sky-100"
                  style={{ color: "var(--sb-ink)" }}
                >
                  Feito como Global Solution FIAP
                </span>
              </div>
            </div>

            {/* Carrossel de trilhas em destaque */}
            <div className="relative">
              <div className="card overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-xl backdrop-blur">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${slide * 100}%)`,
                  }}
                >
                  {destaques.map((d, i) => (
                    <article
                      key={i}
                      className="w-full shrink-0 p-6 md:p-8 flex flex-col h-full"
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
                        className="mt-4 text-2xl font-bold"
                        style={{ color: "var(--sb-ink)" }}
                      >
                        {d.titulo}
                      </h3>

                      <p
                        className="mt-2 text-sm md:text-base"
                        style={{ color: "var(--sb-muted)" }}
                      >
                        {d.desc}
                      </p>

                      <img
                        src={d.img}
                        alt={d.titulo}
                        className="mt-6 h-40 w-full rounded-2xl object-contain bg-slate-50/60"
                      />

                      <div className="mt-6">
                        <Link
                          to="/trilha"
                          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-slate-50/80 hover:bg-slate-100 border"
                          style={{
                            borderColor: "var(--sb-primary-20)",
                            color: "var(--sb-ink)",
                          }}
                        >
                          Ver trilha sugerida
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

      {/* MÉTRICAS */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-4">
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <Metric valor="120+" label="Cursos curados" />
            <Metric valor="35" label="Trilhas completas" />
            <Metric valor="98%" label="Satisfação dos alunos" />
            <Metric valor="7 dias" label="Plano inicial pronto" />
          </div>
        </div>
      </section>

      {/* SOBRE O PROJETO */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr,1fr] items-center">
          {/* Texto */}
          <div className="relative">
            <div className="absolute -left-4 top-0 h-16 w-1 rounded-full bg-linear-to-b from-sky-400 via-sky-500 to-sky-300 md:-left-6" />
            <div className="pl-4 md:pl-6">
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "var(--sb-ink)" }}
              >
                Sobre o projeto SkillBridge
              </h2>
              <p
                className="mt-3 text-sm md:text-base"
                style={{ color: "var(--sb-muted)" }}
              >
                A <strong>SkillBridge</strong> nasce como uma solução pensada
                para conectar estudantes e profissionais às trilhas certas de
                desenvolvimento, evitando cursos aleatórios e planos de estudo
                genéricos.
              </p>
              <p
                className="mt-3 text-sm md:text-base"
                style={{ color: "var(--sb-muted)" }}
              >
                Com base em objetivos, nível de experiência e tempo disponível,
                a plataforma recomenda conteúdos, trilhas e competências
                alinhadas ao mercado — com foco em entregas práticas e
                portfólio.
              </p>

              <ul className="mt-4 space-y-2 text-sm md:text-base">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-4 rounded-full bg-sky-400" />
                  <span style={{ color: "var(--sb-ink)" }}>
                    <strong>Objetivo:</strong> reduzir a frustração na escolha
                    de cursos e acelerar a entrada no mercado.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-4 rounded-full bg-sky-400" />
                  <span style={{ color: "var(--sb-ink)" }}>
                    <strong>Como:</strong> combinando IA, curadoria humana e
                    métricas de evolução.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-4 rounded-full bg-sky-400" />
                  <span style={{ color: "var(--sb-ink)" }}>
                    <strong>Foco:</strong> trilhas aplicadas em tecnologia,
                    dados, UX/UI, cloud e IA.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card lateral colorido */}
          <div className="card rounded-3xl border border-sky-100 bg-linear-to-br from-sky-50 via-white to-sky-100 p-6 shadow-md">
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--sb-ink)" }}
            >
              Por que a SkillBridge?
            </h3>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--sb-muted)" }}
            >
              Em vez de jogar dezenas de links de cursos, a plataforma monta um
              caminho claro, com:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• Ordem sugerida de estudos</li>
              <li>• Tempo estimado para cada etapa</li>
              <li>• Habilidades que você desenvolve em cada módulo</li>
              <li>• Sugestão de projetos para portfólio</li>
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
                Conhecer minha trilha
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRILHAS SUGERIDAS */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-14">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--sb-ink)" }}
            >
              Trilhas sugeridas para você
            </h2>
            <p
              className="text-sm md:text-base mt-1"
              style={{ color: "var(--sb-muted)" }}
            >
              Comece por uma trilha curada pela SkillBridge e evite ficar
              travada na escolha.
            </p>
          </div>
          <Link
            to="/catalogo"
            className="text-sm font-medium hover:underline md:text-right"
            style={{ color: "var(--sb-primary)" }}
          >
            Ver catálogo completo →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {destaques.map((d, i) => (
            <CardTrilha key={i} {...d} />
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS (marquee) */}
      <section
        className="py-10"
        style={{
          background:
            "linear-gradient(90deg, var(--sb-primary-10), #fff, var(--sb-primary-10))",
        }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <h2
            className="mb-4 text-lg font-semibold"
            style={{ color: "var(--sb-ink)" }}
          >
            Quem já cruzou a ponte com a SkillBridge
          </h2>
          <div className="marquee-mask overflow-hidden">
            <div className="flex gap-4 animate-[scroll_22s_linear_infinite]">
              {[...depoimentos, ...depoimentos].map((dep, i) => (
                <blockquote
                  key={i}
                  className="card w-72 shrink-0 rounded-2xl bg-white/80 p-4 text-sm shadow-sm"
                  style={{ color: "var(--sb-ink)" }}
                >
                  “{dep.texto}”
                  <footer
                    className="mt-3 text-xs font-medium"
                    style={{ color: "var(--sb-muted)" }}
                  >
                    — {dep.nome} · {dep.cargo}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div
          className="rounded-3xl px-6 py-10 text-center text-white md:px-10 md:py-12 shadow-xl"
          style={{
            background:
              "linear-gradient(90deg, var(--sb-primary), var(--sb-secondary))",
          }}
        >
          <h3 className="text-2xl md:text-3xl font-bold">
            Pronta para acelerar sua carreira?
          </h3>
          <p className="mt-2 text-sm md:text-base opacity-90">
            Gere seu plano personalizado em minutos com a SkillBridge e dê o
            próximo passo com confiança.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/recomendacoes"
              className="rounded-xl px-5 py-3 text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition hover:-translate-y-px"
              style={{ background: "#fff", color: "var(--sb-primary)" }}
            >
              Criar meu plano agora
            </Link>
            <Link
              to="/login"
              className="rounded-xl px-5 py-3 text-sm md:text-base font-medium border-white/60 bg-white/5 hover:bg-white/10 transition"
              style={{
                border: "1px solid rgba(255,255,255,.7)",
              }}
            >
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ valor, label }: { valor: string; label: string }) {
  return (
    <div className="card rounded-2xl bg-white/80 px-4 py-6 shadow-sm border border-slate-100/80">
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
  return (
    <article className="group relative card rounded-2xl bg-white/80 p-6 shadow-sm border border-slate-100/80 hover:-translate-y-0.5 hover:shadow-md transition">
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
        className="mt-1 text-sm"
        style={{ color: "var(--sb-muted)" }}
      >
        {desc}
      </p>
      <img
        src={img}
        alt=""
        className="mt-4 h-24 w-full rounded-xl object-contain opacity-95 bg-slate-50/70"
      />
      <Link
        to="/trilha"
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium"
        style={{ color: "var(--sb-primary)" }}
      >
        Ver detalhes →
      </Link>
    </article>
  );
}
