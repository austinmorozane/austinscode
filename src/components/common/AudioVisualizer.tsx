import { useEffect, useRef, useState } from 'react';
import React from 'react';

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export const AudioVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getUserMedia = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(userStream);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
    const canvas = canvasRef.current;

  useEffect(() => {

    if (!canvas || !stream) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 4096;
const lowpass = audioContext.createBiquadFilter();
lowpass.type = 'bandpass';
const source = audioContext.createMediaStreamSource(stream);
source.connect(lowpass);
lowpass.connect(analyser);    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!ctx) return;
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#333333';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength;
      let barHeight;
      let x = 0;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#FF66FF');
      gradient.addColorStop(0.5, '#66FFFF');
      gradient.addColorStop(1, '#66FF66');

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        const rectX = x;
        const rectY = canvas.height - barHeight;

        ctx.fillStyle = gradient;
        ctx.fillRect(rectX, rectY, barWidth, barHeight);

        if (x + barWidth >= canvas.width) break;

        x += barWidth + 1;
      }

      ctx.fillStyle = gradient;
      ctx.font = '0.90vmax Arial';
      const frequencies = [0, 500, 4000, 8000, 16000];
      const spacing = 8;
      let prevXPos = 0;

      frequencies.forEach((freq, index) => {
        const pos = (freq / 20000) * canvas.width;
        const text = `${freq} Hz`;
        const textWidth = ctx.measureText(text).width;

        let xPos = Math.min(pos, canvas.width - textWidth - spacing);

        if (index > 0) {
          const prevFreq = frequencies[index - 1];
          const prevTextWidth = ctx.measureText(`${prevFreq} Hz`).width;
          const prevPos = (prevFreq / 20000) * canvas.width;

          if (xPos < prevXPos + prevTextWidth + spacing) {
            xPos = prevXPos + prevTextWidth + spacing;
          }
        }

        ctx.save();
        ctx.translate(xPos, canvas.height - 10);
        ctx.fillText(text, 0, 0);
        ctx.restore();

        prevXPos = xPos;
      });
    };

  draw();

    return () => {
      audioContext.close();
      stream.getTracks().forEach((track) => track.stop());
    };
  }, [stream, canvas, audioContextRef]);

  return (
    <div style={{ display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
      <button className="hlight" onClick={getUserMedia}>
        Enable Microphone Input
      </button>
      <canvas
        ref={canvasRef}
        style={{
          backgroundColor: '#333333',
          border: '1px solid #0FF',
          borderRadius: '1.0vw',
          width: '70svw',
          height: '55svh',
        }}
      />
      <br />
    </div>
  );
};
