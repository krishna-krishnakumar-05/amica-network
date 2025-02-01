import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "./hooks/useAuth";

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
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />

          {/* Dashboard route without authentication check */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-profile"
            element={isAuthenticated ? <EditProfile /> : <Navigate to="/" />}
          />

          {/* Lost & Found routes */}
          <Route
            path="/lost-items"
            element={isAuthenticated ? <LostItems /> : <Navigate to="/" />}
          />
          <Route
            path="/lost-items/new"
            element={isAuthenticated ? <NewLostItem /> : <Navigate to="/" />}
          />
          <Route
            path="/found-items"
            element={isAuthenticated ? <FoundItems /> : <Navigate to="/" />}
          />
          <Route
            path="/found-items/new"
            element={isAuthenticated ? <NewFoundItem /> : <Navigate to="/" />}
          />

          {/* Borrow & Lend routes */}
          <Route
            path="/borrow-items"
            element={isAuthenticated ? <BorrowItems /> : <Navigate to="/" />}
          />
          <Route
            path="/borrow-items/new"
            element={isAuthenticated ? <NewBorrowRequest /> : <Navigate to="/" />}
          />
          <Route
            path="/lend-items"
            element={isAuthenticated ? <LendItems /> : <Navigate to="/" />}
          />
          <Route
            path="/new-lend-item"
            element={isAuthenticated ? <NewLendItem /> : <Navigate to="/" />}
          />

          {/* Activities routes */}
          <Route
            path="/find-activity"
            element={isAuthenticated ? <FindActivity /> : <Navigate to="/" />}
          />
          <Route
            path="/create-activity"
            element={isAuthenticated ? <CreateActivity /> : <Navigate to="/" />}
          />
          <Route
            path="/new-activity"
            element={isAuthenticated ? <NewActivity /> : <Navigate to="/" />}
          />
          <Route
            path="/activities/new"
            element={isAuthenticated ? <NewActivity /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-request/:id"
            element={isAuthenticated ? <EditRequest /> : <Navigate to="/" />}
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