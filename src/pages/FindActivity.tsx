import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { activityService } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
}

const FindActivity = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const response = await activityService.getAllActivities();
      setActivities(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load activities"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinActivity = async (activityId: string) => {
    try {
      await activityService.joinActivity(activityId);
      toast({
        title: "Success",
        description: "Successfully joined the activity!"
      });
      loadActivities(); // Refresh the list
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to join activity"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Find Activities</h1>
        <Button 
          onClick={() => navigate("/create-activity")}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Create Activity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{activity.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Date:</span> {new Date(activity.date).toLocaleDateString()}
                </p>
                {activity.time && (
                  <p className="text-sm">
                    <span className="font-medium">Time:</span> {activity.time}
                  </p>
                )}
                <p className="text-sm">
                  <span className="font-medium">Location:</span> {activity.location}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Participants:</span>{" "}
                  {activity.currentParticipants} / {activity.maxParticipants}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleJoinActivity(activity.id)}
                disabled={activity.currentParticipants >= activity.maxParticipants}
                className="w-full"
              >
                {activity.currentParticipants >= activity.maxParticipants
                  ? "Activity Full"
                  : "Join Activity"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FindActivity;