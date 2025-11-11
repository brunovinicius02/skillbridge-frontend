import { useTrilha } from "../hooks/useTrilha";

export function Trilha() {
  const { itens, remover, limpar } = useTrilha();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Minha Trilha</h2>
        {itens.length > 0 && (
          <button onClick={limpar} className="text-sm rounded-xl border px-3 py-2 hover:bg-slate-50">
            Limpar tudo
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {itens.map(c => (
          <div key={c.id} className="rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{c.titulo}</h3>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded">{c.nivel}</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">{c.provedor} • {c.cargaHoraria}h</p>
            <button onClick={() => remover(c.id)} className="mt-3 text-sm rounded-xl border px-3 py-2 hover:bg-slate-50">
              Remover
            </button>
          </div>
        ))}
      </div>

      {itens.length === 0 && <p className="text-slate-500">Você ainda não adicionou cursos à sua trilha.</p>}
    </div>
  );
}
