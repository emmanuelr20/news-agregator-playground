"use client";
import { SignUpForm } from "@/components/signup-form";
import { useGuest } from "@/hooks/use-guest";
import React from "react";

export default function page() {
  useGuest();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
