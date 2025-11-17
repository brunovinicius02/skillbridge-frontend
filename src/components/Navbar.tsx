import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

/* Cores da sua marca */
const PRIMARY = "#0EA5E9";
const PRIMARY_DARK = "#0369A1";

/* Ícones simples */
const IconMenu = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
    <path
      d="M3 6h18M3 12h18M3 18h18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconLogin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <path
      d="M10 7L8.5 5.5C8.2 5.2 7.8 5 7.4 5H6A2 2 0 0 0 4 7v10a2 2 0 0 0 2 2h1.4c.4 0 .8-.2 1.1-.5L10 17"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 8l3 4-3 4M9 12h8"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkBase =
    "relative px-3 py-2 text-sm font-medium rounded-xl transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-50/80";
  const linkActive = "text-slate-900 font-semibold bg-slate-100 shadow-sm";

  const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group ${linkBase} ${isActive ? linkActive : ""}`
      }
    >
      <span className="relative inline-flex items-center gap-1">
        {children}
        <span
          className="pointer-events-none absolute -bottom-1 left-0 h-2px w-0 rounded-full transition-all group-hover:w-full"
          style={{
            background: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_DARK})`,
          }}
        />
      </span>
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      {/* Barra superior da marca */}
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_DARK})`,
        }}
      />

      {/* Conteúdo */}
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo + Nome */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center">
            <div className="absolute -inset-1 rounded-2xl bg-sky-100/60 blur-md opacity-0 group-hover:opacity-100 transition" />
            <img
              src="/logo.png"
              alt="SkillBridge"
              className="relative h-14 w-auto transition group-hover:scale-[1.04]"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-semibold tracking-tight text-slate-900 group-hover:text-slate-950">
              Skill
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(120deg, ${PRIMARY}, ${PRIMARY_DARK})`,
                }}
              >
                Bridge
              </span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              Seu próximo passo, guiado por IA
            </span>
          </div>
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 border border-slate-200/80 shadow-sm">
          <NavItem to="/">Início</NavItem>
          <NavItem to="/catalogo">Catálogo</NavItem>
          <NavItem to="/recomendacoes">Recomendações</NavItem>
          <NavItem to="/trilha">Minha Trilha</NavItem>
          <NavItem to="/perfil">Perfil</NavItem>
        </nav>

        {/* Botão Login */}
        <Link
          to="/login"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl text-white shadow-md hover:shadow-lg hover:-translate-y-px active:translate-y-0 transition"
          style={{
            background: `linear-gradient(120deg, ${PRIMARY}, ${PRIMARY_DARK})`,
            boxShadow: "0 10px 25px rgba(14,165,233,0.35)",
          }}
        >
          <span>Entrar</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
            <IconLogin />
          </span>
        </Link>

        {/* Botão mobile */}
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300/80 bg-white/70 hover:bg-slate-50 active:scale-95 transition"
          onClick={() => setOpen(true)}
        >
          <IconMenu />
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-60 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[78%] max-w-xs bg-white shadow-2xl border-l border-slate-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho drawer */}
            <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="SkillBridge" className="h-10 w-auto" />
                <div className="flex flex-col leading-tight">
                  <span className="text-base font-semibold text-slate-900">
                    SkillBridge
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Explore novas habilidades
                  </span>
                </div>
              </div>

              <button
                className="h-9 w-9 inline-flex items-center justify-center rounded-xl hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                <IconX />
              </button>
            </div>

            {/* Links */}
            <nav className="px-3 py-4 flex flex-col gap-1 text-sm">
              <Link to="/" onClick={() => setOpen(false)} className={linkBase}>
                Início
              </Link>
              <Link to="/catalogo" onClick={() => setOpen(false)} className={linkBase}>
                Catálogo
              </Link>
              <Link
                to="/recomendacoes"
                onClick={() => setOpen(false)}
                className={linkBase}
              >
                Recomendações
              </Link>
              <Link to="/trilha" onClick={() => setOpen(false)} className={linkBase}>
                Minha Trilha
              </Link>
              <Link to="/perfil" onClick={() => setOpen(false)} className={linkBase}>
                Perfil
              </Link>
            </nav>

            {/* Login no Mobile */}
            <div className="mt-auto px-4 pb-5 pt-2 border-t border-slate-100 bg-slate-50/60">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-white shadow-md active:scale-[0.99] transition"
                style={{
                  background: `linear-gradient(120deg, ${PRIMARY}, ${PRIMARY_DARK})`,
                  boxShadow: "0 10px 25px rgba(14,165,233,0.35)",
                }}
              >
                <IconLogin />
                <span>Entrar na plataforma</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
