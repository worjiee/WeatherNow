import React, { useEffect, useRef } from 'react';

interface RainEffectProps {
  intensity?: 'light' | 'medium' | 'heavy';
}

const RainEffect: React.FC<RainEffectProps> = ({ intensity = 'medium' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Rain drop properties
    const drops: {
      x: number;
      y: number;
      length: number;
      speed: number;
      thickness: number;
      opacity: number;
    }[] = [];
    
    // Determine number of drops based on intensity
    const dropCount = intensity === 'light' ? 100 : intensity === 'medium' ? 200 : 300;
    
    // Create raindrops
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 10 + 5,
        thickness: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    
    // Draw rain animation
    const drawRain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = 'rgba(174, 194, 224, 0.7)';
      ctx.lineCap = 'round';
      
      drops.forEach(drop => {
        ctx.lineWidth = drop.thickness;
        ctx.globalAlpha = drop.opacity;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
        
        // Move drops
        drop.y += drop.speed;
        
        // Reset drops that fall out of view
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(drawRain);
    };
    
    const animationId = requestAnimationFrame(drawRain);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [intensity]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="rain-effect"
    />
  );
};

export default RainEffect; 