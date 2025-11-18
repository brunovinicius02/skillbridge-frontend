// src/pages/Login.tsx
import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type PerfilForm = {
  nome: string;
  email: string;
  senha: string;
  fotoUrl: string; // agora guarda o base64 da imagem
  nivelAtual: "iniciante" | "intermediario" | "avancado" | "";
  interesses: string[];
  disponibilidadeSemanal: string; // guardo como string no form, converto depois
};

const OPCOES_INTERESSES = [
  "frontend",
  "backend",
  "dados",
  "ia",
  "ux/ui",
  "cloud",
  "devops",
];

export function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<PerfilForm>({
    nome: "",
    email: "",
    senha: "",
    fotoUrl: "",
    nivelAtual: "",
    interesses: [],
    disponibilidadeSemanal: "",
  });

  const toggleInteresse = (interesse: string) => {
    setForm((prev) => {
      const jaTem = prev.interesses.includes(interesse);
      return {
        ...prev,
        interesses: jaTem
          ? prev.interesses.filter((i) => i !== interesse)
          : [...prev.interesses, interesse],
      };
    });
  };

  // ⬇️ novo: trata upload de imagem local e salva em base64 no estado
  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        fotoUrl: (reader.result as string) || "",
      }));
    };

    reader.readAsDataURL(file); // converte para base64
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Monta objeto de usuário que será usado no Perfil / Home
    const usuario = {
      id: 1,
      nome: form.nome || "Aluno SkillBridge",
      email: form.email,
      fotoUrl: form.fotoUrl || "", // aqui já é base64
      nivelAtual: form.nivelAtual || "iniciante",
      interesses: form.interesses,
      competencias: [], // pode preencher depois com algo do backend
      disponibilidadeSemanal: Number(form.disponibilidadeSemanal) || 4,
    };

    // Salva no localStorage (mock de "login")
    localStorage.setItem("skillbridge_user", JSON.stringify(usuario));

    // redireciona para Home
    navigate("/");
  };

  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-3xl bg-white/95 border border-slate-200 shadow-xl overflow-hidden grid md:grid-cols-[1.1fr,0.9fr]">
        {/* LADO ESQUERDO – FORMULÁRIO */}
        <div className="px-6 py-7 md:px-8 md:py-9">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-600">
            Acessar SkillBridge
          </p>

          <h2 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Monte seu perfil para recomendações inteligentes
          </h2>

          <p className="mt-2 text-xs md:text-sm text-slate-600">
            Preencha seus dados e interesses. Usaremos essas informações para
            montar sua Home e Perfil com saudações personalizadas e trilhas
            sob medida.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Nome e e-mail */}
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nome completo
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500"
                  placeholder="Como quer ser chamada na plataforma"
                  value={form.nome}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, nome: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500"
                  placeholder="voce@exemplo.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            {/* Senha (mock) e foto */}
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500"
                  placeholder="Apenas para simulação 😉"
                  value={form.senha}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, senha: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Foto de perfil (upload opcional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-sky-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-sky-700"
                  onChange={handleFotoChange}
                />
                {form.fotoUrl && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-200">
                      <img
                        src={form.fotoUrl}
                        alt="Prévia da foto"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Prévia da sua foto de perfil
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Nível e disponibilidade */}
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nível atual na área
                </label>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500"
                  value={form.nivelAtual}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      nivelAtual: e.target
                        .value as PerfilForm["nivelAtual"],
                    }))
                  }
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="iniciante">Iniciante</option>
                  <option value="intermediario">Intermediário</option>
                  <option value="avancado">Avançado</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Disponibilidade semanal (horas)
                </label>
                <input
                  type="number"
                  min={1}
                  max={40}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500"
                  placeholder="Ex: 6"
                  value={form.disponibilidadeSemanal}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      disponibilidadeSemanal: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            {/* Interesses */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Áreas de interesse
              </label>
              <p className="text-[11px] text-slate-500 mb-2">
                Escolha as áreas que mais fazem sentido para o momento da sua
                carreira. Usaremos isso para montar suas recomendações.
              </p>
              <div className="flex flex-wrap gap-2">
                {OPCOES_INTERESSES.map((op) => {
                  const ativo = form.interesses.includes(op);
                  return (
                    <button
                      key={op}
                      type="button"
                      onClick={() => toggleInteresse(op)}
                      className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                        ativo
                          ? "border-sky-500 bg-sky-50 text-sky-700"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {op}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botão entrar */}
            <button
              type="submit"
              className="
                mt-4 w-full rounded-xl bg-linear-to-r from-sky-600 to-sky-500 
                py-2.5 text-sm font-semibold text-white shadow-md 
                hover:from-sky-700 hover:to-sky-600 hover:shadow-lg 
                active:translate-y-px transition
              "
            >
              Entrar e montar meu painel
            </button>

            <p className="mt-2 text-[11px] text-slate-400">
              Este login é apenas uma simulação local. As informações serão
              usadas para personalizar a Home, Perfil e Recomendações na sua
              sessão atual.
            </p>
          </form>
        </div>

        {/* LADO DIREITO – INFO BONITINHA */}
        <div className="hidden md:flex flex-col justify-between bg-linear-to-br from-sky-600 via-sky-700 to-slate-900 text-sky-50 px-7 py-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-100/80">
              SkillBridge
            </p>
            <h3 className="mt-3 text-xl font-bold">
              Perfil vivo, recomendações inteligentes.
            </h3>
            <p className="mt-2 text-xs text-sky-100/80 leading-relaxed">
              Assim que você entra, usamos seu perfil para montar um painel com
              trilhas, cursos, vídeos e sites que combinam com seus objetivos e
              com o tempo que você realmente tem para estudar.
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-[11px] text-sky-50/90">
            <p className="font-semibold mb-1">O que será personalizado:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Saudação na Home com seu nome.</li>
              <li>Bloco de perfil com interesses e disponibilidade.</li>
              <li>Recomendações de cursos e trilhas mais alinhadas.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
