
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "@/types";
import { mockUsers } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Simple mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would call an API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        );

        if (foundUser && password === "password") { // Mock password check
          setUser(foundUser);
          setIsAuthenticated(true);
          toast({
            title: "Login successful",
            description: `Welcome back, ${foundUser.name}!`,
          });
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Role-based permission check
  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    
    const roleHierarchy: Record<UserRole, number> = {
      admin: 3,
      auditor: 2,
      viewer: 1,
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        hasPermission,
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
