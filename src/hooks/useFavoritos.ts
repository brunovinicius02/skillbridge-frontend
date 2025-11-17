// src/hooks/useFavoritos.ts
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Curso } from "../types";

type FavoritosContextType = {
  favoritos: Curso[];
  toggleFavorito: (c: Curso) => void;
  isFavorito: (id: number) => boolean;
};

// começa como undefined pra conseguir validar no hook
const FavoritosContext = createContext<FavoritosContextType | undefined>(
  undefined
);

type FavoritosProviderProps = {
  children: ReactNode;
};

export function FavoritosProvider({ children }: FavoritosProviderProps) {
  const [favoritos, setFavoritos] = useState<Curso[]>([]);

  const toggleFavorito = (curso: Curso) => {
    setFavoritos((prev) => {
      const existe = prev.some((c) => c.id === curso.id);
      return existe
        ? prev.filter((c) => c.id !== curso.id)
        : [...prev, curso];
    });
  };

  const isFavorito = (id: number) => favoritos.some((c) => c.id === id);

  const value: FavoritosContextType = {
    favoritos,
    toggleFavorito,
    isFavorito,
  };

  // sem JSX, só createElement → TS aceita em .ts
  return React.createElement(
    FavoritosContext.Provider,
    { value },
    children
  );
}

export function useFavoritos() {
  const ctx = useContext(FavoritosContext);
  if (!ctx) {
    throw new Error(
      "useFavoritos deve ser usado dentro de <FavoritosProvider>"
    );
  }
  return ctx;
}
