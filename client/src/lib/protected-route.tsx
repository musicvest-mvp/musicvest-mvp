tsx
import React from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "wouter";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
};