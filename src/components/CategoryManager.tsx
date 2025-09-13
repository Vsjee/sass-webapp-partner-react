import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Tag, 
  Save, 
  X,
  AlertTriangle 
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

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  serviceCount: number;
}

interface CategoryManagerProps {
  categories: Category[];
  onCreateCategory: (category: Omit<Category, "id" | "serviceCount">) => void;
  onUpdateCategory: (id: string, category: Omit<Category, "id" | "serviceCount">) => void;
  onDeleteCategory: (id: string) => void;
}

const colorOptions = [
  "#3B82F6", "#10B981", "#F59E0B", "#EF4444", 
  "#8B5CF6", "#06B6D4", "#F97316", "#84CC16"
];

export function CategoryManager({ 
  categories, 
  onCreateCategory, 
  onUpdateCategory, 
  onDeleteCategory 
}: CategoryManagerProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: colorOptions[0]
  });

  const handleCreateCategory = () => {
    if (!formData.name.trim()) return;
    
    onCreateCategory(formData);
    setFormData({ name: "", description: "", color: colorOptions[0] });
    setIsCreateDialogOpen(false);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color
    });
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !formData.name.trim()) return;
    
    onUpdateCategory(editingCategory.id, formData);
    setEditingCategory(null);
    setFormData({ name: "", description: "", color: colorOptions[0] });
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", color: colorOptions[0] });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Categories</h2>
          <p className="text-muted-foreground">Organize your services by category</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="business">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>
                Add a new category to organize your services
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  placeholder="e.g., Hair Care, Wellness"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-description">Description</Label>
                <Textarea
                  id="category-description"
                  placeholder="Brief description of this category..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="resize-none h-20"
                />
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        formData.color === color ? "border-business-primary scale-110" : "border-border"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleCreateCategory}
                  disabled={!formData.name.trim()}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Category
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="shadow-card animate-fade-up">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  {editingCategory?.id === category.id ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="h-8 text-lg font-semibold"
                    />
                  ) : (
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  )}
                </div>
                <div className="flex gap-1">
                  {editingCategory?.id === category.id ? (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleUpdateCategory}
                        disabled={!formData.name.trim()}
                      >
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelEdit}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={category.serviceCount > 0}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-destructive" />
                              Delete Category
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the "{category.name}" category? 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDeleteCategory(category.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingCategory?.id === category.id ? (
                <div className="space-y-3">
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="resize-none h-16 text-sm"
                    placeholder="Category description..."
                  />
                  <div className="flex gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          formData.color === color ? "border-business-primary scale-110" : "border-border"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {category.description || "No description provided"}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {category.serviceCount} services
                    </Badge>
                    {category.serviceCount > 0 && (
                      <span className="text-xs text-muted-foreground">
                        Cannot delete - has services
                      </span>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Categories Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create categories to organize your services and make them easier to manage
            </p>
            <Button 
              variant="business" 
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Category
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}