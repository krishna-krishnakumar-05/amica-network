import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle auth logic here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-amica-lightest flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <Input
                type="text"
                placeholder="Full Name"
                className="form-input"
                required
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                className="form-input"
                required
              />
              <Input
                type="text"
                placeholder="Department"
                className="form-input"
                required
              />
            </>
          )}
          <Input
            type="email"
            placeholder="Email"
            className="form-input"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            className="form-input"
            required
          />
          <Button type="submit" className="w-full btn-primary">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <p className="mt-4 text-center">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-amica-accent hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;