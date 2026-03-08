import React, { useState, useEffect } from 'react';

const FAIRY_NAME = "Sparkle";
const FAIRY_AVATAR = "🧚‍♀️";

const reminders = [
  {
    emoji: "🗑️",
    text: "Have the bins been taken out? We don't want any uninvited buzzy guests!",
  },
  {
    emoji: "✨",
    text: "A quick wipe-down after using the kitchen keeps it sparkly for the next person!",
  },
  {
    emoji: "👟",
    text: "Brought the outdoors in on your shoes? No worries — just give the floor a quick sweep!",
  },
  {
    emoji: "🧽",
    text: "Finished cooking? A clean stove is a happy stove (and a happy housemate)!",
  },
  {
    emoji: "🚿",
    text: "Hair in the drain? A quick clear-out keeps things flowing smoothly!",
  },
  {
    emoji: "🧹",
    text: "Crumbs happen! A quick sweep keeps our space looking fab.",
  },
  {
    emoji: "💕",
    text: "Small efforts = big vibes! Thanks for keeping our home lovely.",
  },
  {
    emoji: "🌸",
    text: "Clean as you go, and the chores practically do themselves!",
  }
];

export default function FriendlyReminder() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Pick a random reminder on mount
    setCurrentIndex(Math.floor(Math.random() * reminders.length));
  }, []);

  useEffect(() => {
    // Rotate every 30 seconds
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % reminders.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const reminder = reminders[currentIndex];

  return (
    <div className="mb-4 relative">
      {/* Flying fairy overlaid on top */}
      <div 
        className="absolute -top-4 -left-2 z-10 text-4xl drop-shadow-lg animate-bounce" 
        style={{ animationDuration: '2.5s', filter: 'hue-rotate(-10deg) saturate(1.3)' }}
      >
        <span className="inline-block" style={{ transform: 'rotate(-15deg)' }}>{FAIRY_AVATAR}</span>
      </div>
      
      <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-r from-pink-100 via-rose-50 to-purple-100 border border-pink-200/50 shadow-sm">
        <div className="flex items-center gap-3 ml-8">
          <span className="text-xl flex-shrink-0">{reminder.emoji}</span>
          <p className="text-sm md:text-base text-pink-700 font-medium leading-snug flex-1">
            {reminder.text}
          </p>
          <span className="text-xs text-purple-400 italic hidden sm:block">~ {FAIRY_NAME}</span>
        </div>
      </div>
    </div>
  );
}