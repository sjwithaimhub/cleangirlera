import React from 'react';

const avatarStyles = {
  coral: {
    bg: 'bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400',
    emoji: '🌸'
  },
  violet: {
    bg: 'bg-gradient-to-br from-purple-300 via-violet-300 to-purple-400',
    emoji: '💜'
  },
  teal: {
    bg: 'bg-gradient-to-br from-teal-200 via-cyan-300 to-teal-300',
    emoji: '🦋'
  },
  amber: {
    bg: 'bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-300',
    emoji: '✨'
  }
};

export default function GirlyAvatar({ name, color, size = 'md' }) {
  const style = avatarStyles[color] || avatarStyles.coral;
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg'
  };

  return (
    <div className={`${sizeClasses[size]} ${style.bg} rounded-full flex items-center justify-center shadow-md ring-2 ring-white/50`}>
      <span className="font-semibold text-white drop-shadow-sm">
        {name?.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}