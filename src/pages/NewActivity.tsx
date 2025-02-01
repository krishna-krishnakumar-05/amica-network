import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const NewActivity = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.date || !formData.location.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Implement API call to save activity
      toast.success("Activity created successfully!");
      navigate("/activities");
    } catch (error: any) {
      console.error('Error creating activity:', error);
      toast.error(error?.response?.data?.message || "Failed to create activity");
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
        <h2 className="text-2xl font-bold mb-6">Create New Activity</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What's the activity?"
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
              placeholder="Tell us more about the activity..."
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date *</label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location *</label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where will it take place?"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Maximum Participants</label>
            <Input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              placeholder="Leave empty for no limit"
              min="1"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-amica-accent hover:bg-amica-warm"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Activity"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/activities")}
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

export default NewActivity;
