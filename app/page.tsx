"use client";

import { useRef } from "react";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhereSection } from "@/components/sections/WhereSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const whereRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const scrollToWhere = () => {
    const whereSection = document.getElementById('about');
    if (whereSection) {
      whereSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="content-overlay">
        {/* Header */}
        <Header scrollToWhere={scrollToWhere} scrollToBottom={scrollToBottom} />

        {/* Hero Section */}
        <HeroSection />

        {/* Where Section */}
        <WhereSection />

        {/* Footer Section */}
        <FooterSection />
      </div>
    </div>
  );
}
