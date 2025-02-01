import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const NewLendItem = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    condition: "",
    availability: "",
    terms: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.itemName.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Implement API call to save lend item
      toast.success("Item listed for lending successfully!");
      navigate("/lend-items");
    } catch (error: any) {
      console.error('Error listing item for lending:', error);
      toast.error(error?.response?.data?.message || "Failed to list item for lending");
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
        <h2 className="text-2xl font-bold mb-6">List Item for Lending</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Item Name *</label>
            <Input
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="What do you want to lend?"
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
              placeholder="Provide details about the item..."
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Condition</label>
            <Input
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              placeholder="What's the condition of the item?"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Availability</label>
            <Input
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="When is it available?"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Terms and Conditions</label>
            <Textarea
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              placeholder="Any specific terms for borrowing?"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-amica-accent hover:bg-amica-warm"
              disabled={isLoading}
            >
              {isLoading ? "Listing..." : "List Item"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/lend-items")}
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

export default NewLendItem;
