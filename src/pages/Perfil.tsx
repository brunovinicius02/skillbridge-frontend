import { useState, useEffect } from "react";
import { usuarioDemo } from "../services/api";

export function Perfil() {
  const [nome, setNome] = useState(usuarioDemo.nome);
  const [interesses, setInteresses] = useState(usuarioDemo.interesses.join(", "));
  const [disp, setDisp] = useState(usuarioDemo.disponibilidadeSemanal);

  useEffect(() => {
    // persiste de leve no localStorage
    localStorage.setItem("skillbridge.perfil", JSON.stringify({ nome, interesses, disp }));
  }, [nome, interesses, disp]);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Meu Perfil</h2>
      <div className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm text-slate-600">Nome</span>
          <input className="rounded-xl border px-3 py-2" value={nome} onChange={e=>setNome(e.target.value)} />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-slate-600">Interesses (separados por vírgula)</span>
          <input className="rounded-xl border px-3 py-2" value={interesses} onChange={e=>setInteresses(e.target.value)} />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-slate-600">Disponibilidade semanal (horas)</span>
          <input type="number" className="rounded-xl border px-3 py-2" value={disp} onChange={e=>setDisp(+e.target.value)} />
        </label>
      </div>
      <p className="text-sm text-slate-500 mt-3">MVP: salvando preferências localmente. Depois integramos à API.</p>
    </div>
  );
}
