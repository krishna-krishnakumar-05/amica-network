import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Calendar, DollarSign, Mail } from "lucide-react";

const LendItems = () => {
  // Placeholder data - in a real app this would come from a backend
  const lendItems = [
    {
      id: 1,
      title: "Camera Equipment",
      description: "DSLR Camera with lens kit",
      duration: "1 week",
      price: "$50/day",
      contact: "photographer@example.com",
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
          <Link to="/lend-items/new">
            <Button className="bg-amica-accent hover:bg-amica-warm gap-2">
              <Plus className="w-5 h-5" /> Lend an Item
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-playfair mb-8">Items Available for Lending</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lendItems.map((item) => (
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
                  <DollarSign className="w-4 h-4" />
                  <span>{item.price}</span>
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

export default LendItems;