
import React, { createContext, useContext, useState } from "react";

type User = { name: string };

type AuthContextType = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {

    const saved = localStorage.getItem("app-user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (name: string) => {
    const newUser = { name };
    setUser(newUser);
    localStorage.setItem("app-user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("app-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}