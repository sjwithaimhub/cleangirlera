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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { base44 } from '@/api/base44Client';
import { Upload, Loader2, Palmtree, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import AvatarSelector, { AvatarDisplay } from '../dashboard/AvatarSelector';

const colorOptions = [
  { value: 'coral', label: 'Pink', class: 'bg-pink-400' },
  { value: 'violet', label: 'Purple', class: 'bg-violet-400' },
  { value: 'teal', label: 'Teal', class: 'bg-teal-400' },
  { value: 'amber', label: 'Amber', class: 'bg-amber-400' }
];

export default function HousemateModal({ open, onClose, onSave, housemate, usedColors = [], leaves = [], onEditLeave, onDeleteLeave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    color: 'coral',
    avatar_id: '',
    photo_url: '',
    notifications_enabled: true
  });
  const [avatarType, setAvatarType] = useState('character');
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const housemateLeaves = leaves.filter(l => l.housemate_id === housemate?.id);

  useEffect(() => {
    if (housemate) {
      setFormData({
        name: housemate.name || '',
        email: housemate.email || '',
        color: housemate.color || 'coral',
        avatar_id: housemate.avatar_id || '',
        photo_url: housemate.photo_url || '',
        notifications_enabled: housemate.notifications_enabled !== false
      });
      setAvatarType(housemate.photo_url ? 'photo' : 'character');
    } else {
      const availableColor = colorOptions.find(c => !usedColors.includes(c.value))?.value || 'coral';
      setFormData({
        name: '',
        email: '',
        color: availableColor,
        avatar_id: '',
        photo_url: '',
        notifications_enabled: true
      });
      setAvatarType('character');
      setActiveTab('profile');
    }
  }, [housemate, usedColors, open]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setFormData({ ...formData, photo_url: file_url, avatar_id: '' });
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      name: formData.name,
      email: formData.email,
      color: formData.color,
      avatar_id: formData.avatar_id || null,
      photo_url: formData.photo_url || null,
      notifications_enabled: formData.notifications_enabled,
      avatar_initial: formData.name?.charAt(0).toUpperCase() || 'U'
    };
    onSave(dataToSave);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{housemate ? 'Edit Profile' : 'Add Housemate'}</DialogTitle>
        </DialogHeader>
        
        {housemate && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="leave">Leave ({housemateLeaves.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="leave" className="space-y-3">
              {housemateLeaves.length === 0 ? (
                <div className="text-center py-6 text-slate-500">
                  <Palmtree className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm">No leave periods scheduled</p>
                </div>
              ) : (
                housemateLeaves.map(leave => (
                  <div key={leave.id} className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-amber-800">
                          {format(new Date(leave.start_date), 'MMM d')} - {format(new Date(leave.end_date), 'MMM d, yyyy')}
                        </p>
                        {leave.reason && (
                          <p className="text-xs text-amber-600 mt-1">{leave.reason}</p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 w-7 p-0 text-amber-600 hover:text-amber-700"
                          onClick={() => onEditLeave?.(leave)}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 w-7 p-0 text-red-400 hover:text-red-500"
                          onClick={() => onDeleteLeave?.(leave.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="profile">
              <ProfileForm 
                formData={formData}
                setFormData={setFormData}
                avatarType={avatarType}
                setAvatarType={setAvatarType}
                uploading={uploading}
                handlePhotoUpload={handlePhotoUpload}
                colorOptions={colorOptions}
                usedColors={usedColors}
                housemate={housemate}
                onClose={onClose}
                handleSubmit={handleSubmit}
              />
            </TabsContent>
          </Tabs>
        )}

        {!housemate && (
          <ProfileForm 
            formData={formData}
            setFormData={setFormData}
            avatarType={avatarType}
            setAvatarType={setAvatarType}
            uploading={uploading}
            handlePhotoUpload={handlePhotoUpload}
            colorOptions={colorOptions}
            usedColors={usedColors}
            housemate={housemate}
            onClose={onClose}
            handleSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ProfileForm({ formData, setFormData, avatarType, setAvatarType, uploading, handlePhotoUpload, colorOptions, usedColors, housemate, onClose, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email"
          required
        />
      </div>

      <div className="space-y-3">
        <Label>Avatar</Label>
        <Tabs value={avatarType} onValueChange={setAvatarType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="character">Character</TabsTrigger>
            <TabsTrigger value="photo">Photo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="character" className="mt-3">
            <AvatarSelector 
              selected={formData.avatar_id} 
              onSelect={(id) => setFormData({ ...formData, avatar_id: id, photo_url: '' })} 
            />
          </TabsContent>
          
          <TabsContent value="photo" className="mt-3">
            <div className="flex flex-col items-center gap-3">
              {formData.photo_url ? (
                <img 
                  src={formData.photo_url} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-pink-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
              )}
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handlePhotoUpload}
                />
                <Button type="button" variant="outline" size="sm" disabled={uploading} asChild>
                  <span>
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {formData.photo_url ? 'Change Photo' : 'Upload Photo'}
                  </span>
                </Button>
              </label>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="space-y-2">
        <Label>Color Theme</Label>
        <div className="flex gap-3">
          {colorOptions.map(color => {
            const isUsed = usedColors.includes(color.value) && housemate?.color !== color.value;
            return (
              <button
                key={color.value}
                type="button"
                disabled={isUsed}
                className={`w-10 h-10 rounded-full ${color.class} transition-all ${
                  formData.color === color.value ? 'ring-2 ring-offset-2 ring-pink-500 scale-110' : ''
                } ${isUsed ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'}`}
                onClick={() => !isUsed && setFormData({ ...formData, color: color.value })}
              />
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl bg-pink-50">
        <div>
          <Label htmlFor="notifications" className="text-sm font-medium">Reminder Notifications</Label>
          <p className="text-xs text-slate-500">Get notified on Sundays for incomplete tasks</p>
        </div>
        <Switch
          id="notifications"
          checked={formData.notifications_enabled}
          onCheckedChange={(checked) => setFormData({ ...formData, notifications_enabled: checked })}
        />
      </div>

      {formData.name && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50">
          {formData.photo_url ? (
            <img src={formData.photo_url} alt="Preview" className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <AvatarDisplay avatarId={formData.avatar_id} name={formData.name} size="lg" />
          )}
          <div>
            <p className="font-medium text-slate-700">{formData.name}</p>
            <p className="text-xs text-slate-500">Preview</p>
          </div>
        </div>
      )}
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
          {housemate ? 'Update' : 'Add Housemate'}
        </Button>
      </DialogFooter>
    </form>
  );
}