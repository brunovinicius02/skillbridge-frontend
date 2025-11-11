export type Curso = {
  id: number;
  titulo: string;
  provedor: string;
  cargaHoraria: number;
  nivel: "iniciante" | "intermediario" | "avancado";
  tags: string[];
  rating: number;
};

export type Usuario = {
  id: number;
  nome: string;
  competencias: string[];
  interesses: string[];
  disponibilidadeSemanal: number;
};
