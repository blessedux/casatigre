"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  MapPin,
  Calendar,
  Users,
  Info,
  Package,
  Ticket,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FadeInSection } from "@/components/FadeInSection";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial opacity to 0
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0 });
    }
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0 });
    }
    if (scrollDownRef.current) {
      gsap.set(scrollDownRef.current, { opacity: 1 });
    }
    if (backgroundRef.current) {
      gsap.set(backgroundRef.current, { 
        opacity: 1,
        filter: 'blur(0px)'
      });
    }

    // Create scroll trigger for title fade in/out
    ScrollTrigger.create({
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        if (titleRef.current && subtitleRef.current && scrollDownRef.current && backgroundRef.current) {
          // Fade in during first 30% of scroll
          let titleOpacity = 0;
          let subtitleOpacity = 0;
          let scrollDownOpacity = 1;
          let backgroundOpacity = 1;
          let backgroundBlur = 0;
          
          // Handle scroll down button visibility - only visible at the very top
          scrollDownOpacity = self.progress === 0 ? 1 : 0;
          
          if (self.progress <= 0.3) {
            // Initial fade in
            titleOpacity = self.progress / 0.3;
            subtitleOpacity = Math.max(0, (self.progress - 0.15) / 0.3);
          } else if (self.progress >= 0.9) {
            // Fade out in the last 10% of scroll
            const fadeOutProgress = (self.progress - 0.9) / 0.1;
            titleOpacity = 1 - fadeOutProgress;
            subtitleOpacity = 1 - fadeOutProgress;
            // Start fading and blurring background in the last 10% of scroll
            backgroundOpacity = 1 - fadeOutProgress;
            backgroundBlur = fadeOutProgress * 30; // Max blur of 30px
          } else {
            // Keep fully visible between 30% and 90%
            titleOpacity = 1;
            subtitleOpacity = 1;
          }
          
          gsap.to(titleRef.current, {
            opacity: titleOpacity,
            duration: 0.3,
          });
          
          gsap.to(subtitleRef.current, {
            opacity: subtitleOpacity,
            duration: 0.3,
            ease: "none"
          });

          gsap.to(scrollDownRef.current, {
            opacity: scrollDownOpacity,
            duration: 0.1,
            ease: "none"
          });

          gsap.to(backgroundRef.current, {
            opacity: backgroundOpacity,
            filter: `blur(${backgroundBlur}px)`,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Animated Background with frame sequence */}
      <div ref={backgroundRef} className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Header - Vertical Glassmorphism Sidebar with Icons - now on the right */}
      <header className="fixed top-1/2 -translate-y-1/2 right-6 z-50 p-2">
        <div className="flex flex-col h-[35vh] w-[60px] bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-3 shadow-lg">
          <nav className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-4">
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
                href="#about"
                className="p-1.5 rounded-full hover:bg-white/30 transition-colors group relative"
                aria-label="Where"
              >
                <MapPin className="h-5 w-5 text-white" />
                <span className="absolute right-full mr-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Where
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
            <Link
              href="https://lu.ma/62qx28n9"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#e67e22] hover:bg-[#d35400] text-white rounded-full flex items-center justify-center group relative transition-colors"
              aria-label="Join Waitlist"
            >
              <BookOpen className="h-5 w-5" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Join Waitlist
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <div className="content-overlay">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container relative z-10 px-4 md:px-6 text-white">
            <div className="max-w-3xl">
              <h1 ref={titleRef} className="casa-tigre-title">
                CASA TIGRE
              </h1>
              <p ref={subtitleRef} className="casa-tigre-subtitle">
                Tropical paradise 1 hour from Buenos Aires
              </p>
            </div>
          </div>
          <div ref={scrollDownRef} className="fixed bottom-16 w-full flex flex-col items-center justify-center gap-8 z-10">
            <Link
              href="#about"
              className="flex flex-col items-center gap-2 text-white animate-bounce"
            >
              <span className="text-sm font-medium text-shadow">
                Scroll Down
              </span>
              <ChevronDown className="h-6 w-6" />
            </Link>
          </div>
        </section>

        {/* When Section */}
        <FadeInSection>
          <section id="included" className="relative py-24 my-8 mx-4 md:mx-8">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white text-shadow">
                When
              </h2>
              <div className="flex flex-col items-center">
                <p className="text-lg text-white text-shadow mb-4">
                  17-22nd Nov - Devconnect
                </p>
                <p className="text-lg text-white text-shadow mb-4">
                  21-23rd Nov - ETHGlobal
                </p>
                <p className="text-lg text-white text-shadow mb-4">
                  24-29th Nov - Casa Tigre
                </p>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Where Section */}
        <FadeInSection>
          <section id="about" className="relative py-24 my-8 mx-4 md:mx-8">
            <div className="container px-4 md:px-6">
              <div className="flex justify-center">
                <div className="max-w-2xl">
                  <div className="mb-6 rounded-xl overflow-hidden shadow-lg relative">
                    <Image
                      src="/delta_ghibli.png"
                      alt="Paraná Delta"
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6">
                      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white text-shadow">
                        Where
                      </h2>
                      <p className="text-lg text-white leading-relaxed text-shadow text-center max-w-md">
                        Riverside mansion hidden in the lush Paraná Delta
                        islands
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Visual Break */}
        {/* <FadeInSection>
          <section className="relative h-[400px] z-10">
            <div className="relative h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl mx-4 md:mx-8" />
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center max-w-3xl z-10 relative text-shadow">
                Come reset. Come inspired. Come build.
              </h2>
            </div>
          </section>
        </FadeInSection> */}

        {/* Schedule Section (Small) */}
        {/* <FadeInSection>
          <section
            id="schedule"
            className="relative py-24 transparent-section my-8 mx-4 md:mx-8"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white text-shadow">
                📆 Schedule at a Glance
              </h2>
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-3 text-white text-shadow">
                    Day 1
                  </h3>
                  <h4 className="font-medium text-lg mb-2 text-white text-shadow">
                    ARRIVAL & FLOW
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        15:00
                      </span>
                      <span className="text-white text-shadow">
                        Arrival by boat
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        19:00
                      </span>
                      <span className="text-white text-shadow">BBQ night</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        21:00
                      </span>
                      <span className="text-white text-shadow">
                        Firepit + marshmallows
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-3 text-white text-shadow">
                    Day 2
                  </h3>
                  <h4 className="font-medium text-lg mb-2 text-white text-shadow">
                    BODY & MIND
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        08:00
                      </span>
                      <span className="text-white text-shadow">
                        Yoga on the deck
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        12:00
                      </span>
                      <span className="text-white text-shadow">
                        Cowork & connect
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        19:00
                      </span>
                      <span className="text-white text-shadow">
                        Dinner & chill
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-3 text-white text-shadow">
                    Day 3
                  </h3>
                  <h4 className="font-medium text-lg mb-2 text-white text-shadow">
                    PLAY & BUILD
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        10:00
                      </span>
                      <span className="text-white text-shadow">
                        Jetski & canoe
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        14:00
                      </span>
                      <span className="text-white text-shadow">Open mic</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        17:00
                      </span>
                      <span className="text-white text-shadow">
                        Sunset asado
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-3 text-white text-shadow">
                    Day 4
                  </h3>
                  <h4 className="font-medium text-lg mb-2 text-white text-shadow">
                    WIND DOWN
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        08:00
                      </span>
                      <span className="text-white text-shadow">
                        Light yoga & breakfast
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        11:00
                      </span>
                      <span className="text-white text-shadow">
                        Reflections & goodbyes
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">
                        12:00
                      </span>
                      <span className="text-white text-shadow">
                        Checkout by boat
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection> */}

        {/* Hosts */}
        <FadeInSection>
          <section id="hosts" className="relative py-24 my-8 mx-4 md:mx-8">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white text-shadow">
                Hosts
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex justify-center items-center">
                  <Button
                    variant="outline"
                    className="rounded-full p-0 w-16 h-16 overflow-hidden border-white hover:border-white/70"
                    asChild
                  >
                    <Link
                      href="https://x.com/blessed_ux"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/bless.jpg"
                        alt="Blessedux"
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </Link>
                  </Button>
                </div>
                <div className="flex justify-center items-center">
                  <Button
                    variant="outline"
                    className="rounded-full p-0 w-16 h-16 overflow-hidden border-white hover:border-white/70"
                    asChild
                  >
                    <Link
                      href="https://x.com/deca12x"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/deca.jpeg"
                        alt="Deca"
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </Link>
                  </Button>
                </div>
                <div className="flex justify-center items-center">
                  <Button
                    variant="outline"
                    className="rounded-full p-0 w-16 h-16 overflow-hidden border-white hover:border-white/70"
                    asChild
                  >
                    <Link
                      href="https://x.com/_SDAV"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/sol.jpg"
                        alt="Solene"
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Final CTA */}
        <FadeInSection>
          <section id="booking" className="relative py-24 my-8 mx-4 md:mx-8">
            <div className="container px-4 md:px-6 text-center">
              <Button
                className="bg-[#e67e22] hover:bg-[#d35400] text-white text-lg px-8 py-6"
                asChild
              >
                <Link
                  href="https://lu.ma/62qx28n9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Waitlist
                </Link>
              </Button>
            </div>
          </section>
        </FadeInSection>

        {/* Tall Footer Cover */}
        <div className="relative h-[150vh] bg-black z-30">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="absolute inset-0">
              <Image
                src="/casatigrebackground1.png"
                alt="Casa Tigre Background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <p className="text-white text-2xl relative z-10">End of Content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
