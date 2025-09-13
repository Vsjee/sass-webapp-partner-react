import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Smartphone,
  Globe,
  ArrowRight,
  Play
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Automated booking system that works 24/7, reducing no-shows and maximizing your availability."
    },
    {
      icon: Users,
      title: "Customer Management", 
      description: "Keep track of your clients, their preferences, and booking history in one organized place."
    },
    {
      icon: DollarSign,
      title: "Revenue Tracking",
      description: "Monitor your earnings, track popular services, and analyze business growth with detailed reports."
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Your booking system works perfectly on all devices, making it easy for customers to book anywhere."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security keeps your business and customer data safe and protected."
    },
    {
      icon: Globe,
      title: "Online Presence",
      description: "Get a professional booking page that showcases your services and builds trust with customers."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      business: "Elegant Hair Salon",
      content: "BookingPro transformed my salon. I now have 40% fewer no-shows and my customers love the easy booking process.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      business: "Wellness Clinic",
      content: "The automated reminders and customer management features have saved me hours each week. Highly recommended!",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      business: "Fitness Training",
      content: "My booking rate increased by 60% after switching to BookingPro. The analytics help me understand my business better.",
      rating: 5
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "29",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 100 bookings/month",
        "Basic scheduling features",
        "Email notifications",
        "Customer database",
        "Mobile-friendly booking page"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "59",
      description: "Ideal for growing businesses",
      features: [
        "Unlimited bookings",
        "Advanced scheduling",
        "SMS & email reminders",
        "Analytics dashboard",
        "Custom branding",
        "Payment integration",
        "Multi-staff support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "99",
      description: "For established businesses with advanced needs",
      features: [
        "Everything in Professional",
        "Priority customer support",
        "Advanced analytics",
        "API access",
        "White-label solution",
        "Custom integrations"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-business-gradient rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-business-primary">BookingPro</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-business-primary transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-business-primary transition-colors">Pricing</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-business-primary transition-colors">Reviews</a>
              <div className="flex items-center space-x-3">
                <Button asChild variant="outline">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild variant="business">
                  <Link to="/register">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-subtle-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-3 py-1">
              🚀 Join 10,000+ businesses worldwide
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up">
              Grow Your Business with
              <span className="text-business-primary block mt-2">Smart Booking</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{animationDelay: '0.1s'}}>
              BookingPro helps service-based businesses automate scheduling, reduce no-shows, and increase revenue with our powerful booking platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up" style={{animationDelay: '0.2s'}}>
              <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6">
                <Link to="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-business-primary">24/7</div>
                <p className="text-sm text-muted-foreground">Online Booking</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-business-success">40%</div>
                <p className="text-sm text-muted-foreground">Fewer No-Shows</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-business-warning">5 min</div>
                <p className="text-sm text-muted-foreground">Setup Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to manage and grow your service business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="w-12 h-12 bg-business-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-business-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loved by Business Owners
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our customers have to say about BookingPro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-business-warning text-business-warning" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your business needs. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`shadow-card relative animate-fade-up ${
                  plan.popular ? 'border-business-primary shadow-glow scale-105' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant="default" className="bg-business-primary">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="my-4">
                    <span className="text-4xl font-bold text-business-primary">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-business-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild
                    variant={plan.popular ? "business" : "outline"} 
                    className="w-full mt-6"
                    size="lg"
                  >
                    <Link to="/register">
                      Start Free Trial
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-business-gradient">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful business owners who have streamlined their operations with BookingPro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg" className="bg-white text-business-primary hover:bg-white/90 border-white">
              <Link to="/register">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-business-gradient rounded flex items-center justify-center">
                  <Calendar className="h-3 w-3 text-white" />
                </div>
                <h3 className="font-bold text-business-primary">BookingPro</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                The complete appointment booking solution for service-based businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-business-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-business-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-business-primary transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-business-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-business-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-business-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-business-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-business-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-business-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-business-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-business-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-business-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 BookingPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}