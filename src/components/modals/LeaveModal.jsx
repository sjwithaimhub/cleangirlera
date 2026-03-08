import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addDays } from 'date-fns';
import { AvatarDisplay } from '../dashboard/AvatarSelector';

export default function LeaveModal({ open, onClose, onSave, leave, housemates }) {
  const [formData, setFormData] = useState({
    housemate_id: '',
    start_date: format(new Date(), 'yyyy-MM-dd'),
    end_date: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    reason: ''
  });

  useEffect(() => {
    if (leave) {
      setFormData({
        housemate_id: leave.housemate_id || '',
        start_date: leave.start_date || format(new Date(), 'yyyy-MM-dd'),
        end_date: leave.end_date || format(addDays(new Date(), 7), 'yyyy-MM-dd'),
        reason: leave.reason || ''
      });
    } else {
      setFormData({
        housemate_id: housemates[0]?.id || '',
        start_date: format(new Date(), 'yyyy-MM-dd'),
        end_date: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
        reason: ''
      });
    }
  }, [leave, housemates, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{leave ? 'Edit Leave' : 'Add Leave Period'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Housemate</Label>
            <Select
              value={formData.housemate_id}
              onValueChange={(value) => setFormData({ ...formData, housemate_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select housemate" />
              </SelectTrigger>
              <SelectContent>
                {housemates.map(hm => (
                  <SelectItem key={hm.id} value={hm.id}>
                    <div className="flex items-center gap-2">
                      {hm.photo_url ? (
                        <img src={hm.photo_url} alt={hm.name} className="w-6 h-6 rounded-full object-cover" />
                      ) : (
                        <AvatarDisplay avatarId={hm.avatar_id} name={hm.name} size="sm" />
                      )}
                      <span>{hm.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reason (Optional)</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="e.g., Vacation, Work trip..."
              rows={2}
            />
          </div>
          
          <div className="p-3 rounded-xl bg-amber-50 text-sm text-amber-800">
            <strong>Note:</strong> Chores assigned during this period will be flagged for reassignment.
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
              {leave ? 'Update' : 'Add Leave'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}