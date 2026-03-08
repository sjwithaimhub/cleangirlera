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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from 'date-fns';
import { AvatarDisplay } from '../dashboard/AvatarSelector';
import { GripVertical, ChevronUp, ChevronDown } from 'lucide-react';

export default function ChoreModal({ open, onClose, onSave, chore, housemates, onApplyEndDateToAll }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'weekly',
    start_date: format(new Date(), 'yyyy-MM-dd'),
    end_date: '',
    is_bin_day: false,
    bin_day: 'monday',
    rotation_order: []
  });

  useEffect(() => {
    if (chore) {
      setFormData({
        name: chore.name || '',
        description: chore.description || '',
        frequency: chore.frequency || 'weekly',
        start_date: chore.start_date || format(new Date(), 'yyyy-MM-dd'),
        end_date: chore.end_date || '',
        is_bin_day: chore.is_bin_day || false,
        bin_day: chore.bin_day || 'monday',
        rotation_order: chore.rotation_order || housemates.map(h => h.id)
      });
    } else {
      setFormData({
        name: '',
        description: '',
        frequency: 'weekly',
        start_date: format(new Date(), 'yyyy-MM-dd'),
        end_date: '',
        is_bin_day: false,
        bin_day: 'monday',
        rotation_order: housemates.map(h => h.id)
      });
    }
  }, [chore, housemates, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{chore ? 'Edit Chore' : 'Add Chore'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Chore Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Clean Kitchen"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Details about the chore..."
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="end_date">End Date (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="flex-1"
              />
              {formData.end_date && onApplyEndDateToAll && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs whitespace-nowrap border-pink-200 text-pink-600 hover:bg-pink-50"
                  onClick={() => onApplyEndDateToAll(formData.end_date)}
                >
                  Apply to All
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-green-50">
            <div>
              <Label htmlFor="is_bin_day" className="text-sm font-medium">Bin Collection Day</Label>
              <p className="text-xs text-slate-500">Set reminders for bin collection</p>
            </div>
            <Switch
              id="is_bin_day"
              checked={formData.is_bin_day}
              onCheckedChange={(checked) => setFormData({ ...formData, is_bin_day: checked })}
            />
          </div>
          
          {formData.is_bin_day && (
            <div className="space-y-2">
              <Label>Collection Day</Label>
              <Select
                value={formData.bin_day}
                onValueChange={(value) => setFormData({ ...formData, bin_day: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                    <SelectItem key={day} value={day}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Rotation Order</Label>
            <p className="text-xs text-slate-500 mb-2">Select who's in rotation and set the order (use arrows to reorder)</p>
            <div className="space-y-2">
              {/* Selected housemates in rotation order */}
              {formData.rotation_order.map((hmId, index) => {
                const hm = housemates.find(h => h.id === hmId);
                if (!hm) return null;
                return (
                  <div 
                    key={hm.id} 
                    className="flex items-center gap-2 p-3 rounded-xl bg-pink-50 ring-1 ring-pink-200"
                  >
                    <div className="flex flex-col">
                      <button
                        type="button"
                        className="p-0.5 hover:bg-pink-100 rounded disabled:opacity-30"
                        disabled={index === 0}
                        onClick={() => {
                          const newOrder = [...formData.rotation_order];
                          [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
                          setFormData({ ...formData, rotation_order: newOrder });
                        }}
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        className="p-0.5 hover:bg-pink-100 rounded disabled:opacity-30"
                        disabled={index === formData.rotation_order.length - 1}
                        onClick={() => {
                          const newOrder = [...formData.rotation_order];
                          [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
                          setFormData({ ...formData, rotation_order: newOrder });
                        }}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="w-5 h-5 rounded-full bg-pink-200 text-pink-700 text-xs flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    {hm.photo_url ? (
                      <img src={hm.photo_url} alt={hm.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <AvatarDisplay avatarId={hm.avatar_id} name={hm.name} size="sm" />
                    )}
                    <span className="text-sm font-medium flex-1">{hm.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs text-pink-600 hover:text-pink-800"
                      onClick={() => setFormData({
                        ...formData,
                        rotation_order: formData.rotation_order.filter(id => id !== hm.id)
                      })}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
              
              {/* Unselected housemates */}
              {housemates.filter(hm => !formData.rotation_order.includes(hm.id)).map((hm) => (
                <div 
                  key={hm.id} 
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all"
                  onClick={() => setFormData({
                    ...formData,
                    rotation_order: [...formData.rotation_order, hm.id]
                  })}
                >
                  <Checkbox checked={false} />
                  {hm.photo_url ? (
                    <img src={hm.photo_url} alt={hm.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <AvatarDisplay avatarId={hm.avatar_id} name={hm.name} size="sm" />
                  )}
                  <span className="text-sm font-medium text-slate-500">{hm.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
              {chore ? 'Update' : 'Add Chore'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}