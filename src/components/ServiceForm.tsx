import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Settings } from "lucide-react";

interface ServiceFormProps {
  onSave: (service: {
    name: string;
    description: string;
    duration: number;
    price: number;
    category: string;
  }) => void;
  onCancel: () => void;
  initialData?: {
    name: string;
    description: string;
    duration: number;
    price: number;
    category: string;
  };
  availableCategories?: string[];
}

export function ServiceForm({ onSave, onCancel, initialData, availableCategories }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    duration: initialData?.duration || 60,
    price: initialData?.price || 0,
    category: initialData?.category || ""
  });

  const defaultCategories = [
    "Hair Care",
    "Beauty",
    "Wellness", 
    "Consulting",
    "Fitness",
    "Education",
    "Technology",
    "Healthcare",
    "Legal",
    "Other"
  ];

  const categories = availableCategories && availableCategories.length > 0 
    ? availableCategories 
    : defaultCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category || formData.price <= 0) {
      return;
    }

    onSave(formData);
  };

  const isFormValid = formData.name && formData.description && formData.category && formData.price > 0;

  return (
    <div className="min-h-screen bg-subtle-gradient p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onCancel} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {initialData ? "Edit Service" : "Create New Service"}
          </h1>
          <p className="text-muted-foreground">
            {initialData ? "Update your service details" : "Add a new service to your offerings"}
          </p>
        </div>

        <Card className="shadow-card animate-fade-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Service Details
            </CardTitle>
            <CardDescription>
              Provide comprehensive information about your service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Hair Cut & Style"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="transition-all focus:ring-business-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what your service includes, benefits, and what clients can expect..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="resize-none h-24 transition-all focus:ring-business-secondary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="15"
                    max="480"
                    step="15"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
                    className="transition-all focus:ring-business-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className="transition-all focus:ring-business-secondary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="transition-all focus:ring-business-secondary">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit"
                  disabled={!isFormValid}
                  variant="business"
                  size="lg"
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {initialData ? "Update Service" : "Create Service"}
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={onCancel}
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {formData.name && formData.description && (
          <Card className="mt-6 shadow-card animate-fade-up">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How your service will appear to customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-background/50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-business-primary">{formData.name}</h3>
                    {formData.category && (
                      <span className="inline-block px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded mt-1">
                        {formData.category}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-business-primary">
                      ${formData.price || "0"}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">{formData.description}</p>
                <div className="text-sm text-muted-foreground">
                  Duration: {formData.duration} minutes
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}