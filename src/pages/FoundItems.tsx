import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, MapPin, Mail } from "lucide-react";

const FoundItems = () => {
  // Placeholder data - in a real app this would come from a backend
  const foundItems = [
    {
      id: 1,
      title: "Found Wallet",
      description: "Brown leather wallet",
      location: "Student Center",
      contact: "jane@example.com",
      date: "2024-02-21",
    },
    // ... more items would be added here
  ];

  return (
    <div className="min-h-screen bg-amica-lightest p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Button>
          </Link>
          <Link to="/found-items/new">
            <Button className="bg-amica-accent hover:bg-amica-warm gap-2">
              <Plus className="w-5 h-5" /> Report Found Item
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-playfair mb-8">Found Items</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {foundItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Mail className="w-4 h-4" />
                  <span>{item.contact}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoundItems;