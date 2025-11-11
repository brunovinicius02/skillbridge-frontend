export function Login() {
  return (
    <div className="max-w-md mx-auto rounded-2xl border p-6">
      <h2 className="text-2xl font-semibold">Entrar</h2>
      <form className="mt-4 grid gap-3" onSubmit={(e)=>{ e.preventDefault(); alert("Login mock ✅"); }}>
        <input className="rounded-xl border px-3 py-2" placeholder="E-mail" />
        <input className="rounded-xl border px-3 py-2" placeholder="Senha" type="password" />
        <button className="rounded-xl bg-slate-900 text-white py-2 hover:bg-slate-800">Acessar</button>
      </form>
      <p className="text-sm text-slate-500 mt-3">Use o modo visitante para testar sem cadastro.</p>
    </div>
  );
}
