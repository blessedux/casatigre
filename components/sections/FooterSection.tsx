"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeInSection } from "@/components/FadeInSection";
import { WhenSection } from "./WhenSection";
import { HostsSection } from "./HostsSection";

export const FooterSection = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <FadeInSection>
      <div ref={footerRef} className="relative h-[220vh] md:h-[240vh] w-[100vw] md:w-[100vw] -ml-[0vw] md:-ml-[0vw] mt-[5vh] md:mt-[40vh]">
        <div className="absolute inset-0">
          <Image
            src="/casatigrebackground1.png"
            alt="Casa Tigre Background"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* When Section */}
        <WhenSection />

        {/* Hosts Section */}
        <HostsSection />

        {/* Join Waitlist Button */}
        <div className="relative z-10 w-full flex flex-col items-center pb-8 md:pb-4 mt-[300px] md:mt-[500px]">
          <Link
            href="https://lu.ma/62qx28n9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#e67e22] hover:bg-[#d35400] text-white rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl mb-16 md:mb-8"
          >
            Join Waitlist
          </Link>
        </div>

        {/* Copyright Text */}
        <div className="absolute bottom-[5px] left-1/2 transform -translate-x-1/2 text-white/60 text-[10px] md:text-xs z-10 whitespace-nowrap">
          © 2025 by{" "}
          <Link
            href="https://github.com/blessedux"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            @blessedux
          </Link>
          {" "}&{" "}
          <Link
            href="https://github.com/deca12x"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            @deca12x
          </Link>
        </div>
      </div>
    </FadeInSection>
  );
}; 