import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Calendar, Mail } from "lucide-react";

const BorrowItems = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [borrowRequests] = useState([
    {
      id: 1,
      title: "Need Scientific Calculator",
      description: "For calculus exam preparation",
      duration: "2 weeks",
      contact: "student@example.com",
    },
    // ... more items would be added here
  ]);

  const filteredRequests = borrowRequests.filter((request) =>
    request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow flex flex-col">
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
              <CardFooter className="mt-auto">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/edit-request/${item.id}`)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500">No borrow requests found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowItems;