import React from 'react';

export function HeartDivider() {
  return (
    <div className="flex items-center justify-center gap-2 my-4">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-200" />
      <span className="text-pink-300 text-xs">♥</span>
      <div className="h-px w-8 bg-pink-200" />
      <span className="text-pink-300 text-xs">♥</span>
      <div className="h-px w-8 bg-pink-200" />
      <span className="text-pink-300 text-xs">♥</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-200" />
    </div>
  );
}

export function CuteBow({ className = "" }) {
  return (
    <svg viewBox="0 0 40 24" className={`w-8 h-5 ${className}`}>
      <path
        d="M20 12C20 12 12 4 6 6C0 8 2 14 6 14C10 14 16 12 20 12Z"
        fill="#f9a8d4"
      />
      <path
        d="M20 12C20 12 28 4 34 6C40 8 38 14 34 14C30 14 24 12 20 12Z"
        fill="#f9a8d4"
      />
      <circle cx="20" cy="12" r="3" fill="#ec4899" />
      <path
        d="M18 14C18 14 17 20 20 22C23 20 22 14 22 14"
        fill="#f9a8d4"
      />
    </svg>
  );
}

export function StarBurst({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute -top-1 -left-1 text-yellow-300 text-[8px] animate-pulse">✦</span>
      <span className="absolute -top-2 left-2 text-pink-300 text-[10px] animate-pulse" style={{ animationDelay: '0.3s' }}>✧</span>
      <span className="absolute top-0 -right-1 text-purple-300 text-[8px] animate-pulse" style={{ animationDelay: '0.6s' }}>✦</span>
    </div>
  );
}