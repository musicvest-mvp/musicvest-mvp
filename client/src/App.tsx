import React from "react";
import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./lib/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import { Toaster, ToastProvider as CustomToastProvider } from "./components/ui"; // Import Toaster and ToastProvider
import { HomePage } from "./pages/home-page";
import { AuthPage } from "./pages/auth-page";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CustomToastProvider>
          <Switch>
            <Route path="/login">
              <AuthPage />
            </Route>
            <Route path="/">
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            </Route>
          </Switch>
          <Toaster />
        </CustomToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

