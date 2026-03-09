import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Loader2 } from 'lucide-react';
import { startOfWeek, differenceInWeeks } from 'date-fns';
import { toast } from 'sonner';

const getAssignedHousemate = (chore, weekStart) => {
  if (!chore.rotation_order?.length) return null;
  const choreStartDate = chore.start_date ? new Date(chore.start_date) : new Date('2025-12-01');
  const choreStartWeek = startOfWeek(choreStartDate, { weekStartsOn: 1 });
  const weeksDiff = differenceInWeeks(weekStart, choreStartWeek);
  const rotationIndex = ((weeksDiff % chore.rotation_order.length) + chore.rotation_order.length) % chore.rotation_order.length;
  return chore.rotation_order[rotationIndex];
};

export default function SendRemindersButton({ chores, housemates }) {
  const [sending, setSending] = useState(false);

  const sendReminders = async () => {
    setSending(true);
    const thisWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const thisWeekTasks = chores
      .filter(c => !c.end_date || new Date(c.end_date) >= thisWeekStart)
      .map(chore => ({ chore, housemateId: getAssignedHousemate(chore, thisWeekStart) }))
      .filter(t => t.housemateId);

    const byHousemate = {};
    thisWeekTasks.forEach(({ chore, housemateId }) => {
      const hm = housemates.find(h => h.id === housemateId);
      if (hm && hm.notifications_enabled !== false) {
        if (!byHousemate[hm.id]) byHousemate[hm.id] = { housemate: hm, tasks: [] };
        byHousemate[hm.id].tasks.push(chore.name);
      }
    });

    if (Object.keys(byHousemate).length === 0) {
      toast.info('No housemates to remind', { position: 'top-center' });
      setSending(false);
      return;
    }

    toast.success(`✨ Reminders noted for ${Object.keys(byHousemate).length} housemate(s)!`, { position: 'top-center', duration: 4000 });
    setSending(false);
  };

  return (
    <Button variant="outline" se="sm" className="gap-2 border-pink-200 text-pink-600 hover:bg-pink-50" onClick={sendReminders} disabled={sending}>
      {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
      Send Reminders
    </Button>
  );
}
