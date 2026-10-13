import confetti from 'canvas-confetti';

/**
 * Dispara confetes delicados e românticos com cores suaves e corações
 */
export function fireRomanticConfetti() {
  const colors = ['#F472B6', '#FB7185', '#FDA4AF', '#FDE047', '#E879F9', '#FFFFFF'];

  // Primeira explosão central suave
  confetti({
    particleCount: 45,
    spread: 60,
    origin: { y: 0.65 },
    colors,
    ticks: 200,
    gravity: 0.9,
    scalar: 1.1,
    shapes: ['circle'],
  });

  // Explosão lateral esquerda
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.7 },
      colors,
      ticks: 220,
    });
  }, 180);

  // Explosão lateral direita
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.7 },
      colors,
      ticks: 220,
    });
  }, 320);
}

/**
 * Super celebração para a revelação da carta final
 */
export function fireGrandLoveConfetti() {
  const end = Date.now() + 2.5 * 1000;
  const colors = ['#F43F5E', '#EC4899', '#FB7185', '#FBBF24', '#F472B6', '#FFF1F2'];

  const interval: ReturnType<typeof setInterval> = setInterval(function () {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 80,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.4 + 0.1,
      },
      colors,
      scalar: 1.2,
    });
  }, 300);
}
