import { Linkedin, Github } from "lucide-react";

const PRIMARY = "#0EA5E9";
const PRIMARY_DARK = "#0369A1";

export function Integrantes() {
  const membros = [
    {
      nome: "Bruno Vinicius Barbosa",
      rm: "566366 • 1TDSPY",
      img: "/aluno1.jpeg",
      linkedin: "https://www.linkedin.com/in/brunovbarbosaa",
      github: "https://github.com/brunovinicius02",
    },
    {
      nome: "João Pedro Bitencourt Goldoni",
      rm: "564339 • 1TDSPX",
      img: "/aluno2.jpg",
      linkedin: "https://www.linkedin.com/in/joaopedrogoldoni",
      github: "https://github.com/JoaoPedroBitencourtGoldoni",
    },
    {
      nome: "Marina Tamagnini Magalhães",
      rm: "561786 • 1TDSPX",
      img: "/aluno3.jpg",
      linkedin: "https://www.linkedin.com/in/marina-t-36b14328b",
      github: "https://github.com/marina-2907/marina",
    },
  ];

  return (
    <main
      className="font-sans min-h-screen px-6 py-16"
      style={{
        background: "linear-gradient(to bottom, #f8fcff, #ffffff)",
      }}
    >
      <section className="max-w-6xl mx-auto">
        {/* CHIP DE SEÇÃO */}
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 border text-sm font-semibold shadow-sm"
            style={{
              background: `${PRIMARY}15`,
              borderColor: `${PRIMARY}40`,
              color: PRIMARY,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: PRIMARY }}
            />
            Equipe SkillBridge
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-black text-slate-900">
            Nosso Grupo
          </h1>

          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Estudantes FIAP apaixonados por tecnologia, inovação e
            desenvolvimento de soluções inteligentes para impulsionar pessoas e
            negócios.
          </p>
        </div>

        {/* GRID DOS INTEGRANTES */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {membros.map((aluno) => (
            <article
              key={aluno.nome}
              className="p-7 rounded-2xl border shadow-sm text-center transition-all hover:-translate-y-1 hover:shadow-xl backdrop-blur"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "#e5e7eb",
              }}
            >
              <img
                src={aluno.img}
                alt={aluno.nome}
                className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full object-cover mb-6 ring-4 ring-[#0EA5E9]/40 shadow-lg"
              />

              <h3 className="text-lg font-extrabold text-slate-900">
                {aluno.nome}
              </h3>
              <p className="text-sm text-slate-500 mb-6">{aluno.rm}</p>

              {/* BOTÕES DE SOCIAL */}
              <div className="flex justify-center gap-3">
                <a
                  href={aluno.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl transition border shadow-sm"
                  style={{
                    background: `${PRIMARY}15`,
                    borderColor: `${PRIMARY}40`,
                    color: PRIMARY_DARK,
                  }}
                >
                  <Linkedin size={16} /> LinkedIn
                </a>

                <a
                  href={aluno.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl transition border shadow-sm hover:bg-slate-100 text-slate-700"
                >
                  <Github size={16} /> GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
