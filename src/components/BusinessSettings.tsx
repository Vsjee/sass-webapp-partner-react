import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Building2, 
  Clock, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Tag
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export interface BusinessInfo {
  name: string;
  description: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  workingHours: {
    monday: { isOpen: boolean; start: string; end: string; };
    tuesday: { isOpen: boolean; start: string; end: string; };
    wednesday: { isOpen: boolean; start: string; end: string; };
    thursday: { isOpen: boolean; start: string; end: string; };
    friday: { isOpen: boolean; start: string; end: string; };
    saturday: { isOpen: boolean; start: string; end: string; };
    sunday: { isOpen: boolean; start: string; end: string; };
  };
}

interface BusinessSettingsProps {
  businessInfo: BusinessInfo;
  onUpdateBusiness: (info: BusinessInfo) => void;
}

const days = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' }
] as const;

const timeSlots = [
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", 
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", 
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00"
];

const businessCategories = [
  { value: "restaurant", label: "Restaurant & Food" },
  { value: "beauty", label: "Beauty & Salon" },
  { value: "health", label: "Health & Medical" },
  { value: "fitness", label: "Fitness & Wellness" },
  { value: "automotive", label: "Automotive" },
  { value: "professional", label: "Professional Services" },
  { value: "education", label: "Education & Training" },
  { value: "home", label: "Home Services" },
  { value: "retail", label: "Retail & Shopping" },
  { value: "entertainment", label: "Entertainment" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" }
];

export function BusinessSettings({ businessInfo, onUpdateBusiness }: BusinessSettingsProps) {
  const [formData, setFormData] = useState<BusinessInfo>(businessInfo);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onUpdateBusiness(formData);
    setIsLoading(false);
    
    toast({
      title: "Business settings updated",
      description: "Your business information has been successfully updated.",
    });
  };

  const handleWorkingHoursChange = (
    day: keyof BusinessInfo["workingHours"], 
    field: 'isOpen' | 'start' | 'end', 
    value: boolean | string
  ) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
    }));
  };

  const getOpenDaysCount = () => {
    return Object.values(formData.workingHours).filter(day => day.isOpen).length;
  };

  const getTotalHours = () => {
    let totalMinutes = 0;
    Object.values(formData.workingHours).forEach(day => {
      if (day.isOpen && day.start && day.end) {
        const [startHour, startMin] = day.start.split(':').map(Number);
        const [endHour, endMin] = day.end.split(':').map(Number);
        const dayMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
        if (dayMinutes > 0) totalMinutes += dayMinutes;
      }
    });
    return Math.round(totalMinutes / 60 * 10) / 10;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Business Settings</h2>
          <p className="text-muted-foreground">Manage your business information and operating hours</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading} variant="business">
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-business-primary" />
                Business Information
              </CardTitle>
              <CardDescription>
                Update your business details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your business name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-category">Business Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business category" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-phone">Phone Number</Label>
                  <Input
                    id="business-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-email">Email Address</Label>
                  <Input
                    id="business-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="business@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-website">Website</Label>
                  <Input
                    id="business-website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://yourbusiness.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-address">Address</Label>
                  <Input
                    id="business-address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Business St, City, State 12345"
                  />
                </div>
              </div>


              <div className="space-y-2">
                <Label htmlFor="business-description">Description</Label>
                <Textarea
                  id="business-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your business and services..."
                  className="resize-none h-24"
                />
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-business-secondary" />
                Operating Hours
              </CardTitle>
              <CardDescription>
                Set your business hours for each day of the week
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {days.map(({ key, label }) => {
                const dayData = formData.workingHours[key];
                return (
                  <div key={key} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex items-center space-x-2 min-w-[100px]">
                      <Switch
                        checked={dayData.isOpen}
                        onCheckedChange={(checked) => 
                          handleWorkingHoursChange(key, 'isOpen', checked)
                        }
                      />
                      <Label className="font-medium">{label}</Label>
                    </div>
                    
                    {dayData.isOpen ? (
                      <div className="flex items-center gap-2 flex-1">
                        <select
                          value={dayData.start}
                          onChange={(e) => handleWorkingHoursChange(key, 'start', e.target.value)}
                          className="px-3 py-1 border rounded text-sm"
                        >
                          <option value="">Start time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        <span className="text-muted-foreground">to</span>
                        <select
                          value={dayData.end}
                          onChange={(e) => handleWorkingHoursChange(key, 'end', e.target.value)}
                          className="px-3 py-1 border rounded text-sm"
                        >
                          <option value="">End time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <Badge variant="secondary">Closed</Badge>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {formData.name || "Business Name"}
                  </span>
                </div>
                
                {formData.category && (
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {businessCategories.find(cat => cat.value === formData.category)?.label}
                    </span>
                  </div>
                )}
                
                {formData.address && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{formData.address}</span>
                  </div>
                )}
                
                {formData.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{formData.phone}</span>
                  </div>
                )}
                
                {formData.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{formData.email}</span>
                  </div>
                )}
                
                {formData.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{formData.website}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-business-accent" />
                Operating Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-business-primary">
                    {getOpenDaysCount()}
                  </div>
                  <div className="text-xs text-muted-foreground">Days Open</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-business-secondary">
                    {getTotalHours()}h
                  </div>
                  <div className="text-xs text-muted-foreground">Total Hours</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Weekly Schedule</Label>
                <div className="space-y-1">
                  {days.map(({ key, label }) => {
                    const dayData = formData.workingHours[key];
                    return (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{label.slice(0, 3)}</span>
                        <span className={dayData.isOpen ? "text-business-success" : "text-muted-foreground"}>
                          {dayData.isOpen && dayData.start && dayData.end 
                            ? `${dayData.start} - ${dayData.end}`
                            : "Closed"
                          }
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}