import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/useAuth';

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import LostItems from "./pages/LostItems";
import NewLostItem from "./pages/NewLostItem";
import FoundItems from "./pages/FoundItems";
import NewFoundItem from "./pages/NewFoundItem";
import LendItems from "./pages/LendItems";
import NewLendItem from "./pages/NewLendItem";
import BorrowItems from "./pages/BorrowItems";
import NewBorrowRequest from "./pages/NewBorrowRequest";
import FindActivity from "./pages/FindActivity";
import NewActivity from "./pages/NewActivity";
import CreateActivity from "./pages/CreateActivity";
import EditRequest from "./pages/EditRequest";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />

          {/* Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Lost & Found routes */}
          <Route path="/lost-items" element={<LostItems />} />
          <Route path="/lost-items/new" element={<NewLostItem />} />
          <Route path="/found-items" element={<FoundItems />} />
          <Route path="/found-items/new" element={<NewFoundItem />} />

          {/* Other routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/lend-items" element={<LendItems />} />
          <Route path="/new-lend-item" element={<NewLendItem />} />
          <Route path="/borrow-items" element={<BorrowItems />} />
          <Route path="/new-borrow-request" element={<NewBorrowRequest />} />
          <Route path="/find-activity" element={<FindActivity />} />
          <Route path="/new-activity" element={<NewActivity />} />
          <Route path="/create-activity" element={<CreateActivity />} />
          <Route path="/edit-request" element={<EditRequest />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
};

export default App;