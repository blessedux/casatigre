"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeInSection } from "@/components/FadeInSection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const WhereSection = () => {
  const whereSectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial height and width
    if (galleryRef.current) {
      const isDesktop = window.innerWidth >= 768;
      gsap.set(galleryRef.current, {
        height: "20vh",
        width: isDesktop ? "60%" : "100%",
        scale: 0.25,
        x: isDesktop ? "50%" : "0%",
        xPercent: isDesktop ? -50 : 0
      });
    }

    // Create scroll trigger for gallery images
    const galleryImages = document.querySelectorAll('.gallery-image');
    const totalImages = galleryImages.length;
    
    const galleryTrigger = ScrollTrigger.create({
      trigger: whereSectionRef.current,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 0.1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Calculate which images to show based on scroll progress
        // Multiply by 2 to ensure we go through all images twice during the scroll
        const imageProgress = progress * 2 * (totalImages - 1);
        const cycle = Math.floor(imageProgress / (totalImages - 1));
        const currentIndex = Math.floor(imageProgress) % (totalImages - 1);
        const nextIndex = (currentIndex + 1) % (totalImages - 1);
        const localProgress = imageProgress % 1;

        // Hide all images first
        galleryImages.forEach((img) => {
          gsap.set(img, { opacity: 0 });
        });

        // Show only current and next image
        const currentImage = galleryImages[currentIndex] as HTMLElement;
        const nextImage = galleryImages[nextIndex] as HTMLElement;

        if (currentImage) {
          gsap.set(currentImage, { opacity: 1 - localProgress });
        }

        if (nextImage) {
          gsap.set(nextImage, { opacity: localProgress });
        }
      }
    });

    // Create scroll trigger for gallery scaling and height
    const galleryScaleTrigger = ScrollTrigger.create({
      trigger: whereSectionRef.current,
      start: "top bottom",
      end: "center center",
      scrub: 0.5,
      onUpdate: (self) => {
        if (galleryRef.current) {
          const progress = self.progress;
          const isDesktop = window.innerWidth >= 768;
          const targetHeight = isDesktop ? "100vh" : "70vh";
          const targetWidth = isDesktop ? "80%" : "100%";
          const targetScale = isDesktop ? 0.25 + (progress * 0.75) : 0.5 + (progress * 0.5);
          
          gsap.to(galleryRef.current, {
            scale: targetScale,
            height: targetHeight,
            width: targetWidth,
            marginBottom: isDesktop ? `${progress * 80}vh` : `${progress * 10}vh`,
            duration: 0.1,
            ease: "none",
            overwrite: true,
            transformOrigin: isDesktop ? "center center" : "center top"
          });
        }
      }
    });

    // Create scroll trigger for Where section scaling and sliding
    const whereTrigger = ScrollTrigger.create({
      trigger: whereSectionRef.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 0.5,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (whereSectionRef.current) {
          const progress = self.progress;
          const isDesktop = window.innerWidth >= 768;
          
          if (progress <= 0.5) {
            const slideProgress = progress * 2;
            gsap.to(whereSectionRef.current, {
              y: isDesktop ? 100 - (slideProgress * 100) : 50 - (slideProgress * 50),
              scale: isDesktop ? 0.25 + (slideProgress * 0.75) : 0.5 + (slideProgress * 0.5),
              duration: 0.1,
              ease: "none",
              overwrite: true,
              transformOrigin: isDesktop ? "center center" : "center top"
            });
          } else {
            const scaleProgress = (progress - 0.5) * 2;
            gsap.to(whereSectionRef.current, {
              y: 0,
              scale: 1,
              duration: 0.1,
              ease: "none",
              overwrite: true,
              transformOrigin: isDesktop ? "center center" : "center top"
            });
          }
        }
      }
    });

    return () => {
      galleryTrigger.kill();
      galleryScaleTrigger.kill();
      whereTrigger.kill();
    };
  }, []);

  return (
    <section id="about" ref={whereSectionRef} className="relative w-[100vw] md:w-[100vw] -ml-[0vw] md:-ml-[0vw]">
      <div ref={galleryRef} className="relative w-full h-full overflow-hidden mx-auto">
        {/* Gallery Images */}
        <div className="absolute inset-0">
          <Image
            src="/delta_ghibli.png"
            alt="Paraná Delta"
            fill
            className="gallery-image object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0">
          <Image
            src="/backyard_ghibli.png"
            alt="Backyard"
            fill
            className="gallery-image object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0">
          <Image
            src="/livingroom_ghibli.png"
            alt="Living Room"
            fill
            className="gallery-image object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0">
          <Image
            src="/kitchen_ghibli.png"
            alt="Kitchen"
            fill
            className="gallery-image object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0">
          <Image
            src="/kitchen2_ghibli.png"
            alt="Kitchen 2"
            fill
            className="gallery-image object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0">
          <Image
            src="/room_ghibli.png"
            alt="Room"
            fill
            className="gallery-image object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0">
          <Image
            src="/hammoc_ghibli.png"
            alt="Hammock"
            fill
            className="gallery-image object-cover"
            priority
          />
        </div>

        {/* Overlay with Title and Text */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-black/40">
          <div className="text-center max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white text-shadow">
              A Web3 Builder's Paradise
            </h2>
            <p className="text-sm md:text-base text-white/90 text-shadow mb-4">
              Wind down with the crypto fam after Devconnect <br></br>in our cozy
              builder retreat residencies.
              <br className="hidden md:block" />
              No pressure, just great vibes - <br></br>only 1 hour from Buenos Aires.
            </p>
            <Link
              href="https://maps.google.com/?q=Tigre,Argentina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors group"
            >
              <MapPin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}; 