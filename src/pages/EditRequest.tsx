import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  contact: z.string().email("Invalid email address"),
  image: z.string().optional(),
});

const EditRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Lost Blue Notebook",
      description: "A blue spiral notebook with Computer Science notes",
      location: "Library",
      contact: "john.doe@university.edu",
      image: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Here you would typically update the backend
    console.log(values);
    toast({
      title: "Request updated",
      description: "Your request has been updated successfully",
    });
    navigate("/profile");
  };

  const handleDelete = () => {
    // Here you would typically delete from backend
    toast({
      title: "Request deleted",
      description: "Your request has been deleted successfully",
    });
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-amica-lightest p-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => navigate("/profile")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Profile
        </Button>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-playfair">Edit Request</h1>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete Request
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-amica-accent hover:bg-amica-warm">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditRequest;