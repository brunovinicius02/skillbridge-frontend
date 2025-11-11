type Props = {
  busca: string; setBusca: (v:string)=>void;
  nivel: string; setNivel: (v:string)=>void;
  tag: string; setTag: (v:string)=>void;
};

export default function FilterBar({ busca, setBusca, nivel, setNivel, tag, setTag }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <input className="rounded-xl border px-3 py-2 flex-1" placeholder="Buscar curso..." value={busca} onChange={e=>setBusca(e.target.value)} />
      <select className="rounded-xl border px-3 py-2" value={nivel} onChange={e=>setNivel(e.target.value)}>
        <option value="">Todos níveis</option>
        <option value="iniciante">Iniciante</option>
        <option value="intermediario">Intermediário</option>
        <option value="avancado">Avançado</option>
      </select>
      <input className="rounded-xl border px-3 py-2" placeholder="Tag (ex: python)" value={tag} onChange={e=>setTag(e.target.value)} />
    </div>
  );
}
