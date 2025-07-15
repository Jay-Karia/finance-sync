"use client";

import Groups from "@/components/groups";
import Hero from "@/components/layouts/hero";

export default function Home() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      {/* Hero Section */}
      <Hero />

      {/* Display all groups */}
      <Groups />
    </div>
  );
}
