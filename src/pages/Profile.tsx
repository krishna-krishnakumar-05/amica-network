import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-amica-lightest">
      <div className="container mx-auto px-4 py-8">
        <Link to="/dashboard" className="nav-link flex items-center gap-2 mb-8">
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
              <div className="p-4 bg-amica-neutral rounded-lg">
                <h3 className="font-semibold mb-2">Lost: Blue Notebook</h3>
                <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
              </div>
              <div className="p-4 bg-amica-neutral rounded-lg">
                <h3 className="font-semibold mb-2">Lending: Scientific Calculator</h3>
                <p className="text-sm text-muted-foreground">Posted 1 week ago</p>
              </div>
              <div className="p-4 bg-amica-neutral rounded-lg">
                <h3 className="font-semibold mb-2">Activity: Study Group</h3>
                <p className="text-sm text-muted-foreground">Posted 3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;