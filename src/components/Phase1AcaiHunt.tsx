import React, { useState } from 'react';
import { Heart, Sparkles, HelpCircle, ArrowRight, X } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireRomanticConfetti } from '../utils/confetti';

interface Phase1AcaiHuntProps {
  onComplete: () => void;
}

interface InteractiveItem {
  id: string;
  name: string;
  isAcai: boolean;
  message: string;
  iconType: string;
  position: string;
}

export const Phase1AcaiHunt: React.FC<Phase1AcaiHuntProps> = ({ onComplete }) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [foundAcai, setFoundAcai] = useState<boolean>(false);
  const [inspectedItems, setInspectedItems] = useState<string[]>([]);
  const [shakingItemId, setShakingItemId] = useState<string | null>(null);

  const items: InteractiveItem[] = [
    {
      id: 'teddy',
      name: 'Ursinho de Pelúcia',
      isAcai: false,
      message: 'Ih, não é aqui, minha princesa! 😂 Só deixei esse ursinho fofo para você!',
      iconType: 'bear',
      position: 'top-6 left-4 sm:left-8',
    },
    {
      id: 'books',
      name: 'Livros de Romance',
      isAcai: false,
      message: 'Tá procurando direitinho ou tá enrolando igual sempre? 🤭',
      iconType: 'books',
      position: 'top-4 right-4 sm:right-10',
    },
    {
      id: 'camera',
      name: 'Câmera Retrô',
      isAcai: false,
      message: 'Aqui só tem fotos nossas que eu amo... Mas nada de comida! 📸❤️',
      iconType: 'camera',
      position: 'top-36 left-8 sm:left-16',
    },
    {
      id: 'chocolates',
      name: 'Caixa de Bombom',
      isAcai: false,
      message: 'O açaí não vai se encontrar sozinho, viu? 🍧 Procura melhor, meu amor!',
      iconType: 'chocolates',
      position: 'top-32 right-8 sm:right-16',
    },
    {
      id: 'pillow',
      name: 'Almofada de Coração',
      isAcai: false,
      message: 'Quentinho e macio, mas zero açaí por aqui! Kkkk 🛋️',
      iconType: 'pillow',
      position: 'bottom-24 left-6 sm:left-12',
    },
    {
      id: 'flowers',
      name: 'Buquê de Flores',
      isAcai: false,
      message: 'Flores lindas que preparei para você! Mas o açaí não tá aqui, amor! 🌹',
      iconType: 'flowers',
      position: 'bottom-20 right-6 sm:right-12',
    },
    {
      id: 'legendary-acai',
      name: 'O Lendário Açaí',
      isAcai: true,
      message: '',
      iconType: 'acai',
      position: 'bottom-8 left-1/2 -translate-x-1/2',
    },
  ];

  const handleItemClick = (item: InteractiveItem) => {
    if (foundAcai) return;

    if (!inspectedItems.includes(item.id)) {
      setInspectedItems((prev) => [...prev, item.id]);
    }

    if (item.isAcai) {
      romanticAudio.playGrandDiscovery();
      fireRomanticConfetti();
      setFoundAcai(true);
      setFeedback(null);
    } else {
      romanticAudio.playOops();
      setShakingItemId(item.id);
      setTimeout(() => setShakingItemId(null), 500);
      setFeedback(item.message);
    }
  };

  const handleContinue = () => {
    romanticAudio.playHeartCollect();
    onComplete();
  };

  return (
    <div className="w-full max-w-lg mx-auto py-4 px-4 flex flex-col items-center space-y-5">
      {/* Cabeçalho da Fase */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-semibold">
          <span>Missão 01 de 04</span>
          <span aria-hidden="true">·</span>
          <span>Caça ao Açaí</span>
        </div>

        <h2 className="font-serif-romantic text-2xl sm:text-3xl font-bold text-rose-950">
          O Lendário Açaí Pendente 🍧
        </h2>

        <p className="text-sm text-rose-800/85 max-w-md mx-auto leading-relaxed">
          KKKKKK, minha princesa! 🍧 Você lembra do nosso famoso açaí? Demorei anos para pagar
          essa dívida, né? 😂 Quero ver se você consegue encontrar esse açaí perdido no nosso piquenique!
        </p>
      </div>

      {/* Dica / Mensagem de Erro Divertida */}
      {feedback && !foundAcai && (
        <div
          role="status"
          aria-live="polite"
          className="w-full p-3.5 rounded-2xl bg-amber-50/95 border border-amber-200 text-amber-900 text-sm shadow-xs flex items-center justify-between gap-2 animate-in fade-in"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">💬</span>
            <p className="font-medium text-xs sm:text-sm">{feedback}</p>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="p-1 rounded-lg hover:bg-amber-100 text-amber-700"
            aria-label="Fechar dica"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Cenário Interativo com Objetos Clicáveis */}
      <div className="relative w-full h-[360px] sm:h-[400px] rounded-3xl bg-gradient-to-b from-[#FFF5F6] via-[#FFEBEF] to-[#FED7E2]/40 border-2 border-rose-200/80 shadow-md overflow-hidden select-none">
        {/* Detalhes de Cenário */}
        <div className="absolute inset-x-6 bottom-4 h-28 rounded-2xl bg-[#FFE4E6]/70 border border-rose-200/50 -rotate-1 flex items-center justify-center">
          <span className="text-rose-400/50 text-[11px] font-medium tracking-wide">
            Nosso cantinho especial ❤️
          </span>
        </div>

        {/* Itens Interativos */}
        {items.map((item) => {
          const isInspected = inspectedItems.includes(item.id);
          const isShaking = shakingItemId === item.id;
          const isTargetFound = item.isAcai && foundAcai;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              aria-label={`Investigar ${item.name}`}
              className={`absolute ${item.position} p-2 rounded-2xl transition-transform active:scale-95 cursor-pointer focus-visible:outline-rose-500 ${
                isShaking ? 'animate-bounce' : ''
              } ${isTargetFound ? 'scale-125 z-20' : 'hover:scale-105 z-10'}`}
            >
              <div
                className={`relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border transition-all ${
                  isTargetFound
                    ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-rose-500 text-white shadow-xl shadow-pink-500/50 ring-4 ring-rose-300'
                    : isInspected
                    ? 'bg-white/90 border-rose-200 text-rose-900 shadow-xs'
                    : 'bg-white/80 border-rose-200/80 text-rose-900 shadow-xs hover:border-rose-300'
                }`}
              >
                {/* SVG Render para cada item */}
                {item.iconType === 'bear' && (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 64 64" fill="none">
                    <circle cx="20" cy="18" r="8" fill="#F4A261" stroke="#E76F51" strokeWidth="2" />
                    <circle cx="44" cy="18" r="8" fill="#F4A261" stroke="#E76F51" strokeWidth="2" />
                    <circle cx="32" cy="36" r="20" fill="#E76F51" />
                    <circle cx="32" cy="30" r="16" fill="#F4A261" />
                    <ellipse cx="32" cy="34" rx="8" ry="6" fill="#FFE8D6" />
                    <ellipse cx="32" cy="32" rx="3" ry="2" fill="#6B4226" />
                    <circle cx="27" cy="27" r="2" fill="#6B4226" />
                    <circle cx="37" cy="27" r="2" fill="#6B4226" />
                    <path d="M29 36 Q32 39 35 36" stroke="#6B4226" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}

                {item.iconType === 'books' && (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 64 64" fill="none">
                    <rect x="12" y="38" width="40" height="12" rx="3" fill="#E07A5F" stroke="#C45A3F" strokeWidth="2" />
                    <rect x="16" y="26" width="36" height="12" rx="3" fill="#F2CC8F" stroke="#DDA15E" strokeWidth="2" />
                    <rect x="20" y="14" width="30" height="12" rx="3" fill="#81B29A" stroke="#5D8A74" strokeWidth="2" />
                    <path d="M26 14 L30 26" stroke="#C45A3F" strokeWidth="2" strokeDasharray="2 2" />
                  </svg>
                )}

                {item.iconType === 'camera' && (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 64 64" fill="none">
                    <rect x="10" y="20" width="44" height="32" rx="6" fill="#F4ACB7" stroke="#E56B6F" strokeWidth="2" />
                    <path d="M22 20 L26 14 H38 L42 20" fill="#E56B6F" />
                    <circle cx="32" cy="36" r="10" fill="#FFE5D9" stroke="#E56B6F" strokeWidth="2" />
                    <circle cx="32" cy="36" r="5" fill="#B56576" />
                    <circle cx="46" cy="26" r="3" fill="#FFE5D9" />
                  </svg>
                )}

                {item.iconType === 'chocolates' && (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 64 64" fill="none">
                    <path d="M12 28 L32 14 L52 28 L32 42 Z" fill="#DDBEA9" stroke="#B7947E" strokeWidth="2" />
                    <rect x="16" y="28" width="32" height="18" rx="4" fill="#CB997E" stroke="#A56E51" strokeWidth="2" />
                    <path d="M32 20 L32 46" stroke="#E76F51" strokeWidth="2" />
                    <path d="M16 34 L48 34" stroke="#E76F51" strokeWidth="2" />
                  </svg>
                )}

                {item.iconType === 'pillow' && (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 64 64" fill="none">
                    <path
                      d="M32 48 C16 40 10 26 18 18 C26 10 32 20 32 20 C32 20 38 10 46 18 C54 26 48 40 32 48 Z"
                      fill="#FFB5A7"
                      stroke="#F08080"
                      strokeWidth="2"
                    />
                    <circle cx="28" cy="22" r="1.5" fill="white" />
                  </svg>
                )}

                {item.iconType === 'flowers' && (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 64 64" fill="none">
                    <path d="M24 44 C26 36 30 26 32 18" stroke="#588157" strokeWidth="3" strokeLinecap="round" />
                    <path d="M32 44 C32 34 34 26 38 20" stroke="#588157" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="32" cy="18" r="7" fill="#E63946" />
                    <circle cx="38" cy="22" r="6" fill="#F77F00" />
                    <circle cx="26" cy="24" r="6" fill="#F4A261" />
                    <circle cx="32" cy="22" r="3" fill="#FCBF49" />
                  </svg>
                )}

                {item.iconType === 'acai' && (
                  <div className="relative">
                    <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none">
                      {/* Tigela de Açaí Roxa */}
                      <ellipse cx="32" cy="24" rx="22" ry="7" fill="#4A0E4E" />
                      <path
                        d="M10 24 C10 42 20 52 32 52 C44 52 54 42 54 24"
                        fill="#6B1D73"
                        stroke="#4A0E4E"
                        strokeWidth="2"
                      />
                      {/* Frutas por cima: morangos e banana */}
                      <ellipse cx="32" cy="22" rx="18" ry="5" fill="#38083B" />
                      <circle cx="26" cy="21" r="3.5" fill="#EF4444" />
                      <circle cx="36" cy="20" r="3.5" fill="#FACC15" />
                      <circle cx="31" cy="24" r="2.5" fill="#EF4444" />
                      {/* Colher */}
                      <path d="M42 12 L48 6 L52 10 L46 16 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
                    </svg>

                    {!foundAcai && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                      </span>
                    )}
                  </div>
                )}

                <span className="text-[10px] sm:text-xs font-semibold mt-1 max-w-[80px] text-center truncate">
                  {item.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-rose-700/80">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Dica do seu amor: Procura por algo roxo e bem geladinho! 🍧</span>
      </div>

      {/* Modal de Conclusão com o Texto Exato */}
      {foundAcai && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in zoom-in-95"
        >
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-rose-200 text-center space-y-5">
            <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-purple-200 via-pink-100 to-rose-200 flex items-center justify-center shadow-lg border border-white">
              <span className="text-4xl animate-bounce">🍧</span>
              <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-amber-400" />
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>1º Coração Desbloqueado!</span>
              </div>

              {/* Mensagem de Conclusão Exata Requisitada */}
              <p className="text-base sm:text-lg font-serif-romantic font-bold text-rose-950 leading-relaxed px-2">
                “KKKKKK! Finalmente encontramos o lendário açaí! 😂🍧 Demorei anos para pagar
                essa dívida, mas tem uma coisa que nunca vai acabar: meu amor por você! ❤️”
              </p>
            </div>

            {/* Botão de Avanço Exato Requisitado */}
            <div className="pt-2">
              <button
                onClick={handleContinue}
                className="w-full min-h-[48px] py-3 px-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-base shadow-md shadow-rose-400/40 hover:shadow-rose-400/60 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar, meu amor 💗</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
