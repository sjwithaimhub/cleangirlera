import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { startOfWeek, differenceInWeeks } from 'date-fns';
import { toast } from 'sonner';

// Calculate assigned housemate for a chore this week
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
    
    // Calculate this week's assignments dynamically
    const thisWeekTasks = chores
      .filter(c => !c.end_date || new Date(c.end_date) >= thisWeekStart)
      .map(chore => ({
        chore,
        housemateId: getAssignedHousemate(chore, thisWeekStart)
      }))
      .filter(t => t.housemateId);

    // Get list of app users to check who is signed up
    let appUsers = [];
    try {
      appUsers = await base44.entities.User.list();
    } catch (err) {}
    const appUserEmails = new Set(appUsers.map(u => u.email?.toLowerCase()));

    // Group by housemate
    const byHousemate = {};
    thisWeekTasks.forEach(({ chore, housemateId }) => {
      const hm = housemates.find(h => h.id === housemateId);
      if (hm && hm.notifications_enabled !== false && appUserEmails.has(hm.email?.toLowerCase())) {
        if (!byHousemate[hm.id]) byHousemate[hm.id] = { housemate: hm, tasks: [] };
        byHousemate[hm.id].tasks.push(chore.name);
      }
    });

    if (Object.keys(byHousemate).length === 0) {
      toast.info('No signed-up housemates to remind', { position: 'top-center' });
      setSending(false);
      return;
    }

    // Send emails
    let sentCount = 0;
    for (const { housemate, tasks } of Object.values(byHousemate)) {
      await base44.integrations.Core.SendEmail({
        to: housemate.email,
        subject: '🧹 Chore Reminder - Tasks Due!',
        body: `Hi ${housemate.name}!\n\nThis is a friendly reminder that you have the following chores this week:\n\n${tasks.map(t => `• ${t}`).join('\n')}\n\nPlease complete them by end of day Sunday!\n\n✨ Clean Girl Era ✨`
      });
      sentCount++;
    }

    setSending(false);
    toast.success(`✨ Reminders sent to ${sentCount} housemate(s)!`, { position: 'top-center', duration: 4000 });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 border-pink-200 text-pink-600 hover:bg-pink-50"
      onClick={sendReminders}
      disabled={sending}
    >
      {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
      Send Reminders
    </Button>
  );
}