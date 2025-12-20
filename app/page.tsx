import React from "react";
import Link from "next/link";
import HomePage from "@/components/landingpage/Home";

const LandingPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white py-1 md:py-5 px-6">
      <HomePage />
    </main>
  );
};

export default LandingPage;
