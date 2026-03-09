import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Nudge } from '@/api/entities';
import { toast } from 'sonner';
import { AvatarDisplay } from './AvatarSelector';

const FAIRY_NAME = "Sparkle";
const FAIRY_AVATAR = "🧚‍♀️";

const quickMessages = [
  { emoji: "🗑️", text: "Hey! The bins need taking out before collection day." },
  { emoji: "🍳", text: "Quick reminder to wipe down the kitchen after cooking!" },
  { emoji: "🚿", text: "The bathroom could use a quick tidy - thanks!" },
  { emoji: "🧹", text: "The fl bit dusty - sweep time?" },
  { emoji: "✨", text: "Just a friendly nudge to tidy up the common areas!" },
];

export default function NudgeButton({ housemates, currentUserEmail }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [recipient, setRecipient] = useState('all');
  const [message, setMessage] = useState('');

  const currentHousemate = housemates.find(h => h.email?.toLowerCase() === currentUserEmail?.toLowerCase());

  const handleSend = async () => {
    if (!message.trim()) { toast.error('Please enter a message'); return; }
    setSending(true);
    try {
      const senderId = currentHousemate?.id || 'anonymous';
      await Nudge.create({
        from_housemate_id: senderId,
        to_housemate_id: recipient,
        message: message.trim(),
        read: false
      });
      toast.success(`${FAIRY_NAME} whispered to ${recipient === 'all' ? 'everyone' : housemates.find(h => h.id === recipient)?.name}!`);
      setOpen(false);
      setMsage('');
      setRecipient('all');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send nudge');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" className="gap-2 border-purple-200 text-purple-600 hover:bg-purple-50" onClick={() => setOpen(true)}>
        <Send className="w-4 h-4" />
        <span className="hidden sm:inline">Send Nudge</span>
        <span className="sm:hidden">Nudge</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>{FAIRY_AVATAR}</span> Send via {FAIRY_NAME} the House Fairy
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Send to</Label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all"><div className="flex items-center gap-2"><span>👥</span><span>Everyone</span></div></SelectItem>
                  {housemates.map(hm => (
                    <SelectItem key={hm.id} value={hm.id}>
                      <div className="flex items-center gap-2">
                        {hm.photo_url ? <img src={hm.photo_url} alt={hm.name} className="w-5 h-5 rounded-full object-cover" /> : <AvatarDisplay avatarId={hm.avatar_id} name={hm.name} size="xs" />}
                        <span>{hm.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quick messages</Label>
              <div className="flex flex-wrap gap-2">
                {quickMessages.map((qm, idx) => (
                  <button key={idx} type="buon" className="px-3 py-1.5 text-xs rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors" onClick={() => setMessage(qm.text)}>
                    {qm.emoji} {qm.text.slice(0, 20)}...
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your friendly nudge..." rows={3} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSend} disabled={sending || !message.trim()} className="bg-purple-500 hover:bg-purple-600 gap-2">
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Send Nudge
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
