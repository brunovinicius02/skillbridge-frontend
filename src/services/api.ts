import type { Curso, Usuario } from "../types";

export const cursos: Curso[] = [
  { id:1, titulo:"Lógica de Programação", provedor:"Alura", cargaHoraria:10, nivel:"iniciante", tags:["logica","programacao","carreira"], rating:4.6 },
  { id:2, titulo:"Introdução a Dados com Python", provedor:"Coursera", cargaHoraria:20, nivel:"iniciante", tags:["python","dados"], rating:4.8 },
  { id:3, titulo:"SQL para Análise", provedor:"Udemy", cargaHoraria:16, nivel:"intermediario", tags:["sql","dados","bi"], rating:4.7 },
  { id:4, titulo:"Noções de IA Generativa", provedor:"DIO", cargaHoraria:8, nivel:"iniciante", tags:["ia","generativa"], rating:4.5 },
  { id:5, titulo:"Machine Learning Prático", provedor:"Kaggle", cargaHoraria:24, nivel:"intermediario", tags:["ml","python","dados"], rating:4.9 },

  { id:6,  titulo:"JavaScript Moderno ES6+", provedor:"Udemy", cargaHoraria:18, nivel:"iniciante", tags:["javascript","web","frontend"], rating:4.7 },
  { id:7,  titulo:"React para Iniciantes", provedor:"Alura", cargaHoraria:14, nivel:"iniciante", tags:["react","frontend","javascript"], rating:4.8 },
  { id:8,  titulo:"TypeScript Completo", provedor:"DIO", cargaHoraria:12, nivel:"intermediario", tags:["typescript","frontend","backend"], rating:4.6 },
  { id:9,  titulo:"Node.js API com Express", provedor:"Rocketseat", cargaHoraria:16, nivel:"intermediario", tags:["node","backend","api"], rating:4.9 },
  { id:10, titulo:"PostgreSQL para Desenvolvedores", provedor:"Udemy", cargaHoraria:20, nivel:"iniciante", tags:["sql","postgres","banco"], rating:4.7 },

  { id:11, titulo:"MongoDB Essencial", provedor:"Mongo University", cargaHoraria:10, nivel:"intermediario", tags:["mongodb","nosql","backend"], rating:4.6 },
  { id:12, titulo:"Python para Análise de Dados", provedor:"DataCamp", cargaHoraria:22, nivel:"iniciante", tags:["python","pandas","dados"], rating:4.8 },
  { id:13, titulo:"Machine Learning com Scikit-Learn", provedor:"Coursera", cargaHoraria:25, nivel:"intermediario", tags:["ml","python","dados"], rating:4.9 },
  { id:14, titulo:"Power BI – Dashboards Profissionais", provedor:"FIAP", cargaHoraria:15, nivel:"iniciante", tags:["bi","powerbi","dashboards"], rating:4.7 },
  { id:15, titulo:"AWS Cloud Practitioner", provedor:"AWS", cargaHoraria:12, nivel:"iniciante", tags:["aws","cloud","devops"], rating:4.8 },

  { id:16, titulo:"Azure Fundamentals AZ-900", provedor:"Microsoft", cargaHoraria:10, nivel:"iniciante", tags:["azure","cloud"], rating:4.7 },
  { id:17, titulo:"UX/UI – Fundamentos e Figma", provedor:"Alura", cargaHoraria:18, nivel:"iniciante", tags:["ux","ui","figma"], rating:4.8 },
  { id:18, titulo:"Figma Avançado – Prototipagem", provedor:"Origamid", cargaHoraria:9, nivel:"intermediario", tags:["figma","ui","design"], rating:4.6 },
  { id:19, titulo:"DevOps com Docker e CI/CD", provedor:"Coursera", cargaHoraria:20, nivel:"intermediario", tags:["devops","docker","cicd"], rating:4.7 },
  { id:20, titulo:"Kubernetes Essencial", provedor:"Udemy", cargaHoraria:16, nivel:"avancado", tags:["kubernetes","cloud","devops"], rating:4.8 },

  { id:21, titulo:"Machine Learning Avançado com Python", provedor:"Coursera", cargaHoraria:28, nivel:"avancado", tags:["ml","python","ia"], rating:4.9 },
  { id:22, titulo:"Arquitetura de Software – Microsserviços", provedor:"Alura", cargaHoraria:22, nivel:"avancado", tags:["arquitetura","microsservicos","backend"], rating:4.8 },
  { id:23, titulo:"Advanced React – Patterns e Performance", provedor:"Udemy", cargaHoraria:14, nivel:"avancado", tags:["react","frontend","performance"], rating:4.7 },
  { id:24, titulo:"Cloud AWS – Arquitetura Profissional", provedor:"AWS Academy", cargaHoraria:30, nivel:"avancado", tags:["aws","cloud","arquitetura"], rating:4.9 },
  { id:25, titulo:"Data Engineering Avançado", provedor:"DataCamp", cargaHoraria:26, nivel:"avancado", tags:["dados","engenharia","etl"], rating:4.8 },

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
