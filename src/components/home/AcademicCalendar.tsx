import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Plus, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { toast } from "sonner";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay, isToday, parseISO } from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  end_date: string | null;
  event_type: string;
  color: string;
  is_public: boolean;
}

const EVENT_TYPES = [
  { value: "submission", label: "Submission Deadline", color: "hsl(var(--primary))" },
  { value: "review", label: "Review Period", color: "hsl(var(--accent))" },
  { value: "publication", label: "Publication Date", color: "hsl(142 71% 45%)" },
  { value: "conference", label: "Conference/Workshop", color: "hsl(280 67% 55%)" },
  { value: "general", label: "General", color: "hsl(var(--muted-foreground))" },
];

const getEventColor = (type: string) => {
  return EVENT_TYPES.find(t => t.value === type)?.color || "hsl(var(--muted-foreground))";
};

const getEventLabel = (type: string) => {
  return EVENT_TYPES.find(t => t.value === type)?.label || "Event";
};

export const AcademicCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [timezone, setTimezone] = useState("UTC");

  const { user } = useAuth();
  const { isAdmin } = useUserRoles(user ?? null);

  // Form state
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_type: "general",
    end_date: "",
  });

  // Detect timezone
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(tz);
    } catch {
      setTimezone("Africa/Lagos");
    }
  }, []);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("calendar_events")
        .select("*")
        .order("event_date", { ascending: true });

      if (!error && data) {
        setEvents(data as CalendarEvent[]);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const startDayOfWeek = getDay(startOfMonth(currentMonth));

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = parseISO(event.event_date);
      if (event.end_date) {
        const endDate = parseISO(event.end_date);
        return date >= eventDate && date <= endDate;
      }
      return isSameDay(date, eventDate);
    });
  };

  const handleAddEvent = async () => {
    if (!newEvent.title || !selectedDate) return;

    const { error } = await supabase.from("calendar_events").insert({
      title: newEvent.title,
      description: newEvent.description || null,
      event_date: format(selectedDate, "yyyy-MM-dd"),
      end_date: newEvent.end_date || null,
      event_type: newEvent.event_type,
      color: getEventColor(newEvent.event_type),
      created_by: user?.id,
      is_public: true,
    });

    if (error) {
      toast.error("Failed to add event");
    } else {
      toast.success("Event added successfully");
      setShowAddDialog(false);
      setNewEvent({ title: "", description: "", event_type: "general", end_date: "" });
      // Refetch
      const { data } = await supabase.from("calendar_events").select("*").order("event_date", { ascending: true });
      if (data) setEvents(data as CalendarEvent[]);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    const { error } = await supabase.from("calendar_events").delete().eq("id", eventId);
    if (!error) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
      toast.success("Event removed");
    }
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get current month's events for the sidebar
  const upcomingEvents = events
    .filter(e => {
      const d = parseISO(e.event_date);
      return d >= new Date();
    })
    .slice(0, 5);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3">
            Academic Calendar
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Stay updated with important dates, submission deadlines, and journal events
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
            <Globe className="w-4 h-4" />
            <span>Timezone: <span className="font-medium text-foreground">{timezone}</span></span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Calendar Grid */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-border/50 shadow-lg">
              <CardHeader className="bg-primary/5 pb-4">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <CardTitle className="text-xl font-serif">
                    {format(currentMonth, "MMMM yyyy")}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                {/* Week day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {weekDays.map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for offset */}
                  {Array.from({ length: startDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}

                  {days.map(day => {
                    const dayEvents = getEventsForDate(day);
                    const hasEvents = dayEvents.length > 0;
                    const today = isToday(day);

                    return (
                      <Popover key={day.toISOString()}>
                        <PopoverTrigger asChild>
                          <button
                            className={`
                              aspect-square rounded-lg flex flex-col items-center justify-center relative
                              text-sm transition-all duration-200 cursor-pointer
                              hover:bg-accent/30 hover:scale-105
                              ${today ? "bg-primary text-primary-foreground font-bold ring-2 ring-primary/30" : ""}
                              ${hasEvents && !today ? "bg-accent/10 font-medium" : ""}
                              ${!isSameMonth(day, currentMonth) ? "text-muted-foreground/40" : ""}
                            `}
                            onMouseEnter={() => setHoveredDate(day)}
                            onMouseLeave={() => setHoveredDate(null)}
                            onClick={() => {
                              if (isAdmin) {
                                setSelectedDate(day);
                                if (!hasEvents) setShowAddDialog(true);
                              }
                            }}
                          >
                            <span>{format(day, "d")}</span>
                            {hasEvents && (
                              <div className="flex gap-0.5 mt-0.5">
                                {dayEvents.slice(0, 3).map((event, i) => (
                                  <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: getEventColor(event.event_type) }}
                                  />
                                ))}
                              </div>
                            )}
                          </button>
                        </PopoverTrigger>
                        {hasEvents && (
                          <PopoverContent className="w-72 p-0" align="center" side="top">
                            <div className="p-3 border-b border-border bg-muted/30">
                              <p className="font-semibold text-sm">{format(day, "EEEE, MMMM d, yyyy")}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3" /> {timezone}
                              </p>
                            </div>
                            <div className="p-2 space-y-1 max-h-48 overflow-y-auto">
                              {dayEvents.map(event => (
                                <div
                                  key={event.id}
                                  className="p-2 rounded-md hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-start gap-2">
                                    <div
                                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                                      style={{ backgroundColor: getEventColor(event.event_type) }}
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-sm leading-tight">{event.title}</p>
                                      <Badge variant="outline" className="text-[10px] mt-1 px-1.5 py-0">
                                        {getEventLabel(event.event_type)}
                                      </Badge>
                                      {event.description && (
                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                                      )}
                                      {isAdmin && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-xs text-destructive h-6 px-2 mt-1"
                                          onClick={() => handleDeleteEvent(event.id)}
                                        >
                                          Remove
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {isAdmin && (
                              <div className="p-2 border-t border-border">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full text-xs"
                                  onClick={() => {
                                    setSelectedDate(day);
                                    setShowAddDialog(true);
                                  }}
                                >
                                  <Plus className="w-3 h-3 mr-1" /> Add Event
                                </Button>
                              </div>
                            )}
                          </PopoverContent>
                        )}
                      </Popover>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/50">
                  {EVENT_TYPES.map(type => (
                    <div key={type.value} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: type.color }} />
                      {type.label}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar: Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-border/50 shadow-lg sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading events...</p>
                ) : upcomingEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming events</p>
                ) : (
                  upcomingEvents.map(event => (
                    <div
                      key={event.id}
                      className="flex gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className="w-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getEventColor(event.event_type) }}
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-sm leading-tight">{event.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(parseISO(event.event_date), "MMM d, yyyy")}
                          {event.end_date && ` — ${format(parseISO(event.end_date), "MMM d, yyyy")}`}
                        </p>
                        <Badge variant="outline" className="text-[10px] mt-1.5 px-1.5 py-0">
                          {getEventLabel(event.event_type)}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}

                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => {
                      setSelectedDate(new Date());
                      setShowAddDialog(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Event
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Add Event Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif">Add Calendar Event</DialogTitle>
              <DialogDescription>
                {selectedDate && `Adding event for ${format(selectedDate, "MMMM d, yyyy")}`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Title</label>
                <Input
                  placeholder="e.g., Submission Deadline Vol. 3"
                  value={newEvent.title}
                  onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Description</label>
                <Textarea
                  placeholder="Brief description of the event..."
                  value={newEvent.description}
                  onChange={e => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Event Type</label>
                <Select
                  value={newEvent.event_type}
                  onValueChange={val => setNewEvent(prev => ({ ...prev, event_type: val }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: type.color }} />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">End Date (optional, for multi-day events)</label>
                <Input
                  type="date"
                  value={newEvent.end_date}
                  onChange={e => setNewEvent(prev => ({ ...prev, end_date: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
              <Button onClick={handleAddEvent} disabled={!newEvent.title}>Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
