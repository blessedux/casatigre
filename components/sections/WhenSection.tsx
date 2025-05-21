"use client";

import Link from "next/link";
import { Calendar, Globe, Ticket } from "lucide-react";

export const WhenSection = () => {
  return (
    <section id="included" className="relative z-10 py-8 md:py-12 mx-4 md:mx-8 mt-24 md:mt-[12%]">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-white text-shadow">
          When
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/30"></div>
            
            {/* Devconnect Event */}
            <div className="relative mb-6 md:mb-8">
              <div className="flex items-center">
                <div className="w-1/2 pr-4 md:pr-8 text-right">
                  <h3 className="text-xl font-semibold text-white text-shadow">Devconnect</h3>
                  <p className="text-white/80 text-shadow">17-22nd Nov</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <Link
                    href="https://devconnect.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-[#e67e22] hover:border-[#e67e22] transition-all duration-300 group"
                  >
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
                <div className="w-1/2 pl-4 md:pl-8">
                  <p className="text-white/80 text-shadow">Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>

            {/* ETHGlobal Event */}
            <div className="relative mb-6 md:mb-8">
              <div className="flex items-center">
                <div className="w-1/2 pr-4 md:pr-8 text-right">
                  <h3 className="text-xl font-semibold text-white text-shadow">ETHGlobal</h3>
                  <p className="text-white/80 text-shadow">21-23rd Nov</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <Link
                    href="https://ethglobal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-[#e67e22] hover:border-[#e67e22] transition-all duration-300 group"
                  >
                    <Globe className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
                <div className="w-1/2 pl-4 md:pl-8">
                  <p className="text-white/80 text-shadow">Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>

            {/* Casa Tigre Event */}
            <div className="relative">
              <div className="flex items-center">
                <div className="w-1/2 pr-4 md:pr-8 text-right">
                  <h3 className="text-xl font-semibold text-white text-shadow">Casa Tigre</h3>
                  <p className="text-white/80 text-shadow">24-29th Nov</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <Link
                    href="https://lu.ma/62qx28n9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-[#e67e22] hover:border-[#e67e22] transition-all duration-300 group"
                  >
                    <Ticket className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
                <div className="w-1/2 pl-4 md:pl-8">
                  <p className="text-white/80 text-shadow">Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 