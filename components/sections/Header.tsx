"use client";

import Link from "next/link";
import { MapPin, Calendar, Users, BookOpen } from "lucide-react";

interface HeaderProps {
  scrollToWhere: () => void;
  scrollToBottom: () => void;
}

export const Header = ({ scrollToWhere, scrollToBottom }: HeaderProps) => {
  return (
    <header className="fixed top-1/2 -translate-y-1/2 right-6 z-50 p-2">
      <div className="flex flex-col h-[35vh] w-[60px] bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-3 shadow-lg">
        <nav className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <button
              onClick={scrollToWhere}
              className="p-1.5 rounded-full hover:bg-white/30 transition-colors group relative"
              aria-label="Where"
            >
              <MapPin className="h-5 w-5 text-white" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Where is it?
              </span>
            </button>
            <Link
              href="#included"
              className="p-1.5 rounded-full hover:bg-white/30 transition-colors group relative"
              aria-label="When"
            >
              <Calendar className="h-5 w-5 text-white" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                When
              </span>
            </Link>
            <Link
              href="#hosts"
              className="p-1.5 rounded-full hover:bg-white/30 transition-colors group relative"
              aria-label="Hosts"
            >
              <Users className="h-5 w-5 text-white" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Hosts
              </span>
            </Link>
          </div>
          <div className="mt-4">
            <button
              onClick={scrollToBottom}
              className="p-2.5 bg-[#e67e22] hover:bg-[#d35400] text-white rounded-full flex items-center justify-center group relative transition-colors"
              aria-label="Join Waitlist"
            >
              <BookOpen className="h-5 w-5" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Join Waitlist
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}; 