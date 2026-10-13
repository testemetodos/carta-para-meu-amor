/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phase } from './types';
import { romanticAudio } from './utils/audio';
import { Header } from './components/Header';
import { FloatingBackground } from './components/FloatingBackground';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Phase1AcaiHunt } from './components/Phase1AcaiHunt';
import { Phase2Quiz } from './components/Phase2Quiz';
import { Phase3Reasons } from './components/Phase3Reasons';
import { Phase4ChestAndLetter } from './components/Phase4ChestAndLetter';

const STORAGE_KEYS = {
  CURRENT_PHASE: 'nossa_historia_current_phase',
  COMPLETED_PHASES: 'nossa_historia_completed_phases',
  SOUND_ENABLED: 'nossa_historia_sound_enabled',
};

export default function App() {
  const [currentPhase, setCurrentPhase] = useState<Phase>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_PHASE);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 0 && parsed <= 4) return parsed as Phase;
      }
    } catch {
      // Storage unavailable or error
    }
    return 0;
  });

  const [completedPhases, setCompletedPhases] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_PHASES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Storage unavailable or error
    }
    return [];
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
      if (saved !== null) return saved === 'true';
    } catch {
      // Storage unavailable or error
    }
    return true;
  });

  // Salvar no localStorage sempre que o progresso mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PHASE, currentPhase.toString());
    } catch {
      // Safe fallback
    }
  }, [currentPhase]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_PHASES, JSON.stringify(completedPhases));
    } catch {
      // Safe fallback
    }
  }, [completedPhases]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, soundEnabled.toString());
      romanticAudio.setMuted(!soundEnabled);
    } catch {
      // Safe fallback
    }
  }, [soundEnabled]);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_PHASE);
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_PHASES);
    } catch {
      // Safe fallback
    }
    setCompletedPhases([]);
    setCurrentPhase(0);
  };

  // Transições de fase
  const handleStartGame = () => {
    setCurrentPhase(1);
  };

  const handleCompletePhase1 = () => {
    if (!completedPhases.includes(1)) {
      setCompletedPhases((prev) => [...prev, 1]);
    }
    setCurrentPhase(2);
  };

  const handleCompletePhase2 = () => {
    if (!completedPhases.includes(2)) {
      setCompletedPhases((prev) => [...prev, 2]);
    }
    setCurrentPhase(3);
  };

  const handleCompletePhase3 = () => {
    if (!completedPhases.includes(3)) {
      setCompletedPhases((prev) => [...prev, 3]);
    }
    setCurrentPhase(4);
  };

  const handleCompletePhase4 = () => {
    if (!completedPhases.includes(4)) {
      setCompletedPhases((prev) => [...prev, 4]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F8] via-[#FFF1F3] to-[#FFF5F7] text-rose-950 flex flex-col relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      {/* Elementos Flutuantes Românticos de Fundo */}
      <FloatingBackground />

      {/* Cabeçalho com Progresso de Corações e Ações */}
      <Header
        currentPhase={currentPhase}
        completedPhases={completedPhases}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onReset={handleReset}
        onNavigatePhase={setCurrentPhase}
      />

      {/* Conteúdo Principal Centralizado (Otimizado Mobile First) */}
      <main className="flex-1 w-full flex flex-col justify-center items-center py-4 sm:py-8 z-10">
        {currentPhase === 0 && (
          <WelcomeScreen
            completedPhases={completedPhases}
            onStart={handleStartGame}
          />
        )}

        {currentPhase === 1 && (
          <Phase1AcaiHunt onComplete={handleCompletePhase1} />
        )}

        {currentPhase === 2 && (
          <Phase2Quiz onComplete={handleCompletePhase2} />
        )}

        {currentPhase === 3 && (
          <Phase3Reasons onComplete={handleCompletePhase3} />
        )}

        {currentPhase === 4 && (
          <Phase4ChestAndLetter onComplete={handleCompletePhase4} />
        )}
      </main>

      {/* Rodapé Romântico Discreto */}
      <footer className="w-full py-4 text-center text-xs text-rose-400/80 z-10 border-t border-rose-100/60 bg-[#FFF8F8]/60 backdrop-blur-xs">
        <p>Feito com todo o amor do meu coração para você, minha princesa ❤️</p>
      </footer>
    </div>
  );
}
