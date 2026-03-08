import React, { useEffect, useState } from 'react';

const Bow = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
    {/* Left ribbon loop */}
    <path d="M12 10 Q6 4 3 8 Q1 12 5 14 Q9 15 12 12" fill={color} opacity="0.9"/>
    {/* Right ribbon loop */}
    <path d="M12 10 Q18 4 21 8 Q23 12 19 14 Q15 15 12 12" fill={color} opacity="0.9"/>
    {/* Center knot */}
    <ellipse cx="12" cy="11" rx="2.5" ry="2" fill={color}/>
    {/* Ribbon tails */}
    <path d="M10 13 Q8 17 6 22 Q7 21 9 18 Q10 20 11 22" fill={color} opacity="0.85"/>
    <path d="M14 13 Q16 17 18 22 Q17 21 15 18 Q14 20 13 22" fill={color} opacity="0.85"/>
  </svg>
);

const Star = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
    <path d="M12 2 L14 9 L21 9 L15.5 13.5 L17.5 21 L12 16.5 L6.5 21 L8.5 13.5 L3 9 L10 9 Z" fill={color}/>
  </svg>
);

const shapes = [
  { type: 'bow', colors: ['#f472b6', '#ec4899', '#fb7185', '#f9a8d4', '#fda4af'] },
  { type: 'star', colors: ['#fbbf24', '#fcd34d', '#fef08a', '#f9a8d4', '#fda4af'] },
  { type: 'emoji', emojis: ['✨', '💖', '🌟', '💗', '💕'] }
];

export default function Confetti({ active, onComplete }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active && particles.length === 0) {
      const newParticles = Array.from({ length: 60 }, (_, i) => {
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        let shape;
        if (shapeType.type === 'bow') {
          shape = { type: 'bow', color: shapeType.colors[Math.floor(Math.random() * shapeType.colors.length)] };
        } else if (shapeType.type === 'star') {
          shape = { type: 'star', color: shapeType.colors[Math.floor(Math.random() * shapeType.colors.length)] };
        } else {
          shape = { type: 'emoji', emoji: shapeType.emojis[Math.floor(Math.random() * shapeType.emojis.length)] };
        }
        
        return {
          id: i,
          shape,
          left: Math.random() * 100,
          delay: Math.random() * 0.6,
          duration: 3 + Math.random() * 2,
          size: 20 + Math.random() * 16,
          sway: (Math.random() - 0.5) * 120,
          rotation: Math.random() * 360
        };
      });
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 5500);
      
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute animate-confetti-rise"
          style={{
            left: `${p.left}%`,
            bottom: '-30px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--sway': `${p.sway}px`,
            '--rotation': `${p.rotation}deg`
          }}
        >
          {p.shape.type === 'bow' && <Bow size={p.size} color={p.shape.color} />}
          {p.shape.type === 'star' && <Star size={p.size} color={p.shape.color} />}
          {p.shape.type === 'emoji' && <span style={{ fontSize: p.size }}>{p.shape.emoji}</span>}
        </div>
      ))}
      <style>{`
        @keyframes confetti-rise {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(0);
            opacity: 1;
          }
          10% {
            transform: translateY(-10vh) translateX(calc(var(--sway) * 0.2)) rotate(calc(var(--rotation) * 0.3)) scale(1);
            opacity: 1;
          }
          40% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) translateX(var(--sway)) rotate(calc(var(--rotation) + 360deg)) scale(0.7);
            opacity: 0;
          }
        }
        .animate-confetti-rise {
          animation: confetti-rise ease-out forwards;
        }
      `}</style>
    </div>
  );
}