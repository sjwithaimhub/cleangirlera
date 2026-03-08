import React, { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from 'lucide-react';
import { format, startOfWeek, endOfWeek, differenceInWeeks } from 'date-fns';
import { AvatarDisplay } from './AvatarSelector';

const choreEmojis = {
  'Deep clean kitchen': '🍳',
  'Vacuum & mop': '🧹',
  'Weeding': '🌱',
  'Wipe common area': '✨',
  'Shared bathroom': '🛁',
  'Street bins': '🗑️'
};

const getChoreEmoji = (choreName) => {
  for (const [key, emoji] of Object.entries(choreEmojis)) {
    if (choreName?.toLowerCase().includes(key.toLowerCase())) return emoji;
  }
  return '🧼';
};

// Calculate which housemate should be assigned based on rotation and week number
const getAssignedHousemate = (chore, weekStart) => {
  if (!chore.rotation_order || chore.rotation_order.length === 0) return null;
  
  const choreStartDate = chore.start_date ? new Date(chore.start_date) : new Date('2025-12-01');
  const choreStartWeek = startOfWeek(choreStartDate, { weekStartsOn: 1 });
  const targetWeek = startOfWeek(weekStart, { weekStartsOn: 1 });
  
  const weeksDiff = differenceInWeeks(targetWeek, choreStartWeek);
  const rotationIndex = ((weeksDiff % chore.rotation_order.length) + chore.rotation_order.length) % chore.rotation_order.length;
  
  return chore.rotation_order[rotationIndex];
};

export default function WeekSection({ 
  title, 
  weekStart, 
  chores, 
  housemates,
  leaves = [],
  completions = [],
  onToggleComplete
}) {
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

  // Memoize week assignments calculation - pure dynamic, no DB reads
  const weekAssignments = useMemo(() => {
    return chores
      .filter(chore => {
        // Check if chore is within its date range
        if (chore.end_date && new Date(chore.end_date) < weekStart) return false;
        if (chore.start_date && new Date(chore.start_date) > weekEnd) return false;
        return true;
      })
      .map(chore => {
        const housemateId = getAssignedHousemate(chore, weekStart);
        if (!housemateId) return null;
        
        return {
          id: `${chore.id}-${format(weekStart, 'yyyy-MM-dd')}`,
          chore_id: chore.id,
          housemate_id: housemateId,
          due_date: format(weekStart, 'yyyy-MM-dd')
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const choreA = chores.find(c => c.id === a.chore_id);
        const choreB = chores.find(c => c.id === b.chore_id);
        return (choreA?.name || '').localeCompare(choreB?.name || '');
      });
  }, [chores, weekStart, weekEnd]);

  if (weekAssignments.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold text-pink-800">{title}</h3>
        <Badge className="bg-pink-100 text-pink-700 border-0">
          {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d')}
        </Badge>
      </div>
      
      <div className="grid gap-2">
        {weekAssignments.map(assignment => {
          const chore = chores.find(c => c.id === assignment.chore_id);
          const housemate = housemates.find(h => h.id === assignment.housemate_id);
          const isBinDay = chore?.is_bin_day;
          const isOnLeave = leaves.some(l => 
            l.housemate_id === assignment.housemate_id &&
            new Date(assignment.due_date) >= new Date(l.start_date) &&
            new Date(assignment.due_date) <= new Date(l.end_date)
          );
          const isCompleted = completions.some(c => 
            c.chore_id === assignment.chore_id && 
            c.week_start === assignment.due_date
          );
          
          return (
            <Card 
              key={assignment.id}
              className={`p-3 border-0 transition-all duration-300 ${
                isCompleted
                  ? 'bg-slate-50/80 opacity-60'
                  : isBinDay 
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 ring-1 ring-amber-200 hover:shadow-lg hover:shadow-amber-100/50' 
                    : 'bg-white/90 backdrop-blur-sm hover:shadow-xl hover:shadow-pink-100/50 hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{getChoreEmoji(chore?.name)}</span>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{chore?.name}</span>
                    {isBinDay && (
                      <Badge className="bg-amber-100 text-amber-700 text-xs border-0">Wed Night!</Badge>
                    )}
                    {isOnLeave && (
                      <Badge className="bg-purple-100 text-purple-700 text-xs border-0">🌴 Away</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    Due: {format(new Date(assignment.due_date), 'EEEE, MMM d')}
                  </p>
                </div>
                
                {housemate && (
                  <div className="flex items-center gap-2">
                    {housemate.photo_url ? (
                      <img src={housemate.photo_url} alt={housemate.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <AvatarDisplay avatarId={housemate.avatar_id} name={housemate.name} size="sm" />
                    )}
                    <span className="text-sm font-medium text-slate-600 hidden sm:block">
                      {housemate.name}
                    </span>
                  </div>
                )}
                
                {onToggleComplete && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-8 w-8 p-0 ${isCompleted ? 'text-slate-400' : 'text-slate-400 hover:text-green-500'}`}
                    onClick={() => onToggleComplete(chore.id, weekStart)}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}