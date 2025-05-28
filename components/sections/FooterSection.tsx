"use client";

import Link from "next/link";
import { FadeInSection } from "@/components/FadeInSection";

export const FooterSection = () => {
  return (
    <FadeInSection>
      <div id="footer" className="relative w-full py-8">
        {/* Join Waitlist Button */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <Link
            href="https://lu.ma/62qx28n9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#e67e22] hover:bg-[#d35400] text-white rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            Join Waitlist
          </Link>
        </div>

        {/* Copyright Text */}
        <div className="text-center text-white/60 text-[10px] md:text-xs mt-4">
          © 2025 by{" "}
          <Link
            href="https://github.com/blessedux"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            @blessedux
          </Link>{" "}
          &{" "}
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
