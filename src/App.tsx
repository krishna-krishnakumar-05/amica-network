import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "./hooks/useAuth";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />}
          />
          <Route
            path="/edit-profile"
            element={isAuthenticated ? <EditProfile /> : <Navigate to="/auth" />}
          />

          {/* Lost & Found routes */}
          <Route
            path="/lost-items"
            element={isAuthenticated ? <LostItems /> : <Navigate to="/auth" />}
          />
          <Route
            path="/lost-items/new"
            element={isAuthenticated ? <NewLostItem /> : <Navigate to="/auth" />}
          />
          <Route
            path="/found-items"
            element={isAuthenticated ? <FoundItems /> : <Navigate to="/auth" />}
          />
          <Route
            path="/found-items/new"
            element={isAuthenticated ? <NewFoundItem /> : <Navigate to="/auth" />}
          />

          {/* Borrow & Lend routes */}
          <Route
            path="/borrow-items"
            element={isAuthenticated ? <BorrowItems /> : <Navigate to="/auth" />}
          />
          <Route
            path="/borrow-items/new"
            element={isAuthenticated ? <NewBorrowRequest /> : <Navigate to="/auth" />}
          />
          <Route
            path="/lend-items"
            element={isAuthenticated ? <LendItems /> : <Navigate to="/auth" />}
          />
          <Route
            path="/new-lend-item"
            element={isAuthenticated ? <NewLendItem /> : <Navigate to="/auth" />}
          />

          {/* Activities routes */}
          <Route
            path="/find-activity"
            element={isAuthenticated ? <FindActivity /> : <Navigate to="/auth" />}
          />
          <Route
            path="/create-activity"
            element={isAuthenticated ? <CreateActivity /> : <Navigate to="/auth" />}
          />
          <Route
            path="/new-activity"
            element={isAuthenticated ? <NewActivity /> : <Navigate to="/auth" />}
          />
          <Route
            path="/activities/new"
            element={isAuthenticated ? <NewActivity /> : <Navigate to="/auth" />}
          />
          <Route
            path="/edit-request/:id"
            element={isAuthenticated ? <EditRequest /> : <Navigate to="/auth" />}
          />

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;