"use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhereSection } from "@/components/sections/WhereSection";
import { WhenSection } from "@/components/sections/WhenSection";
import { HostsSection } from "@/components/sections/HostsSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  useEffect(() => {
    // Ensure this runs after the component is fully mounted
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 0);

    // Also handle the beforeunload event
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="content-overlay">
        {/* Hero Section */}
        <HeroSection />

        {/* Where Section */}
        <WhereSection />

        {/* When Section */}
        <WhenSection />

        {/* Hosts Section */}
        <HostsSection />

        {/* Footer Section */}
        <FooterSection />
      </div>
    </div>
  );
}
