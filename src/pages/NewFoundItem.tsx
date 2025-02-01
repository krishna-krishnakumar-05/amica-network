import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { foundItemService } from "@/lib/services";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NewFoundItem = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    location: "",
    foundDate: new Date().toISOString().split('T')[0],
    contactInfo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.itemName.trim() || !formData.description.trim() || !formData.location.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields"
      });
      return;
    }

    try {
      setIsLoading(true);
      await foundItemService.createFoundItem({
        itemName: formData.itemName,
        description: formData.description,
        location: formData.location,
        date: formData.foundDate,
        contactInfo: formData.contactInfo,
      });
      toast({
        title: "Success",
        description: "Found item reported successfully!"
      });
      navigate("/found-items");
    } catch (error: any) {
      console.error('Error reporting found item:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message || "Failed to report found item"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="flex items-center mb-6">
        <Link to="/found-items">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Found Items
          </Button>
        </Link>
      </div>

      <div className="bg-card rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-6">Report Found Item</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium mb-1">
              Item Name *
            </label>
            <Input
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Enter item name"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description *
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the item"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Location Found *
            </label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where did you find the item?"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="foundDate" className="block text-sm font-medium mb-1">
              Date Found
            </label>
            <Input
              type="date"
              id="foundDate"
              name="foundDate"
              value={formData.foundDate}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="contactInfo" className="block text-sm font-medium mb-1">
              Contact Information
            </label>
            <Input
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder="How can people contact you?"
              disabled={isLoading}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFoundItem;
