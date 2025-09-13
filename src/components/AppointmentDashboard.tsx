import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceCard } from "./ServiceCard";
import { AppointmentBooking } from "./AppointmentBooking";
import { ServiceForm } from "./ServiceForm";
import { CategoryManager, Category } from "./CategoryManager";
import { AppointmentManager, Appointment } from "./AppointmentManager";
import { BusinessSettings, BusinessInfo } from "./BusinessSettings";
import { 
  Plus, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock,
  TrendingUp,
  BarChart3,
  Settings,
  Tag
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

export function AppointmentDashboard() {
  const [currentView, setCurrentView] = useState<"dashboard" | "booking" | "create-service" | "edit-service">("dashboard");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Business settings state
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: "BookingPro Business",
    description: "Professional booking and appointment management for your business",
    category: "professional",
    address: "123 Business Street, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "contact@bookingpro.com",
    website: "https://bookingpro.com",
    workingHours: {
      monday: { isOpen: true, start: "09:00", end: "17:00" },
      tuesday: { isOpen: true, start: "09:00", end: "17:00" },
      wednesday: { isOpen: true, start: "09:00", end: "17:00" },
      thursday: { isOpen: true, start: "09:00", end: "17:00" },
      friday: { isOpen: true, start: "09:00", end: "17:00" },
      saturday: { isOpen: true, start: "10:00", end: "15:00" },
      sunday: { isOpen: false, start: "", end: "" }
    }
  });
  
  // Mock data
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Hair Care", description: "Professional hair services", color: "#3B82F6", serviceCount: 1 },
    { id: "2", name: "Wellness", description: "Health and wellness treatments", color: "#10B981", serviceCount: 1 },
    { id: "3", name: "Consulting", description: "Business and professional consulting", color: "#F59E0B", serviceCount: 1 }
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Hair Cut & Style",
      description: "Professional haircut with styling consultation. Includes wash, cut, and blow-dry.",
      duration: 60,
      price: 85,
      category: "Hair Care"
    },
    {
      id: "2", 
      name: "Deep Tissue Massage",
      description: "Therapeutic deep tissue massage to relieve muscle tension and stress.",
      duration: 90,
      price: 120,
      category: "Wellness"
    },
    {
      id: "3",
      name: "Business Consultation",
      description: "Strategic business consultation session covering growth planning and market analysis.",
      duration: 45,
      price: 200,
      category: "Consulting"
    }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      serviceId: "1",
      serviceName: "Hair Cut & Style",
      date: new Date(),
      time: "10:00",
      customerName: "Sarah Johnson",
      customerEmail: "sarah@example.com",
      customerPhone: "+1 (555) 123-4567",
      duration: 60,
      price: 85,
      status: "confirmed"
    },
    {
      id: "2",
      serviceId: "2",
      serviceName: "Deep Tissue Massage",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "14:30",
      customerName: "Mike Chen",
      customerEmail: "mike@example.com",
      notes: "Focus on lower back tension",
      duration: 90,
      price: 120,
      status: "confirmed"
    }
  ]);

  const handleBookService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setCurrentView("booking");
    }
  };

  const handleConfirmAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
    setCurrentView("dashboard");
    setSelectedService(null);
  };

  const handleCreateService = (serviceData: Omit<Service, "id">) => {
    const newService: Service = {
      ...serviceData,
      id: Date.now().toString()
    };
    setServices(prev => [...prev, newService]);
    
    // Update category service count
    setCategories(prev => prev.map(cat => 
      cat.name === serviceData.category 
        ? { ...cat, serviceCount: cat.serviceCount + 1 }
        : cat
    ));
    
    setCurrentView("dashboard");
  };

  const handleEditService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setCurrentView("edit-service");
    }
  };

  const handleUpdateService = (serviceData: Omit<Service, "id">) => {
    if (!selectedService) return;
    
    const oldCategory = selectedService.category;
    const newCategory = serviceData.category;
    
    setServices(prev => prev.map(service => 
      service.id === selectedService.id 
        ? { ...service, ...serviceData }
        : service
    ));

    // Update category service counts if category changed
    if (oldCategory !== newCategory) {
      setCategories(prev => prev.map(cat => {
        if (cat.name === oldCategory) {
          return { ...cat, serviceCount: cat.serviceCount - 1 };
        }
        if (cat.name === newCategory) {
          return { ...cat, serviceCount: cat.serviceCount + 1 };
        }
        return cat;
      }));
    }
    
    setCurrentView("dashboard");
    setSelectedService(null);
  };

  const handleDeleteService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    setServices(prev => prev.filter(s => s.id !== serviceId));
    
    // Update category service count
    setCategories(prev => prev.map(cat => 
      cat.name === service.category 
        ? { ...cat, serviceCount: cat.serviceCount - 1 }
        : cat
    ));

    // Remove related appointments
    setAppointments(prev => prev.filter(apt => apt.serviceId !== serviceId));
  };

  // Category management
  const handleCreateCategory = (categoryData: Omit<Category, "id" | "serviceCount">) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
      serviceCount: 0
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleUpdateCategory = (categoryId: string, categoryData: Omit<Category, "id" | "serviceCount">) => {
    const oldCategory = categories.find(c => c.id === categoryId);
    if (!oldCategory) return;

    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, ...categoryData }
        : cat
    ));

    // Update services with the new category name
    if (oldCategory.name !== categoryData.name) {
      setServices(prev => prev.map(service => 
        service.category === oldCategory.name 
          ? { ...service, category: categoryData.name }
          : service
      ));
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category || category.serviceCount > 0) return;

    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  // Appointment management
  const handleUpdateAppointment = (appointmentId: string, updateData: Partial<Appointment>) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, ...updateData }
        : apt
    ));
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
  };

  const handleUpdateAppointmentStatus = (appointmentId: string, status: Appointment["status"]) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status }
        : apt
    ));
  };

  // Business settings handlers
  const handleUpdateBusiness = (info: BusinessInfo) => {
    setBusinessInfo(info);
  };

  // Dashboard stats
  const todayAppointments = appointments.filter(
    apt => apt.date.toDateString() === new Date().toDateString()
  ).length;
  
  const upcomingAppointments = appointments.filter(
    apt => apt.date >= new Date() && apt.status !== "cancelled"
  ).length;
  
  const monthlyRevenue = appointments
    .filter(apt => apt.status === "completed")
    .reduce((sum, apt) => sum + apt.price, 0);
    
  const completionRate = appointments.length > 0 
    ? Math.round((appointments.filter(apt => apt.status === "completed").length / appointments.length) * 100)
    : 0;

  if (currentView === "booking" && selectedService) {
    return (
      <AppointmentBooking
        service={selectedService}
        onConfirm={handleConfirmAppointment}
        onCancel={() => {
          setCurrentView("dashboard");
          setSelectedService(null);
        }}
      />
    );
  }

  if (currentView === "create-service") {
    return (
      <ServiceForm
        onSave={handleCreateService}
        onCancel={() => setCurrentView("dashboard")}
        availableCategories={categories.map(c => c.name)}
      />
    );
  }

  if (currentView === "edit-service" && selectedService) {
    return (
      <ServiceForm
        onSave={handleUpdateService}
        onCancel={() => {
          setCurrentView("dashboard");
          setSelectedService(null);
        }}
        initialData={selectedService}
        availableCategories={categories.map(c => c.name)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-subtle-gradient">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-business-primary">BookingPro</h1>
              <p className="text-muted-foreground">Manage your appointments and services</p>
            </div>
            <Button 
              onClick={() => setCurrentView("create-service")}
              variant="business"
              className="animate-float"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-background/50 backdrop-blur">
            <TabsTrigger value="overview" className="data-[state=active]:bg-business-primary data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-business-primary data-[state=active]:text-white">
              <Tag className="h-4 w-4 mr-2" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-business-primary data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-business-primary data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-business-primary data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-business-primary data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-card animate-fade-up">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-business-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-business-primary">{todayAppointments}</div>
                  <p className="text-xs text-muted-foreground">
                    Scheduled for today
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-fade-up" style={{animationDelay: '0.1s'}}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
                  <Users className="h-4 w-4 text-business-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-business-primary">{upcomingAppointments}</div>
                  <p className="text-xs text-muted-foreground">
                    Future appointments
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-fade-up" style={{animationDelay: '0.2s'}}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-business-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-business-success">${monthlyRevenue}</div>
                  <p className="text-xs text-muted-foreground">
                    From completed bookings
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-fade-up" style={{animationDelay: '0.3s'}}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-business-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-business-accent">{completionRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Appointments completed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Business Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 shadow-card animate-fade-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-business-accent animate-pulse"></div>
                    Business Overview
                  </CardTitle>
                  <CardDescription>Your business information and operating status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-business-primary">{businessInfo.name}</h4>
                      <p className="text-sm text-muted-foreground">{businessInfo.description}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Address:</span>
                        <span className="text-muted-foreground ml-2">{businessInfo.address}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Phone:</span>
                        <span className="text-muted-foreground ml-2">{businessInfo.phone}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Email:</span>
                        <span className="text-muted-foreground ml-2">{businessInfo.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h5 className="font-medium mb-2">Operating Hours</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      {Object.entries(businessInfo.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize text-muted-foreground">{day.slice(0,3)}</span>
                          <span className={hours.isOpen ? "text-business-success" : "text-muted-foreground"}>
                            {hours.isOpen && hours.start && hours.end 
                              ? `${hours.start}-${hours.end}`
                              : "Closed"
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xl font-bold text-business-primary">{services.length}</div>
                      <div className="text-xs text-muted-foreground">Services</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-xl font-bold text-business-secondary">{categories.length}</div>
                      <div className="text-xs text-muted-foreground">Categories</div>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-xl font-bold text-business-accent">{appointments.length}</div>
                    <div className="text-xs text-muted-foreground">Total Bookings</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Featured Services */}
            <Card className="shadow-card animate-fade-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-business-accent animate-pulse"></div>
                  Featured Services
                </CardTitle>
                <CardDescription>Your most popular offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.slice(0, 3).map((service) => (
                    <ServiceCard
                      key={service.id}
                      {...service}
                      onBook={handleBookService}
                      isOwner={true}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoryManager
              categories={categories}
              onCreateCategory={handleCreateCategory}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Your Services</h2>
                <p className="text-muted-foreground">Manage and edit your service offerings</p>
              </div>
              <Button onClick={() => setCurrentView("create-service")} variant="business">
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onBook={handleBookService}
                  onEdit={handleEditService}
                  onDelete={handleDeleteService}
                  isOwner={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <AppointmentManager
              appointments={appointments}
              onUpdateAppointment={handleUpdateAppointment}
              onDeleteAppointment={handleDeleteAppointment}
              onUpdateStatus={handleUpdateAppointmentStatus}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>Track your business performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-business-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Detailed analytics and reports will be available soon to help you track your business performance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <BusinessSettings
              businessInfo={businessInfo}
              onUpdateBusiness={handleUpdateBusiness}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}