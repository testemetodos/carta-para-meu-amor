import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  type: 'heart' | 'sparkle';
}

export const FloatingBackground: React.FC = () => {
  // Gera partículas fixas baseadas em useMemo para evitar renderizações desnecessárias
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 16 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 6,
      opacity: Math.random() * 0.4 + 0.15,
      type: i % 3 === 0 ? 'sparkle' : 'heart',
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* Gradientes delicados de fundo */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] rounded-full bg-rose-200/30 blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-[380px] h-[380px] rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-amber-100/30 blur-3xl" />

      {/* Partículas flutuantes */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute will-change-transform"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animation: `floatSlow ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'heart' ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-pink-400/60 drop-shadow-sm"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              width={p.size * 0.8}
              height={p.size * 0.8}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-amber-300/70"
            >
              <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
