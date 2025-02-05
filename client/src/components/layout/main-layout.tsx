"use client";
import React, { createContext } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";

const context: {
  token?: string;
  user?: unknown;
} = {};

export const AuthContext = createContext(context);

export default function MainLayout({ children }: React.PropsWithChildren) {
  const { token, user, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ token, user }}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold">News Aggregator</h1>
        <h2 className="font-medium">Personalized News List</h2>

        <Button size="sm" className="mt-2" onClick={logout}>
          Logout
        </Button>

        <div>{children}</div>
      </div>
    </AuthContext.Provider>
  );
}
