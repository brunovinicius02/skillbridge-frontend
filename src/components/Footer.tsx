export default function Footer() {
  return (
    <footer
      className="mt-16"
      style={{
        background: "var(--sb-primary-20)",
        borderTop: "1px solid color-mix(in oklab, var(--sb-primary), #000 15%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 text-center text-sm">
        {/* Texto principal */}
        <p
          className="mb-4 font-medium"
          style={{ color: "var(--sb-ink)" }}
        >
          © {new Date().getFullYear()} <strong>SkillBridge</strong> — Seu próximo passo, guiado por IA.
        </p>

        {/* Navegação */}
        <nav className="flex flex-wrap justify-center gap-6 mt-3">
          <a
            href="#"
            className="transition hover:opacity-70"
            style={{ color: "var(--sb-primary)" }}
          >
            Sobre
          </a>
          <a
            href="#"
            className="transition hover:opacity-70"
            style={{ color: "var(--sb-primary)" }}
          >
            FAQ
          </a>
          <a
            href="#"
            className="transition hover:opacity-70"
            style={{ color: "var(--sb-primary)" }}
          >
            Contato
          </a>
          <a
            href="#"
            className="transition hover:opacity-70"
            style={{ color: "var(--sb-primary)" }}
          >
            Integrantes 
          </a>
        </nav>

        {/* Linha suave decorativa */}
        <div
          className="mx-auto mt-8 h-px w-40 opacity-40"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--sb-primary), transparent)",
          }}
        />
      </div>
    </footer>
  );
}

