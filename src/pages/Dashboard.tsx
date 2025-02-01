import { Link } from "react-router-dom";
import { UserCircle, Search, HandHelping, Users, ArrowUpRight } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-amica-lightest">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Amica</h1>
          <Link to="/profile">
            <UserCircle className="w-8 h-8 text-amica-accent hover:text-amica-light transition-colors" />
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Lost and Found Section */}
        <section className="dashboard-section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Search className="w-6 h-6" />
              Lost and Found
            </h2>
            <ArrowUpRight className="w-5 h-5 text-amica-accent" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/lost-items" className="dashboard-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-amica-accent transition-colors">Lost Items</h3>
              <p className="text-muted-foreground">List items you've lost on campus</p>
            </Link>
            <Link to="/found-items" className="dashboard-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-amica-accent transition-colors">Found Items</h3>
              <p className="text-muted-foreground">Report items you've found</p>
            </Link>
          </div>
        </section>

        {/* Lend and Borrow Section */}
        <section className="dashboard-section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <HandHelping className="w-6 h-6" />
              Lend and Borrow
            </h2>
            <ArrowUpRight className="w-5 h-5 text-amica-accent" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/lend-items" className="dashboard-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-amica-accent transition-colors">Lend Items</h3>
              <p className="text-muted-foreground">Share items with your community</p>
            </Link>
            <Link to="/borrow-items" className="dashboard-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-amica-accent transition-colors">Borrow Items</h3>
              <p className="text-muted-foreground">Find items you need</p>
            </Link>
          </div>
        </section>

        {/* Companion Finder Section */}
        <section className="dashboard-section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6" />
              Companion Finder
            </h2>
            <ArrowUpRight className="w-5 h-5 text-amica-accent" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/create-activity" className="dashboard-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-amica-accent transition-colors">Create Activity</h3>
              <p className="text-muted-foreground">Start a new group activity</p>
            </Link>
            <Link to="/find-activity" className="dashboard-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-amica-accent transition-colors">Find Activity</h3>
              <p className="text-muted-foreground">Join existing activities</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;