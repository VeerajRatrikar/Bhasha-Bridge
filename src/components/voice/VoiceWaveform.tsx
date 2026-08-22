'use client';

import React, { useEffect, useRef } from 'react';

interface VoiceWaveformProps {
  isListening: boolean;
  barCount?: number;
  height?: number;
}

export function VoiceWaveform({
  isListening,
  barCount = 32,
  height = 56,
}: VoiceWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = (rect.width || 340) * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      ctx.clearRect(0, 0, rect.width || 340, height);

      const barWidth = (rect.width || 340) / barCount;
      const centerY = height / 2;

      for (let i = 0; i < barCount; i++) {
        let amplitude = 6;
        if (isListening) {
          amplitude = Math.sin(phase + i * 0.25) * 18 + Math.cos(phase * 1.4 + i * 0.35) * 14 + 22;
          amplitude = Math.max(6, Math.min(height - 8, amplitude));
        }

        const x = i * barWidth + barWidth * 0.2;
        const width = barWidth * 0.6;
        const barHeight = amplitude;
        const y = centerY - barHeight / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isListening) {
          gradient.addColorStop(0, '#f9692c');
          gradient.addColorStop(0.5, '#ef5623');
          gradient.addColorStop(1, '#d97706');
        } else {
          gradient.addColorStop(0, 'rgba(239, 86, 35, 0.4)');
          gradient.addColorStop(1, 'rgba(249, 105, 44, 0.2)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, width, barHeight, 3);
        } else {
          ctx.rect(x, y, width, barHeight);
        }
        ctx.fill();

        // Glowing peak dot on top of active bar
        if (isListening && barHeight > 18) {
          ctx.fillStyle = '#f9692c';
          ctx.beginPath();
          ctx.arc(x + width / 2, y - 2, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      phase += isListening ? 0.15 : 0.03;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isListening, barCount, height]);

  return (
    <div className="w-full flex items-center justify-center py-1">
      <canvas
        ref={canvasRef}
        className="w-full max-w-sm rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-inner"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}

