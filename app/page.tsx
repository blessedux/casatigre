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
  Globe,
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
  const whereSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWhere = () => {
    window.scrollTo({
      top: 327,
      behavior: 'smooth'
    });
  };

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
        opacity: 1,
        filter: 'blur(0px)'
      });
    }
    if (whereSectionRef.current) {
      gsap.set(whereSectionRef.current, {
        scale: 0.8,
        y: 100,
        transformOrigin: 'center center'
      });
    }

    // Create scroll trigger for gallery images
    const galleryImages = document.querySelectorAll('.gallery-image');
    const totalImages = galleryImages.length;
    
    console.log('Total gallery images found:', totalImages);
    galleryImages.forEach((img, index) => {
      console.log(`Image ${index} initial state:`, {
        opacity: (img as HTMLElement).style.opacity,
        zIndex: (img as HTMLElement).style.zIndex,
        src: (img as HTMLImageElement).src
      });
    });

    // Create scroll trigger for gallery images
    const galleryTrigger = ScrollTrigger.create({
      trigger: ".gallery-container",
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentIndex = Math.min(
          Math.floor(progress * totalImages),
          totalImages - 1
        );
        const nextIndex = Math.min(currentIndex + 1, totalImages - 1);
        const localProgress = (progress * totalImages) % 1;

        console.log(`Scroll update - Current: ${currentIndex}, Next: ${nextIndex}, Progress: ${localProgress}`);

        // Fade out current image
        const currentImage = galleryImages[currentIndex] as HTMLElement;
        if (currentImage) {
          currentImage.style.opacity = (1 - localProgress).toString();
          console.log(`Fading out image ${currentIndex} to opacity ${1 - localProgress}`);
        }

        // Fade in next image
        if (nextIndex !== currentIndex) {
          const nextImage = galleryImages[nextIndex] as HTMLElement;
          if (nextImage) {
            nextImage.style.opacity = localProgress.toString();
            console.log(`Fading in image ${nextIndex} to opacity ${localProgress}`);
          }
        }
      }
    });

    // Add resize listener to update mobile check and refresh ScrollTrigger
    const handleResize = () => {
      console.log('Window resized, refreshing ScrollTrigger');
      ScrollTrigger.refresh();
      galleryTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Force a refresh after a short delay to ensure everything is properly initialized
    setTimeout(() => {
      console.log('Forcing ScrollTrigger refresh');
      ScrollTrigger.refresh();
      galleryTrigger.refresh();
      
      // Log final state of all images
      galleryImages.forEach((img, index) => {
        console.log(`Image ${index} final state:`, {
          opacity: (img as HTMLElement).style.opacity,
          zIndex: (img as HTMLElement).style.zIndex,
          src: (img as HTMLImageElement).src
        });
      });
    }, 1000);

    // Create scroll trigger for Where section scaling and sliding
    const whereTrigger = ScrollTrigger.create({
      trigger: "#about",
      start: "top bottom",
      end: "center center",
      scrub: 1,
      onUpdate: (self) => {
        if (whereSectionRef.current) {
          // First phase: slide up (0 to 0.5 progress)
          if (self.progress <= 0.5) {
            const slideProgress = self.progress * 2; // Normalize to 0-1 range
            gsap.to(whereSectionRef.current, {
              y: 100 - (slideProgress * 100), // Slide from 100px to 0px
              scale: 0.8, // Keep scale constant during slide
              duration: 0.1,
              ease: "none",
              overwrite: true
            });
          }
          // Second phase: scale up (0.5 to 1 progress)
          else {
            const scaleProgress = (self.progress - 0.5) * 2; // Normalize to 0-1 range
            gsap.to(whereSectionRef.current, {
              y: 0, // Keep position constant
              scale: 0.8 + (scaleProgress * 0.7), // Scale from 0.8 to 1.5
              duration: 0.1,
              ease: "none",
              overwrite: true
            });
          }
        }
      }
    });

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
          let backgroundBlur = 0;
          let backgroundScale = 1;
          let backgroundX = 0;
          let backgroundY = 0;

          scrollDownOpacity = self.progress === 0 ? 1 : 0;

          if (self.progress <= 0.25) {
            titleOpacity = 1;
            subtitleOpacity = 1;
          } else if (self.progress >= 0.3) {
            const fadeOutProgress = (self.progress - 0.3) / 0.15;
            titleOpacity = Math.max(0, 1 - fadeOutProgress);
            subtitleOpacity = Math.max(0, 1 - fadeOutProgress);
            backgroundOpacity = 1;
            backgroundBlur = fadeOutProgress * 30;
          } else {
            titleOpacity = 1;
            subtitleOpacity = 1;
            backgroundOpacity = 1;
          }

          if (self.progress > 1) {
            const extraScroll = self.progress - 1;
            backgroundX = extraScroll * 20;
            backgroundY = extraScroll * 20;
            backgroundOpacity = 1;
            backgroundBlur = Math.min(30, extraScroll * 30);
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
            filter: `blur(${backgroundBlur}px)`,
            scale: backgroundScale,
            x: backgroundX,
            y: backgroundY,
            duration: 0.3,
            ease: "power2.out",
            transformOrigin: "center center",
            overwrite: true
          });
        }
      }
    });

    // Add immediate check for image loading
    const checkImages = () => {
      const images = document.querySelectorAll('.gallery-image');
      console.log('Initial image check:', {
        totalImages: images.length,
        images: Array.from(images).map(img => ({
          src: (img as HTMLImageElement).src,
          complete: (img as HTMLImageElement).complete,
          naturalWidth: (img as HTMLImageElement).naturalWidth,
          naturalHeight: (img as HTMLImageElement).naturalHeight,
          style: {
            opacity: (img as HTMLElement).style.opacity,
            zIndex: (img as HTMLElement).style.zIndex,
            position: (img as HTMLElement).style.position,
            visibility: (img as HTMLElement).style.visibility
          }
        }))
      });
    };

    // Check immediately and after a short delay
    checkImages();
    setTimeout(checkImages, 1000);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      galleryTrigger.kill();
      whereTrigger.kill();
      titleTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
          </nav>
        </div>
      </header>

      <div className="content-overlay">
        {/* Hero Section */}
        <section className="hero-section relative w-[100vw] md:w-[100vw] -ml-[0vw] md:-ml-[0vw]">
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

        {/* Where Section */}
        <FadeInSection>
          <section id="about" className="relative py-24 mx-4 md:mx-8">
            <div ref={whereSectionRef} className="container px-4 md:px-6 transform-gpu">
              <div className="flex justify-center">
                <div className="max-w-4xl w-full">
                  {/* Image Gallery */}
                  <div className="relative h-[60vh] w-full rounded-xl overflow-hidden bg-black">
                    <div className="gallery-container h-[60vh] w-full relative">
                      {/* First image - always visible initially */}
                      <div className="absolute inset-0">
                        <Image
                          src="/delta_ghibli.png"
                          alt="Paraná Delta"
                          fill
                          className="object-cover gallery-image"
                          priority
                          sizes="(max-width: 768px) 100vw, 100vw"
                          onLoad={(e) => {
                            console.log('First image loaded:', e.target);
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
                          onError={(e) => {
                            console.error('First image failed to load:', e);
                            const img = e.target as HTMLImageElement;
                            console.log('Image src:', img.src);
                          }}
                        />
                      </div>
                      {/* Other images */}
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
                              console.log(`Image ${index + 2} loaded:`, e.target);
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
                            onError={(e) => {
                              console.error(`Image ${index + 2} failed to load:`, e);
                              const img = e.target as HTMLImageElement;
                              console.log('Image src:', img.src);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Footer Section */}
        <FadeInSection>
          <div ref={footerRef} className="relative h-[180vh] md:h-[220vh] w-[100vw] md:w-[100vw] -ml-[0vw] md:-ml-[0vw]">
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

            {/* When Section - Moved inside footer */}
            <section id="included" className="relative z-10 py-8 md:py-12 mx-4 md:mx-8 mt-24">
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

            {/* Hosts Section */}
            <section id="hosts" className="relative z-10 h-screen flex flex-col items-center justify-center">
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
            </section>

            {/* Join Waitlist Button */}
            <div ref={ctaRef} className="relative z-10 w-full flex justify-center pb-24 md:pb-12 mt-32">
              <Link
                href="https://lu.ma/62qx28n9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-[#e67e22] hover:bg-[#d35400] text-white rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
