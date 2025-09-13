import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, User, Mail, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
}

interface AppointmentBookingProps {
  service: Service;
  onConfirm: (appointment: any) => void;
  onCancel: () => void;
}

export function AppointmentBooking({ service, onConfirm, onCancel }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");

  // Mock available time slots
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", 
    "16:00", "16:30", "17:00", "17:30"
  ];

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime || !customerName || !customerEmail) {
      return;
    }

    const appointment = {
      id: Date.now().toString(),
      serviceId: service.id,
      serviceName: service.name,
      date: selectedDate,
      time: selectedTime,
      customerName,
      customerEmail,
      notes,
      duration: service.duration,
      price: service.price,
      status: "confirmed"
    };

    onConfirm(appointment);
  };

  const isFormValid = selectedDate && selectedTime && customerName && customerEmail;

  return (
    <div className="min-h-screen bg-subtle-gradient p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onCancel} className="mb-4">
            ← Back to Services
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Book Appointment</h1>
          <p className="text-muted-foreground">Schedule your session with us</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Summary */}
          <Card className="h-fit shadow-card animate-fade-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-business-accent animate-pulse"></div>
                Service Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-business-primary">{service.name}</h3>
                <Badge variant="secondary" className="mt-1">{service.category}</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-business-secondary" />
                  <span className="text-sm">{service.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-business-primary">${service.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="shadow-card animate-fade-up">
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>Choose your preferred appointment slot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Calendar */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Select Date</Label>
                <div className="border rounded-lg p-3 bg-background">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="animate-fade-up">
                  <Label className="text-sm font-medium mb-3 block">Available Times</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "business" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="h-10"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Details */}
          <Card className="lg:col-span-2 shadow-card animate-fade-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Your Information
              </CardTitle>
              <CardDescription>Please provide your contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="transition-all focus:ring-business-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="transition-all focus:ring-business-secondary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or information..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="resize-none h-20 transition-all focus:ring-business-secondary"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleConfirm}
                  disabled={!isFormValid}
                  variant="business"
                  size="lg"
                  className="flex-1"
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Confirm Appointment
                </Button>
                <Button variant="outline" onClick={onCancel} size="lg">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}