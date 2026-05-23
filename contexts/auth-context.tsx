"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CredentialResponse } from "@react-oauth/google";

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (credentialResponse: CredentialResponse) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("zyphronix_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log("[v0] Error parsing stored user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const token = credentialResponse.credential;
        const decoded = JSON.parse(atob(token.split(".")[1]));

        const userData: User = {
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        };

        setUser(userData);
        localStorage.setItem("zyphronix_user", JSON.stringify(userData));
        console.log("[v0] User signed in:", userData);
      }
    } catch (error) {
      console.log("[v0] Error during sign in:", error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("zyphronix_user");
    console.log("[v0] User signed out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSignedIn: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
