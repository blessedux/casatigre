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
      {/* Sidebar navigation removed */}
    </header>
  );
}; 