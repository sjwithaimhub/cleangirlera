import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bell } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Nudge } from '@/api/entities';
import { format } from 'date-fns';

const FAIRY_NAME = "Sparkle";
const FAIRY_AVATAR = "🧚‍♀️";

export default function NudgeNotifications({ nudges, housemates, currentHousemateId, onMarkRead }) {
  const [open, setOpen] = useState(false);
  const [actionedIds, setActionedIds] = useState(new Set());

  const myNudges = nudges.filter(n => n.to_housemate_id === 'all' || n.to_housemate_id === currentHousemateId);
  const unreadCount = myNudges.filter(n => !n.read).length;

  const handleOpen = async (isOpen) => {
    setOpen(isOpen);
    if (isOpen && unreadCount > 0) {
      const unreadNudges = myNudges.filter(n => !n.read);
      await Promise.all(unreadNp(n => Nudge.update(n.id, { read: true })));
      onMarkRead?.();
    }
  };

  const handleAction = async (nudgeId, actionType) => {
    await Nudge.update(nudgeId, { actioned: actionType });
    setActionedIds(prev => new Set([...prev, nudgeId]));
    onMarkRead?.();
  };

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-pink-200 text-pink-600 hover:bg-pink-50 relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b bg-gradient-to-r from-pink-50 to-purple-50">
          <h3 className="font-semibold text-pink-800 flex items-center gap-2">
            <span>{FAIRY_AVATAR}</span> {FAIRY_NAME}'s Whispers
          </h3>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {myNudges.length === 0 ? (
            <div className="p-4 text-center text-slate-500 text-sm">No nudges yet!</div>
          ) : (
            <div className="divide-y">
              {myNudges.slice(0, 10).map(nudge => (
                <div key={nudge.id} className={`p-3 ${!nudge.read ? 'bg-purple-50/50' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-lg flex-shrink-0">
                      {FAIRY_AVATAR}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-purple-700">{FAIRY_NAME}</p>
                      <p className="text-sm text-slate-600 mt-0.5">{nudge.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{format(new Date(nudge.created_date), 'MMM d, h:mm a')}</p>
                      {!nudge.actioned && !actionedIds.has(nudge.id) ? (
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => handleAction(nudge.id, 'done')} className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 hover:bg-green-200">
                            Done it!
                          </button>
                          <button onClick={() => handleAction(nudge.id, 'dismissed')} className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200">
                            Dismiss
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs mt-2 text-green-600">Completed!</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
