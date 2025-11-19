export default function Footer() {
  return (
    <footer
      className="mt-20"
      style={{
        background: "var(--sb-primary-20)",
        borderTop: "1px solid color-mix(in oklab, var(--sb-primary), #000 12%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col items-center gap-4 text-center">
        
        {/* Marca */}
        <p
          className="text-sm font-medium tracking-wide"
          style={{ color: "var(--sb-ink)" }}
        >
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold" style={{ color: "var(--sb-primary)" }}>
            SkillBridge
          </span>{" "}
          — Seu próximo passo, guiado por IA.
        </p>
        
      </div>
    </footer>
  );
}