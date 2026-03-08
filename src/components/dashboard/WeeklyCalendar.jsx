import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';
import { cn } from "@/lib/utils";

export default function WeeklyCalendar({ assignments, chores, housemates }) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getAssignmentsForDay = (date) => {
    return assignments.filter(a => 
      a.due_date && isSameDay(new Date(a.due_date), date)
    );
  };

  const colorMap = {
    coral: 'bg-rose-100 border-rose-300',
    teal: 'bg-teal-100 border-teal-300',
    amber: 'bg-amber-100 border-amber-300',
    violet: 'bg-violet-100 border-violet-300'
  };

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">This Week</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const dayAssignments = getAssignmentsForDay(day);
            return (
              <div key={day.toISOString()} className={cn(
                "p-2 rounded-xl min-h-[100px] transition-all",
                isToday(day) ? "bg-slate-100 ring-2 ring-slate-300" : "bg-slate-50/50"
              )}>
                <div className="text-center mb-2">
                  <p className="text-xs text-slate-500">{format(day, 'EEE')}</p>
                  <p className={cn(
                    "text-lg font-semibold",
                    isToday(day) ? "text-slate-800" : "text-slate-600"
                  )}>{format(day, 'd')}</p>
                </div>
                <div className="space-y-1">
                  {dayAssignments.slice(0, 3).map((a) => {
                    const chore = chores.find(c => c.id === a.chore_id);
                    const hm = housemates.find(h => h.id === a.housemate_id);
                    return (
                      <div 
                        key={a.id}
                        className={cn(
                          "text-xs p-1.5 rounded-lg border truncate",
                          hm ? colorMap[hm.color] : "bg-slate-100 border-slate-200",
                          a.status === 'completed' && "opacity-50 line-through"
                        )}
                        title={`${chore?.name} - ${hm?.name}`}
                      >
                        {chore?.name?.substring(0, 10)}
                      </div>
                    );
                  })}
                  {dayAssignments.length > 3 && (
                    <p className="text-xs text-slate-400 text-center">
                      +{dayAssignments.length - 3} more
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}