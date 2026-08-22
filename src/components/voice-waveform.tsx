import React, { useEffect, useRef } from 'react';

export function VoiceWaveform({ isListening }: { isListening: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      if (!isListening) {
        // Draw a flat line
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
        return;
      }

      // Draw active waveform
      const barWidth = 4;
      const gap = 4;
      const barCount = Math.floor(width / (barWidth + gap));
      const midY = height / 2;

      for (let i = 0; i < barCount; i++) {
        // Generate a pseudo-random height based on time and position
        const x = i * (barWidth + gap);
        // Base sine wave
        const baseHeight = Math.sin(time + i * 0.2) * (height / 3);
        // Add some noise
        const noise = (Math.random() - 0.5) * (height / 4);
        
        // Modulate with a center bump so the edges taper off
        const distanceToCenter = Math.abs(i - barCount / 2) / (barCount / 2);
        const envelope = 1 - Math.pow(distanceToCenter, 2);
        
        const finalHeight = Math.abs(baseHeight + noise) * envelope + 2; // min 2px height
        
        // Gradient color for bars
        const gradient = ctx.createLinearGradient(0, midY - finalHeight, 0, midY + finalHeight);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0)'); // Cyan fade
        gradient.addColorStop(0.5, 'rgba(79, 70, 229, 1)'); // Indigo center
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.roundRect(x, midY - finalHeight / 2, barWidth, finalHeight, barWidth / 2);
        ctx.fill();
      }

      time += 0.15;
      animationId = requestAnimationFrame(draw);
    };

    if (isListening) {
      draw();
    } else {
      draw(); // Draw static line once
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isListening]);

  return (
    <canvas 
      ref={canvasRef} 
      width={400} 
      height={100} 
      className="w-full h-24 max-w-md mx-auto"
    />
  );
}
