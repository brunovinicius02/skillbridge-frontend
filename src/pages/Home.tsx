export function Home() {
  return (
    <section className="grid gap-6 md:grid-cols-2 items-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          SkillBridge — Seu próximo passo, guiado por IA
        </h1>
        <p className="mt-3 text-slate-600">
          Requalificação profissional com trilhas personalizadas para o futuro do trabalho (ODS 4 e 8).
        </p>
        <div className="mt-6 flex gap-3">
          <a href="/recomendacoes" className="rounded-xl bg-slate-900 text-white px-4 py-2">Ver recomendações</a>
          <a href="/catalogo" className="rounded-xl border px-4 py-2">Explorar catálogo</a>
        </div>
      </div>
      <div className="rounded-3xl bg-linear-to-br from-slate-50 to-slate-100 p-10 text-slate-700">
        IA simples de recomendações por afinidade de tags e disponibilidade semanal.
      </div>
    </section>
  );
}
