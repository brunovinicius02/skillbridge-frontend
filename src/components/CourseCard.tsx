// src/components/CourseCard.tsx
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { inscricaoService } from "../services/inscricao.service";
import { useFavoritos } from "../hooks/useFavoritos";
import type { CursoAPI } from "../types/api.types";

type Props = {
  c: CursoAPI;
  jaNaTrilha?: boolean;
  onAdicionadoATrilha?: () => void; // callback para atualizar lista
};

export default function CourseCard({ c, jaNaTrilha = false, onAdicionadoATrilha }: Props) {
  const { usuario, isLoggedIn } = useAuth();
  const { toggleFavorito, isFavorito } = useFavoritos();
  const [adicionando, setAdicionando] = useState(false);
  const [adicionado, setAdicionado] = useState(jaNaTrilha);

  const favorito = isFavorito(c.id);

  const handleAdicionarTrilha = async () => {
    if (adicionado || !isLoggedIn || !usuario) {
      if (!isLoggedIn) {
        alert('Faça login para adicionar cursos à sua trilha!');
      }
      return;
    }

    try {
      setAdicionando(true);
      
      // Criar inscrição no backend
      await inscricaoService.criar({
        usuarioId: usuario.id,
        cursoId: c.id,
      });

      setAdicionado(true);
      
      // Notificar o pai que o curso foi adicionado
      if (onAdicionadoATrilha) {
        onAdicionadoATrilha();
      }
    } catch (error: any) {
      console.error('Erro ao adicionar curso à trilha:', error);
      
      // Extrair mensagem de erro mais específica
      let mensagemErro = 'Erro ao adicionar curso. ';
      
      if (error.message) {
        mensagemErro += error.message;
      } else if (error.toString().includes('409')) {
        mensagemErro += 'Você já está inscrito neste curso.';
      } else if (error.toString().includes('500')) {
        mensagemErro += 'Erro no servidor. Tente novamente.';
      } else {
        mensagemErro += 'Tente novamente mais tarde.';
      }
      
      alert(mensagemErro);
    } finally {
      setAdicionando(false);
    }
  };

  return (
    <div
      className="
        relative flex flex-col justify-between
        h-[300px]
        rounded-2xl border border-slate-100
        p-4 bg-white
        shadow-sm hover:shadow-md hover:-translate-y-1
        transition
      "
    >
      {/* Coração de favoritos */}
      <button
        type="button"
        onClick={() => toggleFavorito({ 
          id: c.id, 
          titulo: c.nome, 
          provedor: c.area, 
          cargaHoraria: c.cargaHoraria, 
          nivel: c.nivel.toLowerCase() as 'iniciante' | 'intermediario' | 'avancado', 
          tags: [], 
          rating: 4.5,
          descricao: c.descricao || '',
          youtubeUrl: c.urlExterno || ''
        })}
        className="
          absolute right-3 top-3
          inline-flex h-8 w-8 items-center justify-center
          rounded-full bg-white/90 shadow-sm border border-slate-100
          hover:bg-rose-50 transition
        "
      >
        <span className={favorito ? "text-rose-500" : "text-slate-400"}>
          {favorito ? "❤️" : "🤍"}
        </span>
      </button>

      {/* Conteúdo principal */}
      <div>
        <h3 className="pr-8 text-base md:text-lg font-semibold text-slate-900 line-clamp-2">
          {c.nome}
        </h3>

        <p className="mt-1 text-xs md:text-sm text-slate-500">
          {c.area} • {c.cargaHoraria}h
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 border border-slate-100">
            Nível: {c.nivel}
          </span>
        </div>

        {c.descricao && (
          <p className="mt-3 text-xs md:text-sm text-slate-600 line-clamp-3">
            {c.descricao}
          </p>
        )}
      </div>

      {/* Ações */}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleAdicionarTrilha}
          disabled={adicionado || adicionando || !isLoggedIn}
          className={`
            w-full rounded-xl px-3 py-2 text-xs md:text-sm font-semibold
            text-white shadow-sm transition
            ${
              adicionado
                ? "bg-emerald-600/90 cursor-default"
                : adicionando
                ? "bg-slate-400 cursor-wait"
                : !isLoggedIn
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            }
          `}
        >
          {adicionando
            ? "Adicionando..."
            : adicionado
            ? "Já na sua trilha ✅"
            : !isLoggedIn
            ? "Faça login para adicionar"
            : "Adicionar à trilha"}
        </button>
      </div>
    </div>
  );
}
