import React, { useState } from 'react';
import { supabase } from '@/api/base44Client';
import { Housemate, Chore, Leave, Nudge, ChoreCompletion } from '@/api/entities';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Palmtree, ListTodo, CalendarDays, Sparkles, Users, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, addWeeks, addDays } from 'date-fns';
import { useMemo } from 'react';
import { Toaster } from "@/components/ui/sonner";

import HousematesBar from '@/components/dashboard/HousematesBar';
import WeekSection from '@/components/dashboard/WeekSection';
import ChoreModal from '@/components/modals/ChoreModal';
import LeaveModal from '@/components/modals/LeaveModal';
import HousemateModal from '@/components/modals/HousemateModal';
import MobileSidebar from '@/components/layout/MobileSidebar';
import SendRemindersButton from '@/components/dashboard/SendRemindersButton';
import Confetti from '@/components/ui/Confetti';
import { AvatarDisplay } from '@/components/dashboard/AvatarSelector';
import FloatingSparkles from '@/components/ui/FloatingSparkles';
import { HeartDivider, CuteBow } from '@/components/ui/CuteDecorations';
import FriendlyReminder from '@/components/dashboard/FriendlyReminder';
import NudgeButton from '@/components/dashboard/NudgeButton';
import NudgeNotifications from '@/components/dashboard/NudgeNotifications';
import RentReminder from '@/components/dashboard/RentReminder';

export default function Home() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [choreModal, setChoreModal] = useState({ open: false, chore: null });
  const [leaveModal, setLeaveModal] = useState({ open: false, leave: null });
  const [housemateModal, setHousemateModal] = useState({ open: false, housemate: null });
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [showConfetti, setShowConfetti] = useState(false);

  const { data: housemates = [] } = useQuery({
    queryKey: ['housemates'],
    queryFn: () => Housemate.list()
  });

  const { data: chores = [] } = useQuery({
    queryKey: ['chores'],
    queryFn: () => Chore.list()
  });

  const { data: leaves = [] } = useQuery({
    queryKey: ['leaves'],
    queryFn: () => Leave.list()
  });

  const { data: nudges = [], refetch: refetchNudges } = useQuery({
    queryKey: ['nudges'],
    queryFn: () => Nudge.list('-created_date', 50)
  });

  const { data: completions = [] } = useQuery({
    queryKey: ['completions'],
    queryFn: () => ChoreCompletion.list()
  });

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => User.me()
  });

  const currentHousemate = housemates.find(h => h.email?.toLowerCase() === currentUser?.email?.toLowerCase());

  const createChore = useMutation({
    mutationFn: (data) => Chore.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['chores']);
      setChoreModal({ open: false, chore: null });
    }
  });

  const updateChore = useMutation({
        mutationFn: ({ id, data }) => Chore.update(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries(['chores']);
          setChoreModal({ open: false, chore: null });
        }
      });

      const applyEndDateToAllChores = async (endDate) => {
        await Promise.all(chores.map(c => Chore.update(c.id, { end_date: endDate })));
        queryClient.invalidateQueries(['chores']);
      };

  const deleteChore = useMutation({
    mutationFn: (id) => Chore.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['chores'])
  });

  const createLeave = useMutation({
    mutationFn: (data) => Leave.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['leaves']);
      setLeaveModal({ open: false, leave: null });
    }
  });

  const updateLeave = useMutation({
    mutationFn: ({ id, data }) => Leave.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['leaves']);
      setLeaveModal({ open: false, leave: null });
    }
  });

  const deleteLeave = useMutation({
    mutationFn: (id) => Leave.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['leaves'])
  });

  const createHousemate = useMutation({
    mutationFn: (data) => Housemate.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['housemates']);
      setHousemateModal({ open: false, housemate: null });
    }
  });

  const updateHousemate = useMutation({
    mutationFn: ({ id, data }) => Housemate.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['housemates']);
      setHousemateModal({ open: false, housemate: null });
    }
  });

  const deleteHousemate = useMutation({
    mutationFn: (id) => Housemate.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['housemates'])
  });

  const completeChore = useMutation({
    mutationFn: (data) => ChoreCompletion.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['completions']);
      setShowConfetti(false);
      setTimeout(() => setShowConfetti(true), 50);
    }
  });

  const uncompleteChore = useMutation({
    mutationFn: (id) => ChoreCompletion.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['completions'])
  });

  const handleToggleComplete = (choreId, weekStart) => {
    const weekKey = format(weekStart, 'yyyy-MM-dd');
    const existing = completions.find(c => c.chore_id === choreId && c.week_start === weekKey);
    if (existing) {
      uncompleteChore.mutate(existing.id);
    } else {
      completeChore.mutate({ chore_id: choreId, week_start: weekKey });
    }
  };

  const thisWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const nextWeekStart = addWeeks(thisWeekStart, 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 relative overflow-hidden">
      <Toaster position="top-center" />
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
      <FloatingSparkles />
      
      {/* Decorative background blobs */}
      <div className="absolute top-20 -left-20 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -right-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-3 pt-4 pb-10 md:px-8 md:pt-8 md:pb-16 relative">
        {/* Header */}
        <div className="**mt-2 md:mt-4 mb-4**">
          <div className="flex items-start justify-between gap-3">
            <div className="relative">
                <CuteBow className="absolute -top-3 -left-3 md:-top-4 md:-left-4 opacity-80" />
                <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-wide bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm pb-2" style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}> 
                  Cleaning Roster
                </h1>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;1,400&family=Great+Vibes&display=swap');`}</style>
                <p className="text-pink-400 text-sm md:text-base flex items-center gap-1.5 mt-2">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                  <span style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}>Clean Girl Era</span>
                  <span className="text-xs">✨</span>
                </p>
              </div>
            <MobileSidebar
              onAddLeave={() => setLeaveModal({ open: true, leave: null })}
              onAddChore={() => setChoreModal({ open: true, chore: null })}
              onAddUser={() => setHousemateModal({ open: true, housemate: null })}
            />
          </div>
          
          <div className="mt-3">
            <HousematesBar 
              housemates={housemates} 
              leaves={leaves}
              onHousemateClick={(hm) => setHousemateModal({ open: true, housemate: hm })}
            />
          </div>
          </div>

          {/* Action Bar - Desktop */}
          <div className="hidden md:flex flex-wrap items-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-pink-200 text-pink-600 hover:bg-pink-50"
                onClick={() => {
                  const currentStart = dateRange.from || thisWeekStart;
                  const prevWeekStart = addWeeks(currentStart, -1);
                  const prevWeekEnd = addDays(prevWeekStart, 6);
                  setDateRange({ from: prevWeekStart, to: prevWeekEnd });
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2 border-pink-200 text-pink-600 hover:bg-pink-50">
                    <CalendarDays className="w-4 h-4" />
                    {dateRange.from && dateRange.to 
                      ? `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d')}`
                      : 'Filter by Date'
                    }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange.from ? dateRange : undefined}
                    onSelect={(range) => setDateRange(range ? { from: range.from || null, to: range.to || null } : { from: null, to: null })}
                    numberOfMonths={1}
                  />
                  {dateRange.from && (
                    <div className="p-2 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full text-pink-600"
                        onClick={() => setDateRange({ from: null, to: null })}
                      >
                        Clear Filter
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-pink-200 text-pink-600 hover:bg-pink-50"
                onClick={() => {
                  const currentStart = dateRange.from || thisWeekStart;
                  const nextWeekStart = addWeeks(currentStart, 1);
                  const nextWeekEnd = addDays(nextWeekStart, 6);
                  setDateRange({ from: nextWeekStart, to: nextWeekEnd });
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          
          <SendRemindersButton 
            chores={chores}
            housemates={housemates}
          />

          <NudgeButton housemates={housemates} currentUserEmail={currentUser?.email} />
          
          <NudgeNotifications 
            nudges={nudges} 
            housemates={housemates} 
            currentHousemateId={currentHousemate?.id}
            onMarkRead={refetchNudges}
          />
          
          <Button 
            variant="outline"
            className="gap-2 border-pink-200 text-pink-600 hover:bg-pink-50"
            onClick={() => setLeaveModal({ open: true, leave: null })}
          >
            <Palmtree className="w-4 h-4" />
            Add Leave
          </Button>
          <Button 
            variant="outline"
            className="gap-2 border-pink-200 text-pink-600 hover:bg-pink-50"
            onClick={() => setChoreModal({ open: true, chore: null })}
          >
            <Plus className="w-4 h-4" />
            Add Chore
          </Button>
          <Button 
            className="gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
            onClick={() => setHousemateModal({ open: true, housemate: null })}
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </Button>
        </div>

        {/* Mobile Filter */}
        <div className="md:hidden flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-pink-200 text-pink-600 hover:bg-pink-50"
              onClick={() => {
                const currentStart = dateRange.from || thisWeekStart;
                const prevWeekStart = addWeeks(currentStart, -1);
                const prevWeekEnd = addDays(prevWeekStart, 6);
                setDateRange({ from: prevWeekStart, to: prevWeekEnd });
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 border-pink-200 text-pink-600 whitespace-nowrap">
                  <CalendarDays className="w-3 h-3" />
                  {dateRange.from ? format(dateRange.from, 'MMM d') : 'Filter'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange.from ? dateRange : undefined}
                  onSelect={(range) => setDateRange(range ? { from: range.from || null, to: range.to || null } : { from: null, to: null })}
                  numberOfMonths={1}
                />
                {dateRange.from && (
                  <div className="p-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full text-pink-600" onClick={() => setDateRange({ from: null, to: null })}>
                      Clear
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-pink-200 text-pink-600 hover:bg-pink-50"
              onClick={() => {
                const currentStart = dateRange.from || thisWeekStart;
                const nextWeekStart = addWeeks(currentStart, 1);
                const nextWeekEnd = addDays(nextWeekStart, 6);
                setDateRange({ from: nextWeekStart, to: nextWeekEnd });
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <SendRemindersButton chores={chores} housemates={housemates} />
          <NudgeButton housemates={housemates} currentUserEmail={currentUser?.email} />
          <NudgeNotifications 
            nudges={nudges} 
            housemates={housemates} 
            currentHousemateId={currentHousemate?.id}
            onMarkRead={refetchNudges}
          />
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full grid grid-cols-3 bg-white/70 backdrop-blur-md border border-pink-100 p-1.5 mb-4 md:mb-6 h-auto rounded-2xl shadow-lg shadow-pink-100/50">
            <TabsTrigger value="overview" className="gap-1 md:gap-2 text-xs md:text-sm py-2 data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="chores" className="gap-1 md:gap-2 text-xs md:text-sm py-2 data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700">
              <ListTodo className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Manage Chores</span>
              <span className="sm:hidden">Chores</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-1 md:gap-2 text-xs md:text-sm py-2 data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700">
              <Users className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Manage Users</span>
              <span className="sm:hidden">Users</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 md:space-y-8">
                {/* Friendly Reminder - inside overview tab */}
                <FriendlyReminder />
                
                {/* Rent Reminder */}
                <RentReminder />
                  


                {dateRange.from && dateRange.to ? (
              <WeekSection
                  title="Filtered Results"
                  weekStart={dateRange.from}
                  chores={chores}
                  housemates={housemates}
                  leaves={leaves}
                  completions={completions}
                  onToggleComplete={handleToggleComplete}
                />
            ) : (
              <>
                <WeekSection
                    title="✨ This Week"
                    weekStart={thisWeekStart}
                    chores={chores}
                    housemates={housemates}
                    leaves={leaves}
                    completions={completions}
                    onToggleComplete={handleToggleComplete}
                  />

                  <WeekSection
                    title="🗓️ Next Week"
                    weekStart={nextWeekStart}
                    chores={chores}
                    housemates={housemates}
                    leaves={leaves}
                    completions={completions}
                    onToggleComplete={handleToggleComplete}
                  />
              </>
            )}
          </TabsContent>

          <TabsContent value="chores" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {chores.map(chore => (
                <div 
                  key={chore.id}
                  className="p-3 md:p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-pink-100 cursor-pointer hover:shadow-xl hover:shadow-pink-100/50 hover:scale-[1.02] hover:border-pink-200 transition-all duration-300"
                  onClick={() => setChoreModal({ open: true, chore })}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-slate-700 text-sm md:text-base">{chore.name}</h4>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-red-400 hover:text-red-500 -mt-1 -mr-2 h-7 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChore.mutate(chore.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                  {chore.description && (
                    <p className="text-xs md:text-sm text-slate-500 mb-2 line-clamp-2">{chore.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 capitalize">
                      {chore.frequency}
                    </span>
                    {chore.is_bin_day && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
                        🗑️ Wed
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">
                      {chore.rotation_order?.length || 0} users
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {leaves.length > 0 && (
              <div>
                <HeartDivider />
                <h3 className="text-base md:text-lg font-semibold text-pink-800 mb-3">🌴 Leave Periods</h3>
                <div className="space-y-2">
                  {leaves.map(leave => {
                    const hm = housemates.find(h => h.id === leave.housemate_id);
                    return (
                      <div key={leave.id} className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-white/80 border border-pink-100">
                        <div className="flex items-center gap-2 md:gap-3 min-w-0">
                          <span className="text-lg md:text-xl">🌴</span>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-700 text-sm md:text-base truncate">{hm?.name}</p>
                            <p className="text-xs md:text-sm text-slate-500 truncate">
                              {format(new Date(leave.start_date), 'MMM d')} - {format(new Date(leave.end_date), 'MMM d')}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="text-pink-600 h-7 text-xs" onClick={() => setLeaveModal({ open: true, leave })}>
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-400 h-7 text-xs" onClick={() => deleteLeave.mutate(leave.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <Button 
                variant="outline"
                className="gap-2 border-pink-200 text-pink-600 hover:bg-pink-50"
                onClick={() => setChoreModal({ open: true, chore: null })}
              >
                <Plus className="w-4 h-4" />
                Add Chore
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {housemates.map(hm => (
                <div 
                  key={hm.id}
                  className="p-3 md:p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-pink-100 cursor-pointer hover:shadow-xl hover:shadow-pink-100/50 hover:scale-[1.02] hover:border-pink-200 transition-all duration-300 group"
                  onClick={() => setHousemateModal({ open: true, housemate: hm })}
                >
                  <div className="flex flex-col items-center gap-2 md:gap-3">
                    {hm.photo_url ? (
                      <img src={hm.photo_url} alt={hm.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shadow-lg" />
                    ) : (
                      <AvatarDisplay avatarId={hm.avatar_id} name={hm.name} size="xl" />
                    )}
                    <div className="text-center">
                      <h4 className="font-medium text-slate-700 text-sm md:text-base">{hm.name}</h4>
                      <p className="text-xs text-slate-500 truncate max-w-full">{hm.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button 
                className="gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                onClick={() => setHousemateModal({ open: true, housemate: null })}
              >
                <UserPlus className="w-4 h-4" />
                Add User
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <ChoreModal
                open={choreModal.open}
                onClose={() => setChoreModal({ open: false, chore: null })}
                chore={choreModal.chore}
                housemates={housemates}
                onApplyEndDateToAll={applyEndDateToAllChores}
                onSave={(data) => {
                  if (choreModal.chore) {
                    updateChore.mutate({ id: choreModal.chore.id, data });
                  } else {
                    createChore.mutate(data);
                  }
                }}
              />

      <LeaveModal
        open={leaveModal.open}
        onClose={() => setLeaveModal({ open: false, leave: null })}
        leave={leaveModal.leave}
        housemates={housemates}
        onSave={(data) => {
          if (leaveModal.leave) {
            updateLeave.mutate({ id: leaveModal.leave.id, data });
          } else {
            createLeave.mutate(data);
          }
        }}
      />

      <HousemateModal
        open={housemateModal.open}
        onClose={() => setHousemateModal({ open: false, housemate: null })}
        housemate={housemateModal.housemate}
        usedColors={housemates.map(h => h.color)}
        leaves={leaves}
        onEditLeave={(leave) => {
          setHousemateModal({ open: false, housemate: null });
          setLeaveModal({ open: true, leave });
        }}
        onDeleteLeave={(id) => deleteLeave.mutate(id)}
        onSave={(data) => {
          if (housemateModal.housemate) {
            updateHousemate.mutate({ id: housemateModal.housemate.id, data });
          } else {
            createHousemate.mutate(data);
          }
        }}
      />
    </div>
  );
}