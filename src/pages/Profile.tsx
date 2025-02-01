import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Edit, Trash2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = () => {
    // Here you would typically clear auth state
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    navigate("/");
  };

  const handleDeleteRequest = (id: number) => {
    // Here you would typically delete from backend
    toast({
      title: "Request deleted",
      description: "Your request has been deleted successfully",
    });
  };

  return (
    <div className="min-h-screen bg-amica-lightest">
      <div className="container mx-auto px-4 py-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 mb-8 text-amica-accent hover:text-amica-warm transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-amica-light rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold">JD</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">John Doe</h1>
            <p className="text-muted-foreground">Computer Science Department</p>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => navigate("/edit-profile")}
              className="bg-amica-accent hover:bg-amica-warm gap-2"
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </Button>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amica-accent" />
                <span>john.doe@university.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amica-accent" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Listings */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Listings</h2>
            <div className="space-y-4">
              {/* Lost Item Example */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">Lost: Blue Notebook</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate("/edit-request/1")}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRequest(1)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
                </CardContent>
              </Card>

              {/* Lending Item Example */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">Lending: Scientific Calculator</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate("/edit-request/2")}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRequest(2)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Posted 1 week ago</p>
                </CardContent>
              </Card>

              {/* Activity Example */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">Activity: Study Group</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate("/edit-request/3")}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRequest(3)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Posted 3 days ago</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;