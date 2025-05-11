
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Always call useEffect, but conditionally navigate inside
  useEffect(() => {
    const path = isAuthenticated ? "/dashboard" : "/login";
    navigate(path);
  }, [isAuthenticated, navigate]);

  // Always return a component, never conditionally return
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Telecom Insight Nexus</h1>
        <p className="text-slate-500">Loading your experience...</p>
      </div>
    </div>
  );
};

export default Index;
