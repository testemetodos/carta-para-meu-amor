import React from 'react';
import { Heart, Sparkles, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface WelcomeScreenProps {
  completedPhases: number[];
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  completedPhases,
  onStart,
}) => {
  const phases = [
    {
      num: 1,
      title: 'O Lendário Açaí Pendente',
      subtitle: 'Encontre a dívida histórica que eu te devia 🍧',
    },
    {
      num: 2,
      title: 'Você Me Conhece Mesmo?',
      subtitle: 'Três perguntinhas sobre a nossa história 🧩',
    },
    {
      num: 3,
      title: 'Colecionando Motivos Para Te Amar',
      subtitle: 'Quatro motivos que guardo no meu coração 💗',
    },
    {
      num: 4,
      title: 'A Última Missão: Provar Nosso Amor',
      subtitle: 'O nosso baú secreto e a cartinha que escrevi 💌',
    },
  ];

  const handleStart = () => {
    romanticAudio.playHeartCollect();
    onStart();
  };

  return (
    <div className="w-full max-w-lg mx-auto py-6 px-4 flex flex-col items-center text-center space-y-6">
      {/* Ícone Delicado com Brilhos */}
      <div className="relative mt-2">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-200 via-pink-100 to-rose-300 flex items-center justify-center shadow-lg shadow-rose-200/50 border border-white/80 animate-float">
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500 fill-rose-500 animate-pulse-heart drop-shadow-md" />
        </div>
        <div className="absolute -top-1 -right-1 text-amber-400 animate-bounce">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      {/* Título e Subtítulo em 1ª Pessoa */}
      <div className="space-y-3">
        <h1 className="font-serif-romantic text-2xl sm:text-3xl md:text-4xl font-bold text-rose-950 tracking-tight leading-snug">
          Oi, meu amor! ❤️ Preparei uma surpresa para você...
        </h1>

        <p className="text-sm sm:text-base text-rose-800/85 leading-relaxed max-w-md mx-auto">
          Fiz tudo com muito carinho, e quero que você descubra cada pedacinho dela.
          Mas, para chegar até o final, preparei algumas missões para você. Vamos começar?
        </p>
      </div>

      {/* Botão de Ação Destacado */}
      <div className="w-full pt-1">
        <button
          onClick={handleStart}
          className="w-full sm:w-auto min-w-[260px] min-h-[52px] px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-base shadow-lg shadow-rose-400/40 hover:shadow-rose-400/60 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <span>Começar nossa aventura 💗</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Indicador de Progresso das 4 Fases */}
      <div className="w-full pt-4 space-y-3 text-left">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-900/70">
            Nossas 4 Missões de Amor
          </span>
          <span className="text-xs font-medium text-rose-600">
            {completedPhases.length}/4 Concluídas
          </span>
        </div>

        <div className="space-y-2.5">
          {phases.map((p) => {
            const isCompleted = completedPhases.includes(p.num);
            const isAvailable = p.num === 1 || completedPhases.includes(p.num - 1);

            return (
              <div
                key={p.num}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                  isCompleted
                    ? 'bg-rose-50/90 border-rose-200 text-rose-900'
                    : isAvailable
                    ? 'bg-white/90 border-rose-200/80 shadow-xs text-rose-950'
                    : 'bg-white/40 border-rose-100/60 opacity-60 text-rose-400'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      isCompleted
                        ? 'bg-rose-500 text-white shadow-xs'
                        : isAvailable
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-rose-50 text-rose-300'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `0${p.num}`}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-serif-romantic text-base font-bold truncate">
                      {p.title}
                    </h3>
                    <p className="text-xs opacity-80 truncate">{p.subtitle}</p>
                  </div>
                </div>

                <div className="shrink-0 text-xs">
                  {isCompleted ? (
                    <span className="text-rose-600 font-medium flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    </span>
                  ) : isAvailable ? (
                    <span className="text-rose-600 font-medium">Liberada</span>
                  ) : (
                    <div className="flex items-center gap-1 text-rose-300">
                      <Lock className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Bloqueada</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
