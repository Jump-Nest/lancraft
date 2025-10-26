'use client';

import { useEffect, useRef } from 'react';

export default function DarkVeilBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Nastavit velikost canvasu
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.001;

      // Vyčistit canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Vytvořit gradient s animovanými vlnami
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

      // Animované barvy
      const hue1 = (time * 20) % 360;
      const hue2 = (time * 15 + 120) % 360;
      const hue3 = (time * 10 + 240) % 360;

      gradient.addColorStop(0, `hsl(${hue1}, 30%, 15%)`);
      gradient.addColorStop(0.5, `hsl(${hue2}, 25%, 8%)`);
      gradient.addColorStop(1, `hsl(${hue3}, 20%, 5%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Přidat vlnivé efekty
      for (let i = 0; i < 5; i++) {
        ctx.globalAlpha = 0.12 * (1 + Math.sin(time + i));
        
        const waveY = Math.sin(time * 0.5 + i) * canvas.height * 0.3;
        const gradientWave = ctx.createLinearGradient(0, waveY, 0, waveY + 250);
        
        gradientWave.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradientWave.addColorStop(0.5, `hsl(${(hue1 + i * 60) % 360}, 60%, 35%)`);
        gradientWave.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradientWave;
        ctx.fillRect(0, waveY, canvas.width, 350);
      }

      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}