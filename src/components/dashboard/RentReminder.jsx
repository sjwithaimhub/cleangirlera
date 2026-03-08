import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';

export default function RentReminder() {
  const today = new Date();
  const dayOfMonth = today.getDate();
  
  // Show reminder from 1st to 8th of each month
  if (dayOfMonth > 8) return null;
  
  const daysUntilDue = 8 - dayOfMonth;
  
  return (
    <div className="mb-4 relative">
      <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 border border-amber-300/50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-5 h-5 text-amber-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm md:text-base text-amber-900 font-semibold mb-0.5">
              💰 Rent Reminder
            </p>
            <p className="text-xs md:text-sm text-amber-800 leading-snug">
              {daysUntilDue === 0 ? (
                <>Rent is due <strong>TODAY</strong>! Please transfer to <strong>Kiara</strong> 💸</>
              ) : daysUntilDue === 1 ? (
                <>Rent is due <strong>tomorrow (8th)</strong>! Please transfer to <strong>Kiara</strong> 💸</>
              ) : (
                <>Rent is due in <strong>{daysUntilDue} days (8th)</strong>! Please transfer to <strong>Kiara</strong> 💸</>
              )}
            </p>
          </div>
          <Calendar className="w-5 h-5 text-amber-600 flex-shrink-0 hidden sm:block" />
        </div>
      </div>
    </div>
  );
}