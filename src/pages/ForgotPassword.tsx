import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending password recovery email
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-subtle-gradient flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="shadow-elegant animate-fade-up text-center">
            <CardHeader className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-business-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-business-success" />
              </div>
              <CardTitle className="text-2xl font-bold text-business-primary">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-base">
                We've sent a password recovery link to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>If you don't see the email in your inbox, please check your spam folder.</p>
                <p>The recovery link will expire in 24 hours for security reasons.</p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                  variant="business" 
                  className="w-full"
                >
                  Send Another Email
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full"
                >
                  <Link to="/login">Back to Sign In</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-subtle-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back to login */}
        <Link 
          to="/login" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-business-primary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to sign in
        </Link>

        <Card className="shadow-elegant animate-fade-up">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-business-primary">
              Reset Your Password
            </CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 transition-all focus:ring-business-secondary"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="business" 
                className="w-full" 
                size="lg"
                disabled={isLoading || !email}
              >
                {isLoading ? "Sending..." : "Send Recovery Email"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link 
                  to="/login" 
                  className="text-business-primary hover:text-business-secondary font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">Need help?</h4>
              <p className="text-xs text-muted-foreground">
                If you're having trouble recovering your account, contact our support team at{" "}
                <a href="mailto:support@bookingpro.com" className="text-business-primary hover:underline">
                  support@bookingpro.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}