import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import LendItems from "./pages/LendItems";
import BorrowItems from "./pages/BorrowItems";
import CreateActivity from "./pages/CreateActivity";
import FindActivity from "./pages/FindActivity";
import NewLostItem from "./pages/NewLostItem";
import EditRequest from "./pages/EditRequest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/lost-items" element={<LostItems />} />
          <Route path="/lost-items/new" element={<NewLostItem />} />
          <Route path="/found-items" element={<FoundItems />} />
          <Route path="/lend-items" element={<LendItems />} />
          <Route path="/borrow-items" element={<BorrowItems />} />
          <Route path="/create-activity" element={<CreateActivity />} />
          <Route path="/find-activity" element={<FindActivity />} />
          <Route path="/edit-request/:id" element={<EditRequest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;