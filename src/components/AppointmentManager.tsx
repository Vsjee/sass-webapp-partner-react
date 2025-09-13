import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  DollarSign, 
  Edit, 
  Trash2, 
  Save, 
  X,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RotateCcw
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  date: Date;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
  duration: number;
  price: number;
  status: "confirmed" | "completed" | "cancelled" | "no-show";
}

interface AppointmentManagerProps {
  appointments: Appointment[];
  onUpdateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  onDeleteAppointment: (id: string) => void;
  onUpdateStatus: (id: string, status: Appointment["status"]) => void;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30"
];

const statusColors = {
  confirmed: "bg-blue-500",
  completed: "bg-green-500", 
  cancelled: "bg-red-500",
  "no-show": "bg-orange-500"
};

const statusIcons = {
  confirmed: CheckCircle,
  completed: CheckCircle,
  cancelled: XCircle,
  "no-show": AlertTriangle
};

export function AppointmentManager({ 
  appointments, 
  onUpdateAppointment, 
  onDeleteAppointment,
  onUpdateStatus 
}: AppointmentManagerProps) {
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | Appointment["status"]>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "upcoming" | "past">("all");

  const [editForm, setEditForm] = useState({
    date: new Date(),
    time: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: ""
  });

  const filteredAppointments = appointments.filter(apt => {
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus;
    const matchesSearch = searchTerm === "" || 
      apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const aptDate = new Date(apt.date);
    aptDate.setHours(0, 0, 0, 0);
    
    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = aptDate.getTime() === today.getTime();
    } else if (dateFilter === "upcoming") {
      matchesDate = aptDate.getTime() >= today.getTime();
    } else if (dateFilter === "past") {
      matchesDate = aptDate.getTime() < today.getTime();
    }
    
    return matchesStatus && matchesSearch && matchesDate;
  });

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setEditForm({
      date: appointment.date,
      time: appointment.time,
      customerName: appointment.customerName,
      customerEmail: appointment.customerEmail,
      customerPhone: appointment.customerPhone || "",
      notes: appointment.notes || ""
    });
  };

  const handleUpdateAppointment = () => {
    if (!editingAppointment) return;

    onUpdateAppointment(editingAppointment.id, {
      date: editForm.date,
      time: editForm.time,
      customerName: editForm.customerName,
      customerEmail: editForm.customerEmail,
      customerPhone: editForm.customerPhone,
      notes: editForm.notes
    });

    setEditingAppointment(null);
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
  };

  const getStatusBadge = (status: Appointment["status"]) => {
    const Icon = statusIcons[status];
    return (
      <Badge 
        variant="secondary" 
        className={`${statusColors[status]} text-white flex items-center gap-1`}
      >
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
      </Badge>
    );
  };

  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA.getTime() === dateB.getTime()) {
      return a.time.localeCompare(b.time);
    }
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Appointments</h2>
          <p className="text-muted-foreground">Manage and track your appointments</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Input
            placeholder="Search customers or services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={dateFilter} onValueChange={(value: any) => setDateFilter(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="past">Past</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="no-show">No Show</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedAppointments.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {appointments.length === 0 ? "No Appointments Yet" : "No Matching Appointments"}
            </h3>
            <p className="text-muted-foreground">
              {appointments.length === 0 
                ? "Your appointments will appear here once customers start booking"
                : "Try adjusting your search or filter criteria"
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedAppointments.map((appointment) => (
            <Card key={appointment.id} className="shadow-card animate-fade-up">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{appointment.serviceName}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {appointment.customerName}
                      <Mail className="h-4 w-4 ml-2" />
                      {appointment.customerEmail}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(appointment.status)}
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditAppointment(appointment)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Appointment</DialogTitle>
                            <DialogDescription>
                              Update appointment details
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Select New Date</Label>
                                <div className="border rounded-lg p-3">
                                  <Calendar
                                    mode="single"
                                    selected={editForm.date}
                                    onSelect={(date) => date && setEditForm(prev => ({ ...prev, date }))}
                                    disabled={(date) => date < new Date()}
                                    className="w-full"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Select Time</Label>
                                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                                  {timeSlots.map((time) => (
                                    <Button
                                      key={time}
                                      variant={editForm.time === time ? "business" : "outline"}
                                      size="sm"
                                      onClick={() => setEditForm(prev => ({ ...prev, time }))}
                                      className="h-8"
                                    >
                                      {time}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Customer Name</Label>
                                <Input
                                  id="edit-name"
                                  value={editForm.customerName}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, customerName: e.target.value }))}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="edit-email">Email</Label>
                                <Input
                                  id="edit-email"
                                  type="email"
                                  value={editForm.customerEmail}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="edit-phone">Phone (Optional)</Label>
                                <Input
                                  id="edit-phone"
                                  value={editForm.customerPhone}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="edit-notes">Notes</Label>
                                <Textarea
                                  id="edit-notes"
                                  value={editForm.notes}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                                  className="resize-none h-20"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button onClick={handleUpdateAppointment} className="flex-1">
                              <Save className="h-4 w-4 mr-2" />
                              Update Appointment
                            </Button>
                            <Button variant="outline" onClick={handleCancelEdit}>
                              Cancel
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-destructive" />
                              Delete Appointment
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this appointment? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDeleteAppointment(appointment.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{appointment.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-business-success" />
                    <span className="font-semibold">${appointment.price}</span>
                  </div>
                </div>
                
                {appointment.notes && (
                  <div className="mb-4 p-3 bg-muted rounded-lg">
                    <Label className="text-sm font-medium">Notes:</Label>
                    <p className="text-sm text-muted-foreground mt-1">{appointment.notes}</p>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Select
                    value={appointment.status}
                    onValueChange={(value: Appointment["status"]) => onUpdateStatus(appointment.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="no-show">No Show</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {appointment.status === "cancelled" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(appointment.id, "confirmed")}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Restore
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}