"use client";
import React from "react";
import MainLayout from "@/components/layout/main-layout";
import NewsList from "@/components/news-list";

export default function page() {
  return (
    <MainLayout>
      <NewsList />
    </MainLayout>
  );
}
