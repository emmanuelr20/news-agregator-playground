"use client";
import { LoginForm } from "@/components/login-form";
import { useGuest } from "@/hooks/use-guest";
import React from "react";

export default function page() {
  useGuest();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
