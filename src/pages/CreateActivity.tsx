import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Users, Calendar, MapPin } from "lucide-react";

const CreateActivity = () => {
  // Placeholder data - in a real app this would come from a backend
  const activities = [
    {
      id: 1,
      title: "Study Group - Advanced Physics",
      description: "Looking for study partners for PHY301",
      peopleNeeded: "3-4",
      time: "Weekdays 6-8 PM",
      location: "Science Building",
    },
    // ... more activities would be added here
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
          <Link to="/create-activity/new">
            <Button className="bg-amica-accent hover:bg-amica-warm gap-2">
              <Plus className="w-5 h-5" /> Create Activity
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-playfair mb-8">Activities</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{activity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{activity.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{activity.peopleNeeded} people needed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Calendar className="w-4 h-4" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{activity.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateActivity;