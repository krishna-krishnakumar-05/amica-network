import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const NewBorrowRequest = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    duration: "",
    purpose: "",
    returnDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.itemName.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Implement API call to save borrow request
      toast.success("Borrow request created successfully!");
      navigate("/borrow-items");
    } catch (error: any) {
      console.error('Error creating borrow request:', error);
      toast.error(error?.response?.data?.message || "Failed to create borrow request");
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">New Borrow Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Item Name *</label>
            <Input
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="What do you want to borrow?"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide details about the item you need..."
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <Input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="How long do you need it for?"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Purpose</label>
            <Input
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="What do you need it for?"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Return Date</label>
            <Input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-amica-accent hover:bg-amica-warm"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Request"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/borrow-items")}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBorrowRequest;
