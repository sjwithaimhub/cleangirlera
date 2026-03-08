import React from 'react';

export const cuteAvatars = [
  { id: 'cat-vacuum', name: 'Kitty', bg: 'from-violet-200 to-purple-300' },
  { id: 'bunny-mop', name: 'Bunny', bg: 'from-sky-200 to-blue-300' },
  { id: 'bear-bucket', name: 'Bear', bg: 'from-emerald-200 to-teal-300' },
  { id: 'puppy-broom', name: 'Puppy', bg: 'from-rose-200 to-pink-300' },
  { id: 'panda-spray', name: 'Panda', bg: 'from-indigo-200 to-violet-300' },
  { id: 'hamster-duster', name: 'Hamster', bg: 'from-teal-200 to-cyan-300' }
];

function KawaiiAnimal({ avatarId, size = 40 }) {
  const s = size;
  
  if (avatarId === 'cat-vacuum') {
    return (
      <svg width={s} height={s} viewBox="0 0 50 50">
        {/* Cat body */}
        <ellipse cx="25" cy="32" rx="12" ry="10" fill="#f5deb3"/>
        <ellipse cx="25" cy="32" rx="10" ry="8" fill="#fef3c7"/>
        {/* Spots */}
        <ellipse cx="20" cy="15" rx="3" ry="2" fill="#d4a574"/>
        <ellipse cx="30" cy="18" rx="2" ry="2" fill="#d4a574"/>
        {/* Head */}
        <ellipse cx="25" cy="18" rx="11" ry="10" fill="#f5deb3"/>
        {/* Ears */}
        <path d="M14 12 L16 4 L20 10" fill="#f5deb3" stroke="#f5deb3"/>
        <path d="M36 12 L34 4 L30 10" fill="#f5deb3" stroke="#f5deb3"/>
        <path d="M15.5 10 L17 5 L19 9" fill="#fecdd3"/>
        <path d="M34.5 10 L33 5 L31 9" fill="#fecdd3"/>
        {/* Face */}
        <ellipse cx="20" cy="17" rx="2.5" ry="3" fill="#1e1e1e"/>
        <ellipse cx="30" cy="17" rx="2.5" ry="3" fill="#1e1e1e"/>
        <circle cx="19" cy="16" r="1" fill="#fff"/>
        <circle cx="29" cy="16" r="1" fill="#fff"/>
        {/* Blush */}
        <ellipse cx="15" cy="21" rx="3" ry="1.5" fill="#fecdd3" opacity="0.7"/>
        <ellipse cx="35" cy="21" rx="3" ry="1.5" fill="#fecdd3" opacity="0.7"/>
        {/* Nose & mouth */}
        <ellipse cx="25" cy="21" rx="2" ry="1.5" fill="#fca5a5"/>
        <path d="M25 22.5 L25 24 M22 25 Q25 27 28 25" stroke="#8b7355" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Whiskers */}
        <path d="M12 20 L18 21 M12 23 L18 23" stroke="#d4a574" strokeWidth="0.5"/>
        <path d="M38 20 L32 21 M38 23 L32 23" stroke="#d4a574" strokeWidth="0.5"/>
        {/* Arms holding vacuum */}
        <ellipse cx="18" cy="32" rx="3" ry="4" fill="#f5deb3"/>
        <ellipse cx="32" cy="32" rx="3" ry="4" fill="#f5deb3"/>
        {/* Vacuum */}
        <ellipse cx="20" cy="44" rx="6" ry="4" fill="#f9a8d4"/>
        <rect x="22" y="35" width="3" height="10" rx="1" fill="#fbb6ce" transform="rotate(-15 24 40)"/>
        <path d="M26 36 L30 44 L34 44 L32 42" fill="#f9a8d4"/>
        {/* Tail */}
        <path d="M37 35 Q42 32 40 28" stroke="#f5deb3" strokeWidth="4" fill="none" strokeLinecap="round"/>
      </svg>
    );
  }
  
  if (avatarId === 'bunny-mop') {
    return (
      <svg width={s} height={s} viewBox="0 0 50 50">
        {/* Body */}
        <ellipse cx="25" cy="34" rx="10" ry="9" fill="#fff"/>
        {/* Head */}
        <ellipse cx="25" cy="22" rx="10" ry="9" fill="#fff"/>
        {/* Ears */}
        <ellipse cx="18" cy="8" rx="4" ry="10" fill="#fff"/>
        <ellipse cx="32" cy="8" rx="4" ry="10" fill="#fff"/>
        <ellipse cx="18" cy="8" rx="2" ry="7" fill="#fecdd3"/>
        <ellipse cx="32" cy="8" rx="2" ry="7" fill="#fecdd3"/>
        {/* Bow on ear */}
        <path d="M35 6 L40 3 L38 6 L40 9 L35 6" fill="#f472b6"/>
        <circle cx="35" cy="6" r="1.5" fill="#ec4899"/>
        {/* Face */}
        <ellipse cx="20" cy="21" rx="2" ry="2.5" fill="#1e1e1e"/>
        <ellipse cx="30" cy="21" rx="2" ry="2.5" fill="#1e1e1e"/>
        <circle cx="19.5" cy="20" r="0.8" fill="#fff"/>
        <circle cx="29.5" cy="20" r="0.8" fill="#fff"/>
        {/* Blush */}
        <ellipse cx="15" cy="24" rx="2.5" ry="1.5" fill="#fecdd3" opacity="0.8"/>
        <ellipse cx="35" cy="24" rx="2.5" ry="1.5" fill="#fecdd3" opacity="0.8"/>
        {/* Nose */}
        <ellipse cx="25" cy="25" rx="2" ry="1.5" fill="#fca5a5"/>
        <path d="M25 26.5 L25 27.5 M23 28 Q25 29.5 27 28" stroke="#d4a574" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        {/* Arms with mop */}
        <ellipse cx="16" cy="33" rx="3" ry="4" fill="#fff"/>
        <ellipse cx="34" cy="33" rx="3" ry="4" fill="#fff"/>
        {/* Mop */}
        <rect x="36" y="26" width="2.5" height="18" rx="1" fill="#d4a574"/>
        <rect x="33" y="43" width="9" height="5" rx="2" fill="#a8a29e"/>
        <path d="M33 46 L32 48 M35 46 L35 49 M37 46 L37 48 M39 46 L39 49 M41 46 L42 48" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Feet */}
        <ellipse cx="20" cy="43" rx="4" ry="2" fill="#fecdd3"/>
        <ellipse cx="30" cy="43" rx="4" ry="2" fill="#fecdd3"/>
      </svg>
    );
  }
  
  if (avatarId === 'bear-bucket') {
    return (
      <svg width={s} height={s} viewBox="0 0 50 50">
        {/* Body */}
        <ellipse cx="25" cy="34" rx="11" ry="10" fill="#d4a574"/>
        <ellipse cx="25" cy="35" rx="8" ry="6" fill="#f5deb3"/>
        {/* Head */}
        <ellipse cx="25" cy="20" rx="12" ry="11" fill="#d4a574"/>
        {/* Ears */}
        <circle cx="12" cy="12" r="5" fill="#d4a574"/>
        <circle cx="38" cy="12" r="5" fill="#d4a574"/>
        <circle cx="12" cy="12" r="3" fill="#c4a484"/>
        <circle cx="38" cy="12" r="3" fill="#c4a484"/>
        {/* Face */}
        <ellipse cx="25" cy="23" rx="6" ry="5" fill="#f5deb3"/>
        <ellipse cx="19" cy="18" rx="2.5" ry="3" fill="#1e1e1e"/>
        <ellipse cx="31" cy="18" rx="2.5" ry="3" fill="#1e1e1e"/>
        <circle cx="18.5" cy="17" r="1" fill="#fff"/>
        <circle cx="30.5" cy="17" r="1" fill="#fff"/>
        {/* Blush */}
        <ellipse cx="14" cy="22" rx="3" ry="1.5" fill="#fecdd3" opacity="0.7"/>
        <ellipse cx="36" cy="22" rx="3" ry="1.5" fill="#fecdd3" opacity="0.7"/>
        {/* Nose */}
        <ellipse cx="25" cy="23" rx="3" ry="2" fill="#8b7355"/>
        <ellipse cx="25" cy="22.5" rx="1" ry="0.5" fill="#a8a29e"/>
        <path d="M25 25 L25 26 M22 27 Q25 29 28 27" stroke="#8b7355" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Arms */}
        <ellipse cx="14" cy="32" rx="4" ry="5" fill="#d4a574"/>
        <ellipse cx="36" cy="32" rx="4" ry="5" fill="#d4a574"/>
        {/* Bucket */}
        <path d="M8 36 L10 46 L24 46 L26 36 Z" fill="#60a5fa"/>
        <ellipse cx="17" cy="36" rx="9" ry="3" fill="#93c5fd"/>
        <path d="M10 33 Q17 30 24 33" stroke="#60a5fa" strokeWidth="2" fill="none"/>
        {/* Bubbles */}
        <circle cx="14" cy="38" r="2" fill="#fff" opacity="0.8"/>
        <circle cx="20" cy="40" r="1.5" fill="#fff" opacity="0.8"/>
        <circle cx="12" cy="42" r="1" fill="#fff" opacity="0.6"/>
      </svg>
    );
  }
  
  if (avatarId === 'puppy-broom') {
    return (
      <svg width={s} height={s} viewBox="0 0 50 50">
        {/* Body */}
        <ellipse cx="25" cy="35" rx="10" ry="9" fill="#f5deb3"/>
        <ellipse cx="25" cy="36" rx="7" ry="5" fill="#fef3c7"/>
        {/* Tail */}
        <path d="M35 38 Q42 35 40 30" stroke="#d4a574" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <ellipse cx="25" cy="20" rx="11" ry="10" fill="#f5deb3"/>
        {/* Ears */}
        <ellipse cx="12" cy="18" rx="5" ry="8" fill="#d4a574" transform="rotate(-20 12 18)"/>
        <ellipse cx="38" cy="18" rx="5" ry="8" fill="#d4a574" transform="rotate(20 38 18)"/>
        {/* Face */}
        <ellipse cx="20" cy="19" rx="2.5" ry="3" fill="#1e1e1e"/>
        <ellipse cx="30" cy="19" rx="2.5" ry="3" fill="#1e1e1e"/>
        <circle cx="19" cy="18" r="1" fill="#fff"/>
        <circle cx="29" cy="18" r="1" fill="#fff"/>
        {/* Blush */}
        <ellipse cx="15" cy="24" rx="3" ry="1.5" fill="#fecdd3" opacity="0.7"/>
        <ellipse cx="35" cy="24" rx="3" ry="1.5" fill="#fecdd3" opacity="0.7"/>
        {/* Nose */}
        <ellipse cx="25" cy="24" rx="3" ry="2.5" fill="#1e1e1e"/>
        <ellipse cx="24" cy="23.5" rx="1" ry="0.5" fill="#666"/>
        <path d="M22 28 Q25 30 28 28" stroke="#8b7355" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Tongue */}
        <ellipse cx="25" cy="29" rx="2" ry="2.5" fill="#fca5a5"/>
        {/* Arms */}
        <ellipse cx="16" cy="34" rx="3" ry="4" fill="#f5deb3"/>
        <ellipse cx="34" cy="34" rx="3" ry="4" fill="#f5deb3"/>
        {/* Broom */}
        <rect x="6" y="28" width="2" height="18" rx="0.5" fill="#d4a574"/>
        <path d="M4 44 L5 48 M6 44 L6.5 49 M8 44 L8 48 M9 44 L10 47" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
        <rect x="4" y="43" width="8" height="3" rx="1" fill="#f59e0b"/>
        {/* Feet */}
        <ellipse cx="20" cy="44" rx="4" ry="2" fill="#d4a574"/>
        <ellipse cx="30" cy="44" rx="4" ry="2" fill="#d4a574"/>
      </svg>
    );
  }
  
  if (avatarId === 'panda-spray') {
    return (
      <svg width={s} height={s} viewBox="0 0 50 50">
        {/* Body */}
        <ellipse cx="25" cy="35" rx="11" ry="10" fill="#fff"/>
        <ellipse cx="25" cy="36" rx="8" ry="6" fill="#f5f5f5"/>
        {/* Head */}
        <ellipse cx="25" cy="20" rx="12" ry="11" fill="#fff"/>
        {/* Ears */}
        <circle cx="12" cy="10" r="5" fill="#1e1e1e"/>
        <circle cx="38" cy="10" r="5" fill="#1e1e1e"/>
        {/* Eye patches */}
        <ellipse cx="18" cy="18" rx="5" ry="6" fill="#1e1e1e" transform="rotate(-10 18 18)"/>
        <ellipse cx="32" cy="18" rx="5" ry="6" fill="#1e1e1e" transform="rotate(10 32 18)"/>
        {/* Eyes */}
        <ellipse cx="18" cy="18" rx="2.5" ry="3" fill="#fff"/>
        <ellipse cx="32" cy="18" rx="2.5" ry="3" fill="#fff"/>
        <ellipse cx="18" cy="19" rx="1.5" ry="2" fill="#1e1e1e"/>
        <ellipse cx="32" cy="19" rx="1.5" ry="2" fill="#1e1e1e"/>
        <circle cx="17.5" cy="18" r="0.8" fill="#fff"/>
        <circle cx="31.5" cy="18" r="0.8" fill="#fff"/>
        {/* Blush */}
        <ellipse cx="13" cy="24" rx="2.5" ry="1.5" fill="#fecdd3" opacity="0.8"/>
        <ellipse cx="37" cy="24" rx="2.5" ry="1.5" fill="#fecdd3" opacity="0.8"/>
        {/* Nose */}
        <ellipse cx="25" cy="24" rx="2.5" ry="2" fill="#1e1e1e"/>
        <path d="M25 26 L25 27 M22 28 Q25 30 28 28" stroke="#666" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Arms */}
        <ellipse cx="14" cy="34" rx="4" ry="5" fill="#1e1e1e"/>
        <ellipse cx="36" cy="34" rx="4" ry="5" fill="#1e1e1e"/>
        {/* Spray bottle */}
        <rect x="38" y="28" width="6" height="12" rx="1" fill="#60a5fa"/>
        <rect x="40" y="24" width="3" height="5" rx="0.5" fill="#3b82f6"/>
        <rect x="43" y="26" width="4" height="2" rx="0.5" fill="#93c5fd"/>
        {/* Sparkles */}
        <circle cx="46" cy="32" r="1" fill="#bae6fd"/>
        <circle cx="44" cy="36" r="0.8" fill="#bae6fd"/>
        {/* Feet */}
        <ellipse cx="20" cy="44" rx="4" ry="2" fill="#1e1e1e"/>
        <ellipse cx="30" cy="44" rx="4" ry="2" fill="#1e1e1e"/>
      </svg>
    );
  }
  
  if (avatarId === 'hamster-duster') {
    return (
      <svg width={s} height={s} viewBox="0 0 50 50">
        {/* Body */}
        <ellipse cx="25" cy="35" rx="11" ry="10" fill="#f5deb3"/>
        <ellipse cx="25" cy="37" rx="8" ry="6" fill="#fef3c7"/>
        {/* Head */}
        <ellipse cx="25" cy="20" rx="13" ry="12" fill="#f5deb3"/>
        {/* Cheeks */}
        <ellipse cx="12" cy="22" rx="5" ry="4" fill="#fecdd3"/>
        <ellipse cx="38" cy="22" rx="5" ry="4" fill="#fecdd3"/>
        {/* Ears */}
        <circle cx="13" cy="10" r="4" fill="#e8b4b4"/>
        <circle cx="37" cy="10" r="4" fill="#e8b4b4"/>
        <circle cx="13" cy="10" r="2" fill="#f5deb3"/>
        <circle cx="37" cy="10" r="2" fill="#f5deb3"/>
        {/* Face */}
        <ellipse cx="20" cy="18" rx="2" ry="2.5" fill="#1e1e1e"/>
        <ellipse cx="30" cy="18" rx="2" ry="2.5" fill="#1e1e1e"/>
        <circle cx="19.5" cy="17" r="0.8" fill="#fff"/>
        <circle cx="29.5" cy="17" r="0.8" fill="#fff"/>
        {/* Nose */}
        <ellipse cx="25" cy="23" rx="2" ry="1.5" fill="#fca5a5"/>
        <path d="M25 24.5 L25 25.5 M23 26 Q25 27.5 27 26" stroke="#d4a574" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        {/* Whiskers */}
        <path d="M10 20 L17 21 M9 23 L17 23 M10 26 L17 25" stroke="#d4a574" strokeWidth="0.5"/>
        <path d="M40 20 L33 21 M41 23 L33 23 M40 26 L33 25" stroke="#d4a574" strokeWidth="0.5"/>
        {/* Arms */}
        <ellipse cx="14" cy="33" rx="3" ry="4" fill="#f5deb3"/>
        <ellipse cx="36" cy="33" rx="3" ry="4" fill="#f5deb3"/>
        {/* Duster */}
        <rect x="38" y="22" width="2" height="14" rx="0.5" fill="#d4a574"/>
        <ellipse cx="44" cy="20" rx="6" ry="4" fill="#f9a8d4"/>
        <ellipse cx="44" cy="20" rx="5" ry="3" fill="#fbcfe8"/>
        <ellipse cx="44" cy="18" rx="4" ry="2" fill="#fce7f3"/>
        {/* Feet */}
        <ellipse cx="20" cy="44" rx="4" ry="2" fill="#e8b4b4"/>
        <ellipse cx="30" cy="44" rx="4" ry="2" fill="#e8b4b4"/>
      </svg>
    );
  }
  
  // Fallback
  return (
    <svg width={s} height={s} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#f5deb3"/>
      <ellipse cx="20" cy="22" rx="2" ry="2.5" fill="#1e1e1e"/>
      <ellipse cx="30" cy="22" rx="2" ry="2.5" fill="#1e1e1e"/>
      <path d="M20 30 Q25 34 30 30" stroke="#d4a574" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export default function AvatarSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {cuteAvatars.map(avatar => (
        <button
          key={avatar.id}
          type="button"
          onClick={() => onSelect(avatar.id)}
          className={`p-2 rounded-xl bg-gradient-to-br ${avatar.bg} flex flex-col items-center transition-all hover:scale-105 ${
            selected === avatar.id ? 'ring-2 ring-pink-500 ring-offset-2 scale-105' : ''
          }`}
          title={avatar.name}
        >
          <KawaiiAnimal avatarId={avatar.id} size={56} />
        </button>
      ))}
    </div>
  );
}

export function AvatarDisplay({ avatarId, name, size = 'md', onClick, showName = false }) {
  const avatar = cuteAvatars.find(a => a.id === avatarId);
  
  const sizeMap = {
    sm: 36,
    md: 44,
    lg: 60,
    xl: 84
  };
  
  const containerSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-[60px] h-[60px]',
    xl: 'w-[84px] h-[84px]'
  };

  const content = avatar ? (
    <button
      type="button"
      onClick={onClick}
      className={`${containerSizes[size]} rounded-full bg-gradient-to-br ${avatar.bg} flex items-center justify-center shadow-md ring-2 ring-white/50 transition-transform hover:scale-105 overflow-hidden`}
    >
      <KawaiiAnimal avatarId={avatar.id} size={sizeMap[size]} />
    </button>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={`${containerSizes[size]} rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center shadow-md ring-2 ring-white/50 transition-transform hover:scale-105`}
    >
      <span className="font-semibold text-white drop-shadow-sm" style={{ fontSize: sizeMap[size] * 0.4 }}>
        {name?.charAt(0).toUpperCase() || '?'}
      </span>
    </button>
  );

  if (showName) {
    return (
      <div className="flex flex-col items-center gap-0.5">
        {content}
        <span className="text-[10px] text-slate-500 font-medium truncate max-w-[50px]">{name}</span>
      </div>
    );
  }

  return content;
}