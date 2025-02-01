import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Amica Network</h1>
          <p className="text-2xl text-muted-foreground mb-8">Your College Community Hub</p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get Started
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 bg-card rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Lost & Found</h3>
            <p className="text-muted-foreground mb-4">
              Lost something? Found something? Connect with your college community to help each other.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Borrow & Lend</h3>
            <p className="text-muted-foreground mb-4">
              Need something temporarily? Share resources within your college community.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Activities</h3>
            <p className="text-muted-foreground mb-4">
              Join or create study groups, sports activities, and more with your college mates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;