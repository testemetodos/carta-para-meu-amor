import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireRomanticConfetti } from '../utils/confetti';
import { LoveReason } from '../types';

interface Phase3ReasonsProps {
  onComplete: () => void;
}

export const Phase3Reasons: React.FC<Phase3ReasonsProps> = ({ onComplete }) => {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [activeReason, setActiveReason] = useState<LoveReason | null>(null);
  const [isMerged, setIsMerged] = useState<boolean>(false);
  const [isAnimatingMerge, setIsAnimatingMerge] = useState<boolean>(false);

  // Exatamente as 4 mensagens especificadas pelo usuário:
  const reasons: LoveReason[] = [
    {
      id: 1,
      message: 'Porque seu sorriso deixa meus dias mais felizes.',
      color: 'from-pink-500 to-rose-500',
      hint: 'Coração 1',
    },
    {
      id: 2,
      message: 'Porque você é meu refúgio quando o mundo fica difícil.',
      color: 'from-rose-500 to-pink-600',
      hint: 'Coração 2',
    },
    {
      id: 3,
      message: 'Porque sonho em construir uma família linda com você.',
      color: 'from-pink-600 to-rose-700',
      hint: 'Coração 3',
    },
    {
      id: 4,
      message: 'Porque você é a dona do meu coração!',
      color: 'from-rose-600 to-red-500',
      hint: 'Coração 4',
    },
  ];

  // Posições no painel interativo (mobile & desktop)
  const positions = [
    { top: '15%', left: '16%' },
    { top: '15%', right: '16%' },
    { bottom: '18%', left: '18%' },
    { bottom: '18%', right: '18%' },
  ];

  const handleHeartClick = (reason: LoveReason) => {
    romanticAudio.playHeartCollect();
    setActiveReason(reason);

    if (!revealedIds.includes(reason.id)) {
      const nextRevealed = [...revealedIds, reason.id];
      setRevealedIds(nextRevealed);

      // Se completou os 4 corações, inicia a grande animação de fusão
      if (nextRevealed.length === 4) {
        setTimeout(() => {
          setIsAnimatingMerge(true);
          setTimeout(() => {
            setIsMerged(true);
            setIsAnimatingMerge(false);
            romanticAudio.playGrandDiscovery();
            fireRomanticConfetti();
          }, 1400);
        }, 1200);
      }
    }
  };

  const handleContinue = () => {
    romanticAudio.playHeartCollect();
    onComplete();
  };

  return (
    <div className="w-full max-w-lg mx-auto py-4 px-4 flex flex-col items-center space-y-5">
      {/* Cabeçalho */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-semibold">
          <span>Missão 03 de 04</span>
          <span aria-hidden="true">·</span>
          <span>Coleção de Sentimentos</span>
        </div>

        <h2 className="font-serif-romantic text-2xl sm:text-3xl font-bold text-rose-950">
          Colecionando Motivos Para Te Amar 💗
        </h2>

        <p className="text-sm text-rose-800/85 max-w-md mx-auto leading-relaxed">
          Agora quero te mostrar quatro motivos que fazem eu te amar tanto. Toque nos
          coraçõezinhos e descubra o que guardo aqui dentro de mim. ❤️
        </p>
      </div>

      {/* Contador de Corações Coletados */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-rose-200/80 shadow-xs">
        <span className="text-xs font-bold text-rose-900">
          {revealedIds.length} de 4 motivos revelados
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((id) => (
            <Heart
              key={id}
              className={`w-3.5 h-3.5 transition-all ${
                revealedIds.includes(id)
                  ? 'fill-rose-500 text-rose-500 scale-110'
                  : 'text-rose-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ÁREA INTERATIVA DOS CORAÇÕES */}
      {!isMerged ? (
        <div className="relative w-full h-[320px] sm:h-[350px] rounded-3xl bg-gradient-to-b from-[#FFF5F6] via-[#FFEBEF] to-[#FED7E2]/50 border-2 border-rose-200/80 shadow-md overflow-hidden select-none flex items-center justify-center">
          {/* Fundo com aura central */}
          <div className="absolute w-44 h-44 rounded-full bg-rose-200/40 blur-2xl pointer-events-none" />

          {/* Os 4 Corações Flutuantes */}
          {reasons.map((reason, index) => {
            const isRevealed = revealedIds.includes(reason.id);
            const pos = positions[index];

            return (
              <button
                key={reason.id}
                onClick={() => handleHeartClick(reason)}
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                }}
                disabled={isAnimatingMerge}
                aria-label={`Ver motivo número ${reason.id}`}
                className={`absolute p-2 transition-all duration-700 cursor-pointer ${
                  isAnimatingMerge
                    ? 'top-1/2! left-1/2! -translate-x-1/2! -translate-y-1/2! scale-50 opacity-40'
                    : 'hover:scale-110 active:scale-95'
                }`}
              >
                <div
                  className={`relative flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all ${
                    isRevealed
                      ? 'bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-400/40'
                      : 'bg-white/95 text-rose-500 shadow-md border-2 border-rose-200/90 animate-float'
                  }`}
                  style={{ animationDelay: `${index * 0.7}s` }}
                >
                  <Heart
                    className={`w-7 h-7 sm:w-9 sm:h-9 ${
                      isRevealed ? 'fill-white' : 'fill-rose-400/20 text-rose-500'
                    }`}
                  />
                  <span className="text-[10px] font-bold mt-0.5 tracking-tight">
                    #{reason.id}
                  </span>

                  {isRevealed && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-rose-600 flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}

          {/* Dica central enquanto não clicou */}
          {!activeReason && (
            <p className="text-xs text-rose-400 font-medium text-center px-6 pointer-events-none">
              Toque em cada coraçãozinho para ler o que guardo aqui dentro de mim ❤️
            </p>
          )}

          {/* Cartão delicado mostrando a mensagem do coração tocado */}
          {activeReason && !isAnimatingMerge && (
            <div className="absolute inset-x-4 bottom-4 p-4 rounded-2xl bg-white/95 border border-rose-200/90 shadow-lg text-center animate-in fade-in slide-in-from-bottom-2 z-20">
              <span className="text-[10px] uppercase tracking-wider text-rose-500 font-bold block mb-1">
                Motivo #{activeReason.id}
              </span>
              <p className="font-serif-romantic text-base sm:text-lg font-bold text-rose-950 leading-relaxed">
                “{activeReason.message}”
              </p>
            </div>
          )}
        </div>
      ) : (
        /* GRANDE ANIMAÇÃO DOS QUATRO CORAÇÕES: Coração Gigante Pulsante */
        <div className="w-full bg-white rounded-3xl p-6 sm:p-7 border-2 border-rose-200 text-center space-y-6 shadow-xl animate-in zoom-in-95">
          {/* Coração Gigante Pulsante como uma batida de coração */}
          <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
            {/* Halo de luz e brilhos ao redor */}
            <div className="absolute inset-0 rounded-full bg-rose-300/30 blur-xl animate-shimmer" />

            {/* Coração Gigante com Batimento */}
            <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-500 flex items-center justify-center shadow-2xl shadow-rose-500/50 border-4 border-white animate-pulse-heart">
              <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-white fill-white drop-shadow-md" />
            </div>

            {/* Pequenos corações e brilhos flutuando ao redor */}
            <div className="absolute -top-2 -left-2 text-rose-400 animate-bounce">
              <Heart className="w-6 h-6 fill-rose-400" />
            </div>
            <div className="absolute -bottom-2 -right-2 text-rose-400 animate-bounce" style={{ animationDelay: '0.4s' }}>
              <Heart className="w-5 h-5 fill-rose-400" />
            </div>
            <div className="absolute top-2 -right-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }}>
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>3º Coração Desbloqueado!</span>
            </div>

            {/* Frase Exata Requisitada */}
            <h3 className="font-serif-romantic text-xl sm:text-2xl font-bold text-rose-950 leading-relaxed px-2">
              “Olha o tamanho do amor que eu tenho por você, minha princesa! ❤️ Meu coração é todinho seu!”
            </h3>

            <p className="text-xs sm:text-sm text-rose-800/80 max-w-xs mx-auto">
              Cada pedacinho de mim bate apaixonado por você.
            </p>
          </div>

          {/* Botão Exato Requisitado */}
          <div className="pt-2">
            <button
              onClick={handleContinue}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-base shadow-md shadow-rose-400/40 hover:shadow-rose-400/60 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continuar minha missão 💌</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
