import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Palmtree } from 'lucide-react';

const colorMap = {
  coral: 'bg-rose-100 text-rose-700 border-rose-200',
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
  amber: 'bg-amber-100 text-amber-700 border-amber-200',
  violet: 'bg-violet-100 text-violet-700 border-violet-200'
};

const avatarMap = {
  coral: 'bg-gradient-to-br from-rose-400 to-rose-600',
  teal: 'bg-gradient-to-br from-teal-400 to-teal-600',
  amber: 'bg-gradient-to-br from-amber-400 to-amber-600',
  violet: 'bg-gradient-to-br from-violet-400 to-violet-600'
};

export default function HousemateCard({ housemate, choreCount, isOnLeave, onClick }) {
  return (
    <Card 
      className="p-5 cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden group"
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
           style={{ background: `var(--${housemate.color})` }} />
      
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl ${avatarMap[housemate.color]} flex items-center justify-center shadow-lg`}>
          <span className="text-white font-bold text-xl">
            {housemate.avatar_initial || housemate.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 text-lg truncate">{housemate.name}</h3>
          <p className="text-sm text-slate-500 truncate">{housemate.email}</p>
        </div>
        
        {isOnLeave ? (
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200 gap-1">
            <Palmtree className="w-3 h-3" />
            Away
          </Badge>
        ) : (
          <Badge className={`${colorMap[housemate.color]} border gap-1`}>
            <Calendar className="w-3 h-3" />
            {choreCount} chores
          </Badge>
        )}
      </div>
    </Card>
  );
}