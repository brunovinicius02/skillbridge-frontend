import { useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";

const PRIMARY = "#0EA5E9";
const PRIMARY_DARK = "#0369A1";

export function Contato() {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setEnviado(false);

    // simulação de envio
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
    }, 1000);
  }

  return (
    <main
      className="min-h-screen px-6 py-16"
      style={{
        background: "linear-gradient(to bottom, #f8fcff, #ffffff)",
      }}
    >
      <section className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 border text-[13px] font-semibold shadow-sm"
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
            Fale com a equipe
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-black text-slate-900">
            Contato
          </h1>

          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou feedback sobre a SkillBridge? 
            Envie uma mensagem para a equipe que desenvolveu o projeto.
          </p>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr,0.9fr] items-start">
          {/* FORMULÁRIO */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-left">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Como podemos te chamar?"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition"
                />
              </div>

              <div className="text-left">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Sobre o que é sua mensagem?
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition"
                defaultValue="duvida"
              >
                <option value="duvida">Dúvida sobre a plataforma</option>
                <option value="sugestao">Sugestão de melhoria</option>
                <option value="bug">Relatar problema / bug</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div className="text-left">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Mensagem
              </label>
              <textarea
                required
                rows={4}
                placeholder="Conte para nós como podemos ajudar..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition resize-none"
              />
            </div>

            {/* ESTADO DE ENVIO + BOTÃO */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={enviando}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-px active:translate-y-0 disabled:opacity-75 disabled:cursor-not-allowed transition"
                style={{
                  background: `linear-gradient(120deg, ${PRIMARY}, ${PRIMARY_DARK})`,
                }}
              >
                {enviando ? (
                  <>
                    <Send size={16} className="animate-pulse" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Enviar mensagem
                  </>
                )}
              </button>

              {enviado && (
                <p className="text-xs text-emerald-600 font-medium">
                  ✅ Mensagem enviada (simulação). Obrigado pelo contato! 💙
                </p>
              )}
            </div>
          </form>

          {/* LADO DIREITO – INFORMAÇÕES */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-6 shadow-sm">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm mb-3">
                <MessageCircle
                  size={20}
                  style={{ color: PRIMARY_DARK }}
                />
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Sobre este contato
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Esta área de contato faz parte do protótipo da plataforma
                <span className="font-semibold"> SkillBridge</span>, desenvolvido
                como projeto acadêmico na FIAP.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm space-y-3 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-slate-500" />
                <span className="font-semibold text-slate-800">
                  Contato institucional (simulado)
                </span>
              </div>
              <p>skillbridge@fiap.com.br</p>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                Projeto desenvolvido por estudantes FIAP – 1TDSPX / 1TDSPY.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
