import React, { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../components/ui/use-toast";

const AuthPage: React.FC = () => {
  const { login, loginWithGoogle, loginWithTwitter, logout, user, signup, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast({ message: "Logged in successfully!" });
    } catch (error: any) {
      toast({ message: `Login failed: ${error.message}` });
    }
  };

  const handleSignup = async () => {
    try {
      await signup(email, password);
      toast({ message: "Signed up successfully!" });
    } catch (error: any) {
      toast({ message: `Signup failed: ${error.message}` });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{isSignup ? "Sign Up" : "Login"}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <div className="mt-4">
          <p>Welcome, {user.email}</p>
          <button onClick={logout} className="mt-2 p-2 bg-red-500 rounded">
            Logout
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 w-full bg-gray-800 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mt-2 w-full bg-gray-800 rounded"
          />
          {isSignup ? (
            <button onClick={handleSignup} className="mt-2 p-2 bg-blue-500 rounded">
              Sign Up
            </button>
          ) : (
            <button onClick={handleLogin} className="mt-2 p-2 bg-blue-500 rounded">
              Login
            </button>
          )}
          <button onClick={loginWithGoogle} className="mt-2 p-2 bg-green-500 rounded">
            Login with Google
          </button>
          <button onClick={loginWithTwitter} className="mt-2 p-2 bg-blue-400 rounded">
            Login with Twitter
          </button>
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="mt-2 p-2 bg-gray-500 rounded"
          >
            {isSignup ? "Switch to Login" : "Switch to Sign Up"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthPage;