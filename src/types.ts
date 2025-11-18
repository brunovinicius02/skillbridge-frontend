// src/types.ts
export type Curso = {
  id: number;
  titulo: string;
  provedor: string;
  cargaHoraria: number;
  nivel: "iniciante" | "intermediario" | "avancado";
  tags: string[];
  rating: number;

  // 👇 novos campos para sua Trilha
  descricao: string;
  youtubeUrl: string;
};

export type Usuario = {
  fotoUrl: string | undefined;
  id: number;
  nome: string;
  competencias: string[];
  interesses: string[];
  disponibilidadeSemanal: number;
};
