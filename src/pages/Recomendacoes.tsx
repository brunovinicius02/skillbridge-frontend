import { cursos, recomendarCursos, usuarioDemo } from "../services/api";
import CourseCard from "../components/CourseCard";

export function Recomendacoes() {
  const lista = recomendarCursos(usuarioDemo, cursos);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">Recomendações para você</h2>
      <p className="text-slate-600 mb-4">
        Interesses: <b>{usuarioDemo.interesses.join(", ")}</b> •
        Disponibilidade: <b>{usuarioDemo.disponibilidadeSemanal}h/sem</b>
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map(c => <CourseCard key={c.id} c={c} />)}
      </div>
    </div>
  );
}
