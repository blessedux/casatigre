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
      gsap.set(galleryRef.current, {
        height: "20vh",
        width: "60%",
        scale: 0.25,
        x: "50%",
        xPercent: -50
      });
    }

    // Create scroll trigger for gallery images
    const galleryImages = document.querySelectorAll('.gallery-image');
    const totalImages = galleryImages.length;
    
    const galleryTrigger = ScrollTrigger.create({
      trigger: "#about",
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
      trigger: "#about",
      start: "top bottom",
      end: "center center",
      scrub: 0.5,
      onUpdate: (self) => {
        if (galleryRef.current) {
          const progress = self.progress;
          const targetHeight = window.innerWidth >= 768 ? "100vh" : "70vh";
          
          gsap.to(galleryRef.current, {
            scale: 0.25 + (progress * 0.75),
            height: targetHeight,
            width: "100%",
            duration: 0.1,
            ease: "none",
            overwrite: true,
            transformOrigin: "center center"
          });
        }
      }
    });

    // Create scroll trigger for Where section scaling and sliding
    const whereTrigger = ScrollTrigger.create({
      trigger: "#about",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 0.5,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (whereSectionRef.current) {
          const progress = self.progress;
          
          if (progress <= 0.5) {
            const slideProgress = progress * 2;
            gsap.to(whereSectionRef.current, {
              y: 100 - (slideProgress * 100),
              scale: 0.25 + (slideProgress * 0.75),
              duration: 0.1,
              ease: "none",
              overwrite: true,
              transformOrigin: "center center"
            });
          } else {
            const scaleProgress = (progress - 0.5) * 2;
            gsap.to(whereSectionRef.current, {
              y: 0,
              scale: 1,
              duration: 0.1,
              ease: "none",
              overwrite: true,
              transformOrigin: "center center"
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
    <FadeInSection>
      <section id="about" className="relative w-full">
        <div ref={whereSectionRef} className="w-full transform-gpu">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div ref={galleryRef} className="relative rounded-xl overflow-hidden bg-black transform-gpu">
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-black/40">
                <div className="text-center max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white text-shadow">
                    Where is it?
                  </h2>
                  <p className="text-sm md:text-base text-white/90 text-shadow mb-4">
                    A hidden paradise in the Paraná Delta, just 1 hour from Buenos Aires
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

              <div className="gallery-container h-full w-full relative">
                <div className="absolute inset-0">
                  <Image
                    src="/delta_ghibli.png"
                    alt="Paraná Delta"
                    fill
                    className="object-cover gallery-image"
                    priority
                    sizes="(max-width: 768px) 100vw, 100vw"
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.opacity = '1';
                      img.style.position = 'absolute';
                      img.style.top = '0';
                      img.style.left = '0';
                      img.style.width = '100%';
                      img.style.height = '100%';
                      img.style.objectFit = 'cover';
                      img.style.zIndex = '7';
                    }}
                  />
                </div>
                {[
                  { src: '/backyard_ghibli.png', alt: 'Backyard', zIndex: 6 },
                  { src: '/livingroom_ghibli.png', alt: 'Living Room', zIndex: 5 },
                  { src: '/kitchen_ghibli.png', alt: 'Kitchen', zIndex: 4 },
                  { src: '/kitchen2_ghibli.png', alt: 'Kitchen 2', zIndex: 3 },
                  { src: '/room_ghibli.png', alt: 'Room', zIndex: 2 },
                  { src: '/hammoc_ghibli.png', alt: 'Hammock', zIndex: 1 }
                ].map((img, index) => (
                  <div key={img.src} className="absolute inset-0">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover gallery-image"
                      sizes="(max-width: 768px) 100vw, 100vw"
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.opacity = '0';
                        img.style.position = 'absolute';
                        img.style.top = '0';
                        img.style.left = '0';
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        img.style.zIndex = (6 - index).toString();
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}; 