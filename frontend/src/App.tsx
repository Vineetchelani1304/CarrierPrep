
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AITools from "./pages/AITools";
import History from "./pages/History";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import QAChat from "./pages/tools/QAChat";
import ResumeAnalyzer from "./pages/tools/ResumeAnalyzer";
import RoadmapGenerator from "./pages/tools/RoadmapGenerator";
import CoverLetterGenerator from "./pages/tools/CoverLetterGenerator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/tools" element={
              <ProtectedRoute>
                <AITools />
              </ProtectedRoute>
            } />
            <Route path="/tools/qa" element={
              <ProtectedRoute>
                <QAChat />
              </ProtectedRoute>
            } />
            <Route path="/tools/resume" element={
              <ProtectedRoute>
                <ResumeAnalyzer />
              </ProtectedRoute>
            } />
            <Route path="/tools/roadmap" element={
              <ProtectedRoute>
                <RoadmapGenerator />
              </ProtectedRoute>
            } />
            <Route path="/tools/cover-letter" element={
              <ProtectedRoute>
                <CoverLetterGenerator />
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } />
            <Route path="/billing" element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
