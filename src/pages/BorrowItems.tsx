import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Calendar, Mail } from "lucide-react";

const BorrowItems = () => {
  // Placeholder data - in a real app this would come from a backend
  const borrowRequests = [
    {
      id: 1,
      title: "Need Scientific Calculator",
      description: "For calculus exam preparation",
      duration: "2 weeks",
      contact: "student@example.com",
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
          <Link to="/borrow-items/new">
            <Button className="bg-amica-accent hover:bg-amica-warm gap-2">
              <Plus className="w-5 h-5" /> Request to Borrow
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-playfair mb-8">Borrow Requests</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {borrowRequests.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{item.duration}</span>
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

export default BorrowItems;