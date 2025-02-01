import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { lostItemsService } from "@/lib/lostItems";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  contact: z.string().email("Invalid email address"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  date: z.string().min(1, "Date is required"),
  image: z.string().optional(),
});

const NewLostItem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      contact: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await lostItemsService.createLostItem({
        title: values.title,
        description: values.description,
        location: values.location,
        date: values.date,
        category: values.category,
        image: values.image,
      });
      
      toast({
        title: "Item reported as lost",
        description: "Your lost item has been reported successfully",
      });
      navigate("/lost-items");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to report lost item",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-amica-lightest p-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => navigate("/lost-items")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <h1 className="text-3xl font-playfair mb-8">Report Lost Item</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Lost item name" {...field} />
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
                    <Textarea
                      placeholder="Describe the lost item"
                      {...field}
                    />
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
                  <FormLabel>Last Seen Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Where did you last see it?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Item category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Lost</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
                    <Input
                      type="email"
                      placeholder="Your contact email"
                      {...field}
                    />
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
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="URL of the item's image"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Report Lost Item
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewLostItem;