import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, MapPin, Mail, Calendar } from "lucide-react";
import { lostItemsService, LostItem } from "@/lib/lostItems";
import { useToast } from "@/components/ui/use-toast";

const LostItems = () => {
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLostItems = async () => {
    setLoading(true);
    try {
      const items = await lostItemsService.getAllLostItems();
      setLostItems(items);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch lost items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  return (
    <div className="min-h-screen bg-amica-lightest p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Button>
          </Link>
          <Link to="/lost-items/new">
            <Button className="bg-amica-accent hover:bg-amica-warm gap-2">
              <Plus className="w-5 h-5" /> Report Lost Item
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-playfair mb-8">Lost Items</h1>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : lostItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No lost items reported yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lostItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    {item.category && (
                      <div className="text-sm">
                        <span className="px-2 py-1 bg-amica-light rounded-full text-amica-dark">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LostItems;