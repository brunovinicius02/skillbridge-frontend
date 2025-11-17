// src/hooks/useTrilha.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Curso } from "../types";

type TrilhaContextType = {
  itens: Curso[];
  adicionar: (curso: Curso) => void;
  remover: (id: number) => void;
  limpar: () => void;
};

const TrilhaContext = createContext<TrilhaContextType>({
  itens: [],
  adicionar: () => {},
  remover: () => {},
  limpar: () => {},
});

type TrilhaProviderProps = {
  children: ReactNode;
};

export function TrilhaProvider({ children }: TrilhaProviderProps) {
  const [itens, setItens] = useState<Curso[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const salvo = localStorage.getItem("skillbridge_trilha");
      return salvo ? (JSON.parse(salvo) as Curso[]) : [];
    } catch {
      return [];
    }
  });

  // salva trilha no localStorage
  useEffect(() => {
    try {
      localStorage.setItem("skillbridge_trilha", JSON.stringify(itens));
    } catch {
      // ignora erro de localStorage
    }
  }, [itens]);

  const adicionar = (curso: Curso) => {
    setItens((prev) => {
      const existe = prev.some((c) => c.id === curso.id);
      if (existe) return prev;
      return [...prev, curso];
    });
  };

  const remover = (id: number) => {
    setItens((prev) => prev.filter((c) => c.id !== id));
  };

  const limpar = () => setItens([]);

  const value: TrilhaContextType = {
    itens,
    adicionar,
    remover,
    limpar,
  };

  return (
    <TrilhaContext.Provider value={value}>
      {children}
    </TrilhaContext.Provider>
  );
}

export function useTrilha() {
  return useContext(TrilhaContext);
}
