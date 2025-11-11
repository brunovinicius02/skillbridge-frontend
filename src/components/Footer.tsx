export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-600 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} SkillBridge — Seu próximo passo, guiado por IA.</p>
        <nav className="flex gap-4">
          <a className="hover:underline" href="#">Sobre</a>
          <a className="hover:underline" href="#">FAQ</a>
          <a className="hover:underline" href="#">Contato</a>
          <a className="hover:underline" href="#">Privacidade</a>
        </nav>
      </div>
    </footer>
  );
}
