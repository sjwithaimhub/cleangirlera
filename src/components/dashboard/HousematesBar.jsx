import React, { useState } from 'react';
import { AvatarDisplay } from './AvatarSelector';
import { Palmtree } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FAIRY_NAME = "Sparkle";
const FAIRY_AVATAR = "🧚‍♀️";

export default function HousematesBar({ housemates, leaves, onHousemateClick }) {
  const [showFairyModal, setShowFairyModal] = useState(false);
  const isOnLeave = (housemateId) => {
    const now = new Date();
    return leaves?.some(l => 
      l.housemate_id === housemateId &&
      new Date(l.start_date) <= now &&
      new Date(l.end_date) >= now
    );
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Sparkle the House Fairy */}
      <div className="relative flex flex-col items-center gap-0.5">
        <button
          onClick={() => setShowFairyModal(true)}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-xl ring-2 ring-white/50 transition-transform hover:scale-110 shadow-lg"
          style={{ filter: 'hue-rotate(-10deg) saturate(1.3)' }}
        >
          {FAIRY_AVATAR}
        </button>
        <span className="text-[10px] text-purple-500 font-medium">{FAIRY_NAME}</span>
      </div>

      {housemates.map(hm => (
        <div key={hm.id} className="relative flex flex-col items-center gap-0.5">
          {hm.photo_url ? (
            <button
              onClick={() => onHousemateClick?.(hm)}
              className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/50 transition-transform hover:scale-105"
            >
              <img src={hm.photo_url} alt={hm.name} className="w-full h-full object-cover" />
            </button>
          ) : (
            <AvatarDisplay 
              avatarId={hm.avatar_id} 
              name={hm.name} 
              size="sm" 
              onClick={() => onHousemateClick?.(hm)}
            />
          )}
          {isOnLeave(hm.id) && (
            <div className="absolute top-0 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
              <Palmtree className="w-2.5 h-2.5 text-white" />
            </div>
          )}
          <span className="text-[10px] text-slate-500 font-medium">{hm.name?.split(' ')[0]}</span>
        </div>
      ))}
      {/* Fairy Modal */}
      <Dialog open={showFairyModal} onOpenChange={setShowFairyModal}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-purple-700">
              <span className="text-2xl">{FAIRY_AVATAR}</span>
              Meet {FAIRY_NAME}!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-center">
              <div 
                className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-5xl shadow-lg animate-bounce"
                style={{ animationDuration: '2s', filter: 'hue-rotate(-10deg) saturate(1.3)' }}
              >
                {FAIRY_AVATAR}
              </div>
            </div>
            <p className="text-center">
              <strong className="text-purple-700">{FAIRY_NAME}</strong> is your House Fairy — here to help keep harmony and cleanliness in your home! ✨
            </p>
            <p className="text-center text-xs text-slate-500">
              Use her to send friendly nudges when something needs attention. Messages come from {FAIRY_NAME}, keeping things light and drama-free! 🧹💕
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}