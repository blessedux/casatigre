"use client";

import Link from "next/link";
import { Calendar, Globe, Ticket } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const WhenSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    // Create a more dramatic pattern of background changes
    tl.to(sectionRef.current, { backgroundColor: "rgba(255, 255, 255, 0.05)" })
      .to(sectionRef.current, { backgroundColor: "rgba(255, 255, 255, 0.2)" })
      .to(sectionRef.current, { backgroundColor: "rgba(255, 255, 255, 0.1)" })
      .to(sectionRef.current, { backgroundColor: "rgba(255, 255, 255, 0.3)" })
      .to(sectionRef.current, { backgroundColor: "rgba(255, 255, 255, 0.15)" })
      .to(sectionRef.current, { backgroundColor: "rgba(255, 255, 255, 0.05)" });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="when"
      className="relative w-[100vw] h-screen flex flex-col items-center justify-center bg-white/10 transition-colors duration-300"
    >
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white text-shadow">
          When
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/30"></div>

            {/* Devconnect Event */}
            <div className="relative mb-8 md:mb-12">
              <div className="flex items-center">
                <div className="w-1/2 pr-4 md:pr-8 text-right">
                  <h3 className="text-xl md:text-2xl font-semibold text-white text-shadow">
                    Devconnect
                  </h3>
                  <p className="text-sm md:text-base text-white/80 text-shadow">
                    17-22nd Nov
                  </p>
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
                  <p className="text-sm md:text-base text-white/80 text-shadow">
                    Buenos Aires, Argentina
                  </p>
                </div>
              </div>
            </div>

            {/* ETHGlobal Event */}
            <div className="relative mb-8 md:mb-12">
              <div className="flex items-center">
                <div className="w-1/2 pr-4 md:pr-8 text-right">
                  <h3 className="text-xl md:text-2xl font-semibold text-white text-shadow">
                    ETHGlobal
                  </h3>
                  <p className="text-sm md:text-base text-white/80 text-shadow">
                    21-23rd Nov
                  </p>
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
                  <p className="text-sm md:text-base text-white/80 text-shadow">
                    Buenos Aires, Argentina
                  </p>
                </div>
              </div>
            </div>

            {/* Casa Tigre Event */}
            <div className="relative">
              <div className="flex items-center">
                <div className="w-1/2 pr-4 md:pr-8 text-right">
                  <h3 className="text-xl md:text-2xl font-semibold text-white text-shadow">
                    Casa Tigre
                  </h3>
                  <p className="text-sm md:text-base text-white/80 text-shadow">
                    24-29th Nov
                  </p>
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
                  <p className="text-sm md:text-base text-white/80 text-shadow">
                    Buenos Aires, Argentina
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
