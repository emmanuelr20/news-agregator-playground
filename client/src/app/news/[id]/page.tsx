"use client";
import MainLayout from "@/components/layout/main-layout";
import NewsDetails from "@/components/news-details";
import React from "react";

interface Props {
  params: { id: string };
}

export default function page({ params: { id } }: Props) {
  return (
    <MainLayout>
      <NewsDetails id={id} />
    </MainLayout>
  );
}
