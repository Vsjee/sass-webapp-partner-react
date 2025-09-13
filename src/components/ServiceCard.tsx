import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Calendar } from "lucide-react";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  onBook: (serviceId: string) => void;
  onEdit?: (serviceId: string) => void;
  onDelete?: (serviceId: string) => void;
  isOwner?: boolean;
}

export function ServiceCard({
  id,
  name,
  description,
  duration,
  price,
  category,
  onBook,
  onEdit,
  onDelete,
  isOwner = false
}: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border/40 bg-card/50 backdrop-blur-sm animate-fade-up">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-business-primary transition-colors">
              {name}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-business-primary">${price}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>Per session</span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={() => onBook(id)}
            variant="business"
            className="flex-1"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book Now
          </Button>
          
          {isOwner && (
            <div className="flex gap-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(id)}
                  className="hover-scale flex-1"
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(id)}
                  className="hover-scale text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}