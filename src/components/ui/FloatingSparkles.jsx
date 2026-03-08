import React from 'react';

const sparklePositions = [
  { top: '10%', left: '5%', delay: '0s', size: 'w-3 h-3' },
  { top: '15%', right: '8%', delay: '0.5s', size: 'w-2 h-2' },
  { top: '5%', left: '25%', delay: '1s', size: 'w-2 h-2' },
  { top: '20%', right: '20%', delay: '1.5s', size: 'w-3 h-3' },
  { top: '8%', right: '35%', delay: '0.3s', size: 'w-2 h-2' },
  { top: '25%', left: '15%', delay: '0.8s', size: 'w-2 h-2' },
];

export default function FloatingSparkles() {
  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .sparkle {
          animation: twinkle 2s ease-in-out infinite, float 3s ease-in-out infinite;
        }
      `}</style>
      {sparklePositions.map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos.size} pointer-events-none sparkle`}
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            animationDelay: pos.delay,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
              fill="url(#sparkleGradient)"
            />
            <defs>
              <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </>
  );
}