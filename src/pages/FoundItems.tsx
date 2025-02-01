import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, MapPin, Mail, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { foundItemService } from "@/lib/services";
import { toast } from "@/components/ui/use-toast";

interface FoundItem {
  id: string;
  itemName: string;
  description: string;
  location: string;
  date: string;
  contactInfo?: string;
}

const FoundItems = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFoundItems();
  }, []);

  const fetchFoundItems = async () => {
    try {
      const items = await foundItemService.getAllFoundItems();
      setFoundItems(items);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch found items"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = foundItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <Link to="/dashboard">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </Link>
        <Link to="/found-items/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Report Found Item
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Found Items</h1>
        <Input
          type="text"
          placeholder="Search found items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading found items...</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchQuery ? "No items match your search" : "No found items reported yet"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{item.itemName}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                {item.contactInfo && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{item.contactInfo}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItems;