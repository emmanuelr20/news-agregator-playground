import React from "react";
import { Button } from "../ui/button";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold">News Aggregator</h1>
      <h2 className="font-medium">Personalized News List</h2>

      <a href="/">
        <Button size="sm" className="mt-2">
          Logout
        </Button>
      </a>

      <div>{children}</div>
    </div>
  );
}
