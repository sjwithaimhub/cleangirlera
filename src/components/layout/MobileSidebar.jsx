import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Plus, Palmtree, UserPlus, Sparkles } from 'lucide-react';

export default function MobileSidebar({ onAddLeave, onAddChore, onAddUser }) {
  const [open, setOpen] = React.useState(false);

  const handleAction = (action) => {
    action();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          size="icon" 
          variant="outline" 
          className="md:hidden border-pink-200 text-pink-600"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 bg-gradient-to-b from-pink-50 to-rose-50">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-pink-700">
            <Sparkles className="w-5 h-5" />
            Quick Actions
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-3">
          <Button 
            variant="outline"
            className="w-full justify-start gap-3 h-14 border-pink-200 text-pink-700 hover:bg-pink-100"
            onClick={() => handleAction(onAddLeave)}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Palmtree className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-left">
              <p className="font-medium">Add Leave</p>
              <p className="text-xs text-slate-500">Mark time away</p>
            </div>
          </Button>
          
          <Button 
            variant="outline"
            className="w-full justify-start gap-3 h-14 border-pink-200 text-pink-700 hover:bg-pink-100"
            onClick={() => handleAction(onAddChore)}
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Plus className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-medium">Add Chore</p>
              <p className="text-xs text-slate-500">Create new task</p>
            </div>
          </Button>
          
          <Button 
            variant="outline"
            className="w-full justify-start gap-3 h-14 border-pink-200 text-pink-700 hover:bg-pink-100"
            onClick={() => handleAction(onAddUser)}
          >
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-pink-600" />
            </div>
            <div className="text-left">
              <p className="font-medium">Add User</p>
              <p className="text-xs text-slate-500">New housemate</p>
            </div>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}