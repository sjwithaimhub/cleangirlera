import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Trash2, AlertTriangle } from 'lucide-react';
import { format, isToday, isTomorrow } from 'date-fns';

export default function UpcomingReminders({ assignments, chores, housemates }) {
  const binDayChores = chores.filter(c => c.is_bin_day);
  const upcomingBinDays = binDayChores.map(chore => {
    const today = new Date();
    const dayMap = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 };
    const targetDay = dayMap[chore.bin_day];
    const currentDay = today.getDay();
    let daysUntil = targetDay - currentDay;
    if (daysUntil <= 0) daysUntil += 7;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntil);
    return { chore, date: nextDate, daysUntil };
  }).filter(b => b.daysUntil <= 7).sort((a, b) => a.daysUntil - b.daysUntil);

  const overdueAssignments = assignments.filter(a => 
    a.status === 'pending' && new Date(a.due_date) < new Date()
  );

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-500" />
          Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingBinDays.map(({ chore, date, daysUntil }) => (
          <div key={chore.id} className="flex items-center gap-3 p-3 rounded-xl bg-green-50/80">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-800">{chore.name}</p>
              <p className="text-sm text-slate-500">
                {isToday(date) ? 'Today' : isTomorrow(date) ? 'Tomorrow' : format(date, 'EEEE, MMM d')}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700">
              {daysUntil === 0 ? 'Today!' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
            </Badge>
          </div>
        ))}

        {overdueAssignments.length > 0 && (
          <div className="p-3 rounded-xl bg-red-50/80">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="font-medium text-red-700">{overdueAssignments.length} Overdue Chores</span>
            </div>
            {overdueAssignments.slice(0, 3).map(a => {
              const chore = chores.find(c => c.id === a.chore_id);
              const housemate = housemates.find(h => h.id === a.housemate_id);
              return (
                <p key={a.id} className="text-sm text-red-600">
                  {chore?.name} - {housemate?.name}
                </p>
              );
            })}
          </div>
        )}

        {upcomingBinDays.length === 0 && overdueAssignments.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">No upcoming reminders</p>
        )}
      </CardContent>
    </Card>
  );
}