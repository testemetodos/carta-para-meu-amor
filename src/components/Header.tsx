import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { Phase } from '../types';

interface HeaderProps {
  currentPhase: Phase;
  completedPhases: number[];
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReset: () => void;
  onNavigatePhase?: (phase: Phase) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPhase,
  completedPhases,
  soundEnabled,
  onToggleSound,
  onReset,
  onNavigatePhase,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const phaseNames = [
    'Início',
    'O Lendário Açaí',
    'Nosso Quiz',
    'Motivos Para Te Amar',
    'Minha Carta de Amor',
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFF8F8]/85 border-b border-rose-200/60 shadow-xs">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          {/* Logo / Título Simples */}
          <button
            onClick={() => onNavigatePhase?.(0)}
            className="flex items-center gap-1.5 shrink-0 text-left hover:opacity-85 transition-opacity cursor-pointer"
            title="Voltar para a tela inicial"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse-heart" />
            <span className="font-serif-romantic text-lg sm:text-xl font-bold tracking-tight text-rose-950">
              Nossa História
            </span>
          </button>

          {/* Coleção de 4 Corações das Missões */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border border-rose-200/70 shadow-xs"
            title={`Meus corações para você: ${completedPhases.length} de 4 conquistados`}
            aria-label={`Meus corações para você: ${completedPhases.length} de 4 conquistados`}
          >
            {[1, 2, 3, 4].map((step) => {
              const isUnlocked = completedPhases.includes(step) || step === currentPhase;
              const isCompleted = completedPhases.includes(step);
              return (
                <button
                  key={step}
                  onClick={() => {
                    if (isUnlocked && onNavigatePhase) {
                      onNavigatePhase(step as Phase);
                    }
                  }}
                  disabled={!isUnlocked}
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step === currentPhase
                      ? 'ring-2 ring-rose-400 ring-offset-1 scale-110'
                      : ''
                  } ${
                    isCompleted
                      ? 'text-rose-500 drop-shadow-xs cursor-pointer'
                      : isUnlocked
                      ? 'text-rose-400 cursor-pointer'
                      : 'text-rose-200 opacity-60 cursor-not-allowed'
                  }`}
                  title={`Missão ${step}${isCompleted ? ' (Concluída)' : ''}`}
                  aria-label={`Missão ${step}${isCompleted ? ' (Concluída)' : ''}`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-transform ${
                      isCompleted ? 'fill-rose-500' : 'fill-none'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Controles de Som e Reinício Discreto */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onToggleSound}
              className="w-9 h-9 flex items-center justify-center rounded-full text-rose-800 hover:text-rose-950 hover:bg-rose-100/60 transition-colors"
              title={soundEnabled ? 'Silenciar sons' : 'Ativar sons românticos'}
              aria-label={soundEnabled ? 'Silenciar sons' : 'Ativar sons românticos'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-rose-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-rose-400" />
              )}
            </button>

            <button
              onClick={() => setShowConfirmReset(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-rose-400 hover:text-rose-700 hover:bg-rose-100/60 transition-colors"
              title="Recomeçar do início"
              aria-label="Recomeçar do início"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Indicador sutil de fase atual se não for tela inicial */}
        {currentPhase > 0 && (
          <div className="max-w-xl mx-auto px-4 pb-1 text-center">
            <p className="text-[11px] font-medium text-rose-600/80 tracking-wide uppercase">
              Etapa {currentPhase} de 4 · {phaseNames[currentPhase]}
            </p>
          </div>
        )}
      </header>

      {/* Modal de Confirmação para Reiniciar */}
      {showConfirmReset && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
        >
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl border border-rose-100 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
              <RotateCcw className="w-5 h-5" />
            </div>

            <h3 className="font-serif-romantic text-xl font-bold text-rose-950">
              Quer ver tudo de novo, meu amor?
            </h3>

            <p className="text-sm text-rose-800/80 leading-relaxed">
              Se você quiser jogar e rever cada detalhe da nossa surpresa desde o começo,
              eu reinicio as missões para você com todo o amor! ❤️
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-rose-200 text-rose-800 font-medium text-sm hover:bg-rose-50 transition-colors"
              >
                Continuar onde estou
              </button>
              <button
                onClick={() => {
                  setShowConfirmReset(false);
                  onReset();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-500 text-white font-medium text-sm hover:bg-rose-600 shadow-sm transition-colors"
              >
                Sim, ver do início ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
