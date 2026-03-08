import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertTriangle, Repeat, Trash2 } from 'lucide-react';
import { format, isAfter, isBefore, addDays } from 'date-fns';

const statusConfig = {
  pending: { icon: Clock, color: 'bg-slate-100 text-slate-600', label: 'Pending' },
  completed: { icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-600', label: 'Done' },
  reassigned: { icon: Repeat, color: 'bg-blue-100 text-blue-600', label: 'Reassigned' },
  overdue: { icon: AlertTriangle, color: 'bg-red-100 text-red-600', label: 'Overdue' }
};

const frequencyLabels = {
  daily: 'Daily',
  weekly: 'Weekly',
  biweekly: 'Bi-weekly',
  monthly: 'Monthly'
};

export default function ChoreCard({ 
  assignment, 
  chore, 
  housemate, 
  onComplete, 
  onReassign,
  showAssignee = true 
}) {
  const status = assignment?.status || 'pending';
  const StatusIcon = statusConfig[status].icon;
  
  const isNearDue = assignment?.due_date && 
    isBefore(new Date(), new Date(assignment.due_date)) &&
    isAfter(addDays(new Date(), 2), new Date(assignment.due_date));

  return (
    <Card className={`p-4 border-0 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 ${
      isNearDue && status === 'pending' ? 'ring-2 ring-amber-300' : ''
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-slate-800">{chore?.name}</h4>
            {chore?.is_bin_day && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                🗑️ Bin Day
              </Badge>
            )}
          </div>
          
          {chore?.description && (
            <p className="text-sm text-slate-500 mb-2 line-clamp-2">{chore.description}</p>
          )}
          
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs bg-slate-100">
              {frequencyLabels[chore?.frequency]}
            </Badge>
            
            {assignment?.due_date && (
              <Badge variant="outline" className={`text-xs ${
                isNearDue ? 'bg-amber-50 text-amber-700 border-amber-200' : ''
              }`}>
                Due: {format(new Date(assignment.due_date), 'MMM d')}
              </Badge>
            )}
            
            {showAssignee && housemate && (
              <Badge className="text-xs bg-slate-800 text-white">
                {housemate.name}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <Badge className={`${statusConfig[status].color} gap-1`}>
            <StatusIcon className="w-3 h-3" />
            {statusConfig[status].label}
          </Badge>
          
          {status === 'pending' && onComplete && (
            <Button 
              size="sm" 
              variant="ghost"
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              onClick={(e) => {
                e.stopPropagation();
                onComplete(assignment.id);
              }}
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Complete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}