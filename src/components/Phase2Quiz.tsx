import React, { useState } from 'react';
import { Heart, Sparkles, CheckCircle2, AlertCircle, ArrowRight, CornerDownLeft } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireRomanticConfetti } from '../utils/confetti';
import { matchesAnswer, ROMANTIC_CONFIG } from '../utils/config';

interface Phase2QuizProps {
  onComplete: () => void;
}

export const Phase2Quiz: React.FC<Phase2QuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState<string>('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Pergunta 1: Quem já tinha sentimentos por quem muito antes da gente começar a namorar?
  const q1Options = [
    'Você já era apaixonado por mim há anos, muito antes da gente namorar', // Correto
    'Eu me apaixonei por você em segredo primeiro',
    'Nós dois começamos a gostar no mesmo dia',
    'Nenhum de nós dois tinha sentimentos antes do pedido',
  ];

  // Pergunta 2: Quem é o mais enrolado de nós dois?
  const q2Options = [
    'Você é mais enrolado 😂',
    'Eu sou mais enrolada 🙈', // Correto (B)
    'Nós dois somos enrolados 🤣',
    'Depende da situação 😅',
  ];

  // Validação da pergunta 1
  const handleAnswerQ1 = (index: number) => {
    setSelectedOption(index);
    if (index === 0) {
      romanticAudio.playHeartCollect();
      setIsAnswerCorrect(true);
      setFeedback(
        'Acertou, minha princesa! ❤️ Você já era dona do meu coração muito antes desses dois anos juntos. Você já morava no meu peito há muito tempo!'
      );
    } else {
      romanticAudio.playOops();
      setIsAnswerCorrect(false);
      setFeedback('KKKKK, não foi dessa vez, meu amor! 😂 Pensa bem... quem é que já era apaixonado por você há anos? Tenta de novo!');
    }
  };

  // Validação da pergunta 2 (B - index 1)
  const handleAnswerQ2 = (index: number) => {
    setSelectedOption(index);
    if (index === 1) {
      romanticAudio.playHeartCollect();
      setIsAnswerCorrect(true);
      setFeedback('KKKKKKKK! Sabia que você ia reconhecer! 🤣❤️ Minha enroladinha favorita!');
    } else {
      romanticAudio.playOops();
      setIsAnswerCorrect(false);
      setFeedback('Tentando fugir da verdade, né, meu amor? Kkkkk! 😜 Você sabe bem quem enrola mais! Tenta de novo!');
    }
  };

  // Validação da pergunta 3 (Texto: açaí / acai)
  const handleAnswerQ3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textAnswer.trim()) return;

    if (matchesAnswer(textAnswer, ROMANTIC_CONFIG.acaiAnswers)) {
      romanticAudio.playGrandDiscovery();
      fireRomanticConfetti();
      setIsAnswerCorrect(true);
      setFeedback(
        'FINALMENTE! KKKKKKK! 🍧😂 Essa dívida entrou para a história! Mais um coração desbloqueado para você, minha princesa! ❤️'
      );
    } else {
      romanticAudio.playOops();
      setIsAnswerCorrect(false);
      setFeedback(
        'KKKKK, não foi dessa vez, minha princesa! 😂 Pensa naquela dívida histórica que demorei anos para te pagar. Tenta de novo!'
      );
    }
  };

  const handleNextQuestion = () => {
    romanticAudio.playTap();
    setSelectedOption(null);
    setTextAnswer('');
    setIsAnswerCorrect(null);
    setFeedback(null);

    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setQuizCompleted(true);
      fireRomanticConfetti();
    }
  };

  const handleFinishPhase = () => {
    romanticAudio.playHeartCollect();
    onComplete();
  };

  return (
    <div className="w-full max-w-lg mx-auto py-4 px-4 flex flex-col items-center space-y-5">
      {/* Cabeçalho */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-semibold">
          <span>Missão 02 de 04</span>
          <span aria-hidden="true">·</span>
          <span>Pergunta {currentStep + 1} de 3</span>
        </div>

        <h2 className="font-serif-romantic text-2xl sm:text-3xl font-bold text-rose-950">
          Você Me Conhece Mesmo? 🧩
        </h2>

        <p className="text-sm text-rose-800/85 max-w-md mx-auto leading-relaxed">
          Vamos ver se você lembra direitinho da nossa história, meu amor? Quero ver se você me
          conhece tão bem quanto eu conheço você! ❤️
        </p>
      </div>

      {/* Indicador de Passos do Quiz */}
      <div className="flex items-center justify-center gap-2">
        {[0, 1, 2].map((step) => (
          <div
            key={step}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === currentStep
                ? 'w-8 bg-rose-500'
                : step < currentStep
                ? 'w-5 bg-rose-300'
                : 'w-4 bg-rose-200/50'
            }`}
          />
        ))}
      </div>

      {/* Cartão da Pergunta Atual */}
      {!quizCompleted ? (
        <div className="w-full bg-white/95 rounded-3xl p-5 sm:p-6 border border-rose-200/80 shadow-md space-y-5">
          {/* PERGUNTA 1 */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="font-serif-romantic text-lg sm:text-xl font-bold text-rose-950 leading-snug">
                Quem já tinha sentimentos por quem muito antes da gente começar a namorar?
              </h3>

              <div className="space-y-2.5">
                {q1Options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isRight = isSelected && isAnswerCorrect === true;
                  const isWrong = isSelected && isAnswerCorrect === false;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerQ1(idx)}
                      disabled={isAnswerCorrect === true}
                      className={`w-full min-h-[52px] p-3.5 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isRight
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 ring-2 ring-emerald-300'
                          : isWrong
                          ? 'bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-200'
                          : 'bg-white hover:bg-rose-50/50 border-rose-200/70 text-rose-900 active:scale-[0.99]'
                      }`}
                    >
                      <span>{opt}</span>
                      {isRight && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                      {isWrong && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PERGUNTA 2 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif-romantic text-lg sm:text-xl font-bold text-rose-950 leading-snug">
                Quem é o mais enrolado de nós dois? 😂
              </h3>

              <div className="space-y-2.5">
                {q2Options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isRight = isSelected && isAnswerCorrect === true;
                  const isWrong = isSelected && isAnswerCorrect === false;
                  const letter = String.fromCharCode(65 + idx);

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerQ2(idx)}
                      disabled={isAnswerCorrect === true}
                      className={`w-full min-h-[52px] p-3.5 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isRight
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 ring-2 ring-emerald-300'
                          : isWrong
                          ? 'bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-200'
                          : 'bg-white hover:bg-rose-50/50 border-rose-200/70 text-rose-900 active:scale-[0.99]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-rose-100/70 text-rose-800 text-xs font-bold flex items-center justify-center shrink-0">
                          {letter}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isRight && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                      {isWrong && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PERGUNTA 3 */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif-romantic text-lg sm:text-xl font-bold text-rose-950 leading-snug">
                Existe uma dívida histórica na nossa relação que demorou anos para ser paga... O que era essa dívida lendária?
              </h3>

              <form onSubmit={handleAnswerQ3} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={textAnswer}
                    onChange={(e) => {
                      setTextAnswer(e.target.value);
                      if (isAnswerCorrect === false) setIsAnswerCorrect(null);
                    }}
                    placeholder="Digite a resposta aqui..."
                    disabled={isAnswerCorrect === true}
                    className="w-full h-12 px-4 rounded-xl border border-rose-200 bg-rose-50/30 text-rose-950 placeholder:text-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!textAnswer.trim() || isAnswerCorrect === true}
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 transition-all"
                  >
                    <span>Responder</span>
                    <CornerDownLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-rose-400/80">
                  Dica: aceita com ou sem acento, letras maiúsculas ou minúsculas!
                </p>
              </form>
            </div>
          )}

          {/* Feedback da Resposta */}
          {feedback && (
            <div
              role="alert"
              className={`p-3.5 rounded-2xl border text-sm animate-in fade-in flex items-start gap-2.5 ${
                isAnswerCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isAnswerCorrect ? (
                  <Heart className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>
              <p className="font-medium text-xs sm:text-sm leading-relaxed">{feedback}</p>
            </div>
          )}

          {/* Botão de Avanço se Acertou a Pergunta */}
          {isAnswerCorrect && (
            <div className="pt-2">
              <button
                onClick={handleNextQuestion}
                className="w-full min-h-[48px] py-3 px-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-md shadow-rose-300/50 hover:shadow-rose-400/60 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{currentStep < 2 ? 'Próxima pergunta ❤️' : 'Ver resultado do Quiz 🎉'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Tela de Conclusão do Quiz com o Texto Exato Solicitado */
        <div className="w-full bg-white rounded-3xl p-6 sm:p-7 border-2 border-rose-200 text-center space-y-5 shadow-xl animate-in zoom-in-95">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-pink-200 via-rose-100 to-pink-300 flex items-center justify-center shadow-md">
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500 animate-pulse-heart" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>2º Coração Desbloqueado!</span>
            </div>

            {/* Texto Exato Requisitado */}
            <p className="font-serif-romantic text-lg sm:text-xl font-bold text-rose-950 leading-relaxed px-2">
              “Você conhece nossa história, meu amor! Agora vamos descobrir quantos motivos existem para eu te amar. 💗”
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleFinishPhase}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-base shadow-md shadow-rose-400/40 hover:shadow-rose-400/60 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continuar, meu amor 💗</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
