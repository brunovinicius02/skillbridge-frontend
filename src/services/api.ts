import type { Curso, Usuario } from "../types";

export const cursos: Curso[] = [
  { id:1, titulo:"Lógica de Programação", provedor:"Alura", cargaHoraria:10, nivel:"iniciante", tags:["logica","programacao","carreira"], rating:4.6 },
  { id:2, titulo:"Introdução a Dados com Python", provedor:"Coursera", cargaHoraria:20, nivel:"iniciante", tags:["python","dados"], rating:4.8 },
  { id:3, titulo:"SQL para Análise", provedor:"Udemy", cargaHoraria:16, nivel:"intermediario", tags:["sql","dados","bi"], rating:4.7 },
  { id:4, titulo:"Noções de IA Generativa", provedor:"DIO", cargaHoraria:8, nivel:"iniciante", tags:["ia","generativa"], rating:4.5 },
  { id:5, titulo:"Machine Learning Prático", provedor:"Kaggle", cargaHoraria:24, nivel:"intermediario", tags:["ml","python","dados"], rating:4.9 },
];

export const usuarioDemo: Usuario = {
  id: 1,
  nome: "Marina",
  competencias: ["html","css","figma","python-basico"],
  interesses: ["dados","ia","ux"],
  disponibilidadeSemanal: 6,
};

export function recomendarCursos(user: Usuario, base: Curso[] = cursos): Curso[] {
  const interesseSet = new Set([...user.interesses, ...user.competencias.map(c=>c.split("-")[0])]);
  const score = (c: Curso) => {
    const match = c.tags.filter(t => interesseSet.has(t)).length;
    const cargaOk = user.disponibilidadeSemanal >= Math.min(6, Math.ceil(c.cargaHoraria/4)) ? 1 : 0;
    return match*2 + cargaOk + c.rating/5;
  };
  return [...base].sort((a,b)=>score(b)-score(a));
}
