"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

import { AnimatedBackground } from "@/components/AnimatedBackground";

export const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial opacity to 1 for title and subtitle
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 1 });
    }
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 1 });
    }
    if (scrollDownRef.current) {
      gsap.set(scrollDownRef.current, { opacity: 1 });
    }
    if (backgroundRef.current) {
      gsap.set(backgroundRef.current, {
        opacity: 1
      });
    }

    // Original scroll trigger for title fade in/out
    const titleTrigger = ScrollTrigger.create({
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        if (titleRef.current && subtitleRef.current && scrollDownRef.current && backgroundRef.current) {
          let titleOpacity = 0;
          let subtitleOpacity = 0;
          let scrollDownOpacity = 1;
          let backgroundOpacity = 1;
          let backgroundColor = 'rgba(0, 0, 0, 0)';

          scrollDownOpacity = self.progress === 0 ? 1 : 0;

          if (self.progress === 0) {
            titleOpacity = 1;
            subtitleOpacity = 1;
            backgroundOpacity = 1;
            backgroundColor = 'rgba(0, 0, 0, 0)';
          } else if (self.progress >= 0.9) {
            const fadeOutProgress = (self.progress - 0.9) / 0.1;
            titleOpacity = Math.max(0, 1 - fadeOutProgress);
            subtitleOpacity = Math.max(0, 1 - fadeOutProgress);
            backgroundOpacity = 1;
            backgroundColor = `rgba(34, 139, 34, ${fadeOutProgress * 0.3})`;
          } else {
            titleOpacity = 1;
            subtitleOpacity = 1;
            backgroundOpacity = 1;
            backgroundColor = 'rgba(0, 0, 0, 0)';
          }

          if (self.progress > 1) {
            backgroundOpacity = 1;
            backgroundColor = 'rgba(34, 139, 34, 0.3)';
          }

          gsap.to(titleRef.current, {
            opacity: titleOpacity,
            duration: 0.3,
            overwrite: true
          });

          gsap.to(subtitleRef.current, {
            opacity: subtitleOpacity,
            duration: 0.3,
            ease: "none",
            overwrite: true
          });

          gsap.to(scrollDownRef.current, {
            opacity: scrollDownOpacity,
            duration: 0.1,
            ease: "none",
            overwrite: true
          });

          gsap.to(backgroundRef.current, {
            opacity: backgroundOpacity,
            backgroundColor: backgroundColor,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true
          });
        }
      }
    });

    return () => {
      titleTrigger.kill();
    };
  }, []);

  return (
    <section className="hero-section relative w-[100vw] md:w-[100vw] -ml-[0vw] md:-ml-[0vw]">
      <div ref={backgroundRef} className="fixed inset-0 z-0 w-screen h-screen">
        <AnimatedBackground />
      </div>
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
  );
}; 