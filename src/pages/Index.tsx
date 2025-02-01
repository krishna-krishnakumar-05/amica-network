import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-amica-lightest">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-foreground">Amica</h1>
          <p className="text-2xl text-muted-foreground mb-8">Your Friend in Need</p>
          <Link to="/auth">
            <Button className="btn-primary">Get Started</Button>
          </Link>
        </div>

        {/* About Section */}
        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
          <div className="bg-white rounded-lg p-8 shadow-md">
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
              Amica is your campus community hub, designed to bring students together through sharing,
              helping, and connecting. Whether you've lost something, need to borrow an item, or are
              looking for study partners, Amica is here to help make campus life easier and more
              collaborative.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-bold mb-2">Community Manager</h3>
                <p>Sarah Johnson</p>
                <p>sarah@amica.edu</p>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2">Technical Support</h3>
                <p>David Chen</p>
                <p>support@amica.edu</p>
                <p>+1 (555) 234-5678</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2">Student Relations</h3>
                <p>Maria Garcia</p>
                <p>students@amica.edu</p>
                <p>+1 (555) 345-6789</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;