import React, { useState } from 'react';
import { Heart, Sparkles, Lock, Unlock, CornerDownLeft, AlertCircle, Mail, Eye } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireRomanticConfetti, fireGrandLoveConfetti } from '../utils/confetti';
import { matchesAnswer, ROMANTIC_CONFIG } from '../utils/config';

interface Phase4ChestAndLetterProps {
  onComplete: () => void;
}

export const Phase4ChestAndLetter: React.FC<Phase4ChestAndLetterProps> = ({ onComplete }) => {
  const [chestAnswer, setChestAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnswerWrong, setIsAnswerWrong] = useState<boolean>(false);
  const [chestUnlocked, setChestUnlocked] = useState<boolean>(false);
  const [envelopeRevealed, setEnvelopeRevealed] = useState<boolean>(false);
  const [envelopeOpening, setEnvelopeOpening] = useState<boolean>(false);
  const [letterOpened, setLetterOpened] = useState<boolean>(false);
  const [fullTextMode, setFullTextMode] = useState<boolean>(false);

  // Parágrafos EXATOS da carta original (preservação 100% fiel da redação, pontuação e emojis):
  const letterParagraphs = [
    'Oii, meu amor, então nem sei por onde começar isso. Mas estou fazendo essa cartinha para você, pra você saber o quanto eu te amo.',
    'Oooh, garotinha enrolada sô, demorei anos para conseguir pagar o açaí que eu te devia kkkkk.',
    'Aqui foi onde tudo começou kkkk. Não imaginei que você iria virar uma pessoa tão importante e especial na minha vida.',
    'Você é o meu amor de anos. Sabe muito bem que não é de agora que eu gosto de você. Esses 2 anos foi quando virei o seu amor, mas você já era o meu amor a muitos anos antes.',
    'Não sou muito bom em palavras, mas vou tentar. Você é a pessoa que eu mais amei nessa vida. Você é a dona do meu coração. Todos os dias, você me dá forças para continuar. Você faz parte de todos os planos da minha vida. Eu não me vejo sem você, a primeira pessoa onde eu realmente quis construir minha família. Obrigado por colorir meus dias. Quando não estou bem, você é o meu refúgio.',
    'Me sinto o cara mais sortudo desse mundo, tendo uma pessoa tão incrível ao meu lado.',
    'Obrigado por sempre estar comigo, obrigado por se importar tanto comigo. Obrigado por me fazer tão feliz.',
    'É você que eu quero até o último dia da minha vida, e eu vou lutar todo dia para que eu seja o seu amor até o fim.',
    'Espero que continue se apaixonando por mim todos os dias, igual eu me apaixono mais por você a cada dia.',
    'Sinto que Deus tem um propósito nas nossas vidas. Ele quer que a gente tenha uma família linda.',
    'Se nossos filhos puxarem os seus olhos, eu serei o cara mais sortudo desse mundo todo. Eu já sou, só por ter um mulherão desse do meu lado. A mulher mais linda desse mundo inteiro!',
    'Só te peço que continue me amando e que sempre se apaixone por mim cada vez mais e mais.',
    'Vou continuar te escolhendo, todos os dias da minha vida.',
    'EU TE AMO MUITO, VOCÊ É A DONA DO MEU CORAÇÃO!!!',
  ];

  const letterSignature = '                                                                    BEIJINHOS❤️❤️';

  // Validação da pergunta final
  const handleChestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chestAnswer.trim()) return;

    if (matchesAnswer(chestAnswer, ROMANTIC_CONFIG.acceptedGirlfriendAnswers)) {
      romanticAudio.playGrandDiscovery();
      fireRomanticConfetti();
      setIsAnswerWrong(false);
      setFeedback(null);
      setChestUnlocked(true);

      // Transição para revelar o envelope após a animação do baú
      setTimeout(() => {
        setEnvelopeRevealed(true);
      }, 1500);
    } else {
      romanticAudio.playOops();
      setIsAnswerWrong(true);
      setFeedback('Eita, minha princesa! 😂 Você está pertinho... tenta mais uma vez!');
    }
  };

  // Abertura do Envelope
  const handleOpenEnvelope = () => {
    romanticAudio.playSealBreak();
    setEnvelopeOpening(true);

    setTimeout(() => {
      setLetterOpened(true);
      setEnvelopeOpening(false);
      fireGrandLoveConfetti();
      onComplete(); // marca a 4ª fase como concluída
    }, 1200);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-4 px-4 flex flex-col items-center space-y-6">
      {/* =========================================================================
          ESTÁGIO 1: O BAÚ MISTERIOSO (Antes de destrancar)
      ========================================================================= */}
      {!chestUnlocked && (
        <div className="w-full text-center space-y-5 animate-in fade-in">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-semibold">
              <span>Missão Final</span>
              <span aria-hidden="true">·</span>
              <span>O Segredo Guardado</span>
            </div>

            <h2 className="font-serif-romantic text-2xl sm:text-3xl font-bold text-rose-950">
              A Última Missão: Provar Nosso Amor 🔐
            </h2>

            <p className="text-sm text-rose-800/85 max-w-md mx-auto leading-relaxed">
              Você chegou até aqui, meu amor! Mas ainda guardei uma última surpresa só para
              você. Responda à última pergunta para abrir nosso baú. 💗
            </p>
          </div>

          {/* O Baú Fechado com Brilhos e Detalhes Dourados */}
          <div className="relative w-full h-56 sm:h-64 rounded-3xl bg-gradient-to-b from-[#2D0B18] via-[#4A1525] to-[#1E0610] border-2 border-amber-300/60 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-radial from-rose-500/20 via-transparent to-transparent pointer-events-none" />

            {/* Partículas douradas ao redor do baú */}
            <div className="absolute top-4 left-6 text-amber-300 animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="absolute bottom-6 right-6 text-amber-300 animate-pulse" style={{ animationDelay: '0.6s' }}>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="absolute top-6 right-8 text-rose-400 animate-bounce">
              <Heart className="w-4 h-4 fill-rose-400" />
            </div>

            {/* Ilustração SVG do Baú Romântico Fechado */}
            <div className="relative z-10 flex flex-col items-center">
              <svg className="w-36 h-36 sm:w-40 sm:h-40 drop-shadow-xl" viewBox="0 0 100 100" fill="none">
                {/* Tampa do Baú */}
                <path
                  d="M15 45 C15 28 85 28 85 45 Z"
                  fill="#78350F"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                />
                {/* Friso dourado da tampa */}
                <path d="M15 45 H85" stroke="#FBBF24" strokeWidth="3" />
                <path d="M30 33 C30 30 70 30 70 33" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
                {/* Corpo do Baú */}
                <path
                  d="M15 45 L20 80 H80 L85 45 Z"
                  fill="#92400E"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                />
                {/* Listras de ferro dourado no baú */}
                <line x1="32" y1="45" x2="34" y2="80" stroke="#FBBF24" strokeWidth="3" />
                <line x1="68" y1="45" x2="66" y2="80" stroke="#FBBF24" strokeWidth="3" />
                {/* Fechadura de Coração Dourada */}
                <circle cx="50" cy="52" r="10" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1.5" />
                <path
                  d="M50 48 C48 45 44 47 44 50 C44 53 50 56 50 56 C50 56 56 53 56 50 C56 47 52 45 50 48 Z"
                  fill="#B45309"
                />
              </svg>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-medium mt-1">
                <Lock className="w-3 h-3 text-amber-300" />
                <span>Trancado com chave de amor</span>
              </div>
            </div>
          </div>

          {/* Cartão de Resposta da Pergunta Final */}
          <div className="w-full bg-white rounded-3xl p-5 sm:p-6 border border-rose-200 shadow-md space-y-4 text-left">
            <h3 className="font-serif-romantic text-lg sm:text-xl font-bold text-rose-950 text-center">
              “Quem é a pessoa que eu quero escolher todos os dias da minha vida?”
            </h3>

            <form onSubmit={handleChestSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={chestAnswer}
                  onChange={(e) => {
                    setChestAnswer(e.target.value);
                    if (isAnswerWrong) setIsAnswerWrong(false);
                  }}
                  placeholder="Digite sua resposta..."
                  className="w-full h-12 px-4 rounded-xl border border-rose-200 bg-rose-50/30 text-rose-950 placeholder:text-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!chestAnswer.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 transition-all"
                >
                  <span>Abrir baú</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[11px] text-rose-400 text-center">
                Dica do seu amor: pensa com carinho em quem eu quero escolher todos os dias... você! ❤️
              </p>
            </form>

            {/* Mensagem de Erro Específica */}
            {feedback && (
              <div
                role="alert"
                className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in"
              >
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{feedback}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          ESTÁGIO 2: O BAÚ ABERTO & REVELAÇÃO DO ENVELOPE FECHADO
      ========================================================================= */}
      {chestUnlocked && !envelopeRevealed && (
        <div className="w-full text-center space-y-6 py-6 animate-in zoom-in-95">
          <div className="relative mx-auto w-36 h-36 flex items-center justify-center">
            {/* Luz rosa iluminando a tela */}
            <div className="absolute inset-0 rounded-full bg-pink-400/40 blur-3xl animate-pulse" />

            {/* Ilustração SVG do Baú Aberto com Luz Radiante */}
            <svg className="w-36 h-36 drop-shadow-2xl z-10" viewBox="0 0 100 100" fill="none">
              <path d="M15 35 C15 15 85 15 85 35 Z" fill="#78350F" stroke="#F59E0B" strokeWidth="2.5" />
              <path d="M15 45 L20 80 H80 L85 45 Z" fill="#92400E" stroke="#F59E0B" strokeWidth="2.5" />
              {/* Feixes de luz rosa e dourada saindo de dentro */}
              <polygon points="50,45 25,10 75,10" fill="url(#pinkGlow)" opacity="0.75" />
              <circle cx="50" cy="50" r="14" fill="#F472B6" />
              <defs>
                <linearGradient id="pinkGlow" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif-romantic text-2xl font-bold text-rose-950">
              O baú se abriu! ✨
            </h3>
            <p className="text-sm font-medium text-rose-800">
              “Você desbloqueou minha última surpresa, meu amor! Mas ela ainda está guardadinha... 💗”
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          ESTÁGIO 3: O ENVELOPE FECHADO (Permanece fechado até ela tocar)
      ========================================================================= */}
      {envelopeRevealed && !letterOpened && (
        <div className="w-full text-center space-y-6 py-2 animate-in fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Surpresa Final Desbloqueada</span>
            </div>

            {/* Frase Exata Requisitada */}
            <h2 className="font-serif-romantic text-xl sm:text-2xl md:text-3xl font-bold text-rose-950 leading-snug px-2">
              “Meu amor, tem uma cartinha minha esperando por você aí dentro. Escrevi cada palavra pensando em você. Quando estiver pronta, toque para abrir. 💌”
            </h2>
          </div>

          {/* Ilustração Realista do Envelope com Selo de Cera em Formato de Coração */}
          <div className="relative mx-auto w-full max-w-xs h-56 rounded-3xl bg-gradient-to-br from-[#FFF9F5] via-[#FFF1F2] to-[#FFE4E6] border-2 border-amber-300/70 shadow-xl flex items-center justify-center overflow-hidden">
            {/* Linhas dobradas da carta / envelope clássico */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 220" fill="none">
              <polygon points="0,0 160,110 320,0" fill="#FFE4E8" stroke="#FBCFE8" strokeWidth="1.5" />
              <polygon points="0,220 160,110 320,220" fill="#FFF1F2" opacity="0.6" />
              <line x1="0" y1="220" x2="160" y2="110" stroke="#F9A8D4" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="320" y1="220" x2="160" y2="110" stroke="#F9A8D4" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            {/* Selo de Cera Vermelho com Formato de Coração e Ouro */}
            <div
              className={`relative z-10 flex flex-col items-center justify-center transition-transform ${
                envelopeOpening ? 'scale-125 rotate-12 opacity-50' : 'hover:scale-105'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-red-800 border-2 border-amber-300 shadow-lg flex items-center justify-center">
                <Heart className="w-8 h-8 text-amber-200 fill-amber-200 drop-shadow-sm" />
              </div>
              <span className="font-script-romantic text-xs text-rose-800/70 mt-1">
                Com todo meu amor
              </span>
            </div>

            {/* Brilhos ao redor do envelope */}
            <div className="absolute top-3 right-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }}>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* Botão Exato: “Abrir minha cartinha ❤️” */}
          <div className="pt-2">
            <button
              onClick={handleOpenEnvelope}
              disabled={envelopeOpening}
              className="w-full sm:w-auto min-w-[260px] min-h-[52px] px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-base shadow-lg shadow-rose-400/40 hover:shadow-rose-400/60 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <Mail className="w-5 h-5" />
              <span>{envelopeOpening ? 'Rompendo o selo...' : 'Abrir minha cartinha ❤️'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          ESTÁGIO 4: A CARTA FINAL COMPLETA (Texto 100% Original e Intocado)
      ========================================================================= */}
      {letterOpened && (
        <div className="w-full animate-in zoom-in-95 space-y-4">
          {/* Barra de Ações de Conforto de Leitura */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5 text-xs text-rose-700 font-semibold">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Nossa Carta de Amor 💌</span>
            </div>

            <button
              onClick={() => setFullTextMode(!fullTextMode)}
              className="text-xs text-rose-600 hover:text-rose-900 underline flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{fullTextMode ? 'Modo pergaminho' : 'Ver em tela cheia'}</span>
            </button>
          </div>

          {/* Cartão Grande e Elegante da Carta de Amor */}
          <article
            tabIndex={0}
            aria-label="Minha cartinha romântica escrita com todo o coração para você"
            className="w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-rose-200/90 shadow-2xl relative overflow-hidden select-text text-left focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            {/* Marca d'água romântica no canto da folha */}
            <div className="absolute top-4 right-4 text-rose-100/50 pointer-events-none">
              <Heart className="w-28 h-28 fill-current" />
            </div>

            {/* Decorações sutis nas bordas */}
            <div className="absolute top-2 left-3 text-[10px] text-amber-600/50 uppercase tracking-widest font-mono">
              ★ Para a dona do meu coração ★
            </div>

            {/* CORPO DA CARTA - CADA PARÁGRAFO EXATO E INALTERADO */}
            <div className="relative z-10 space-y-5 text-rose-950 font-serif-romantic text-base sm:text-lg leading-relaxed sm:leading-loose">
              {letterParagraphs.map((paragraph, idx) => (
                <p key={idx} className="indent-2 sm:indent-4">
                  {paragraph}
                </p>
              ))}

              {/* ASSINATURA FINAL PRESERVADA COM EXATIDÃO */}
              <div className="pt-6 pb-2 text-right">
                <p className="whitespace-pre-wrap font-serif-romantic font-bold text-rose-900 text-base sm:text-lg tracking-wide">
                  {letterSignature}
                </p>
              </div>
            </div>

            {/* Rodapé Decorativo Suave */}
            <div className="relative z-10 mt-8 pt-4 border-t border-rose-100/80 flex items-center justify-center gap-2 text-rose-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <Heart className="w-4 h-4 fill-rose-400" />
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </article>

          {/* Mensagem de Celebração Final */}
          <div className="text-center py-4 space-y-2">
            <p className="text-xs text-rose-500 font-medium">
              Eu te amo infinitamente, minha princesa! Obrigado por ser o amor da minha vida ❤️
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
