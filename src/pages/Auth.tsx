import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const validateForm = () => {
    if (isSignUp && !formData.name.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Name is required"
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email is required"
      });
      return false;
    }
    if (!formData.password.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password is required"
      });
      return false;
    }
    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters long"
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      if (isSignUp) {
        await register(formData.name.trim(), formData.email.trim(), formData.password);
        toast({
          title: "Success",
          description: "Account created successfully!"
        });
      } else {
        await login(formData.email.trim(), formData.password);
        toast({
          title: "Success",
          description: "Logged in successfully!"
        });
      }
      navigate("/dashboard");
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error?.response?.data?.message || "Authentication failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <div className="mb-6">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <div className="bg-card rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-6">
          {isSignUp ? "Create Account" : "Sign In"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                disabled={isLoading}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isSignUp ? "Creating Account..." : "Signing In..."}
              </div>
            ) : (
              <>{isSignUp ? "Create Account" : "Sign In"}</>
            )}
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;