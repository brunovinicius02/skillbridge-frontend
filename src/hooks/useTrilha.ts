import { useEffect, useState } from "react";
import type { Curso } from "../types";

const KEY = "skillbridge.trilha";

export function useTrilha() {
  const [itens, setItens] = useState<Curso[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setItens(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(itens));
  }, [itens]);

  const adicionar = (curso: Curso) => {
    setItens(prev => (prev.find(c => c.id === curso.id) ? prev : [...prev, curso]));
  };
  const remover = (id: number) => setItens(prev => prev.filter(c => c.id !== id));
  const limpar = () => setItens([]);

  return { itens, adicionar, remover, limpar };
}
