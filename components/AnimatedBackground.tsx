"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export function AnimatedBackground() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameUrls, setFrameUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debug, setDebug] = useState({ 
    scrollPercent: 0, 
    frameIndex: 0, 
    targetPosition: 0, 
    originalFrame: 0,
    totalFrames: 0
  });
  
  // Reference to the schedule section for calculating scroll target
  const scheduleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Find the schedule section to use as animation end target
    scheduleRef.current = document.getElementById('schedule');
    
    // Based on the file listing, we have frames from 1 to 365
    const firstFrameNumber = 1;
    const lastFrameNumber = 365;
    
    // Generate the array of frame URLs
    const urls: string[] = [];
    for (let i = firstFrameNumber; i <= lastFrameNumber; i++) {
      // Format frame number with leading zeros to match filename pattern (4 digits)
      const frameNumber = i.toString().padStart(4, '0');
      urls.push(`/casatigre_hero_webp/frame_${frameNumber}.webp`);
    }
    
    setFrameUrls(urls);
    
    // Log how many frames we're using
    console.log(`Animation setup: Using ${urls.length} frames from ${firstFrameNumber} to ${lastFrameNumber}`);
    
    // Preload only the first few frames to reduce initial load time
    const preloadImages = async () => {
      console.log('Preloading initial frames...');
      const preloadCount = 5;
      const imagePromises = urls.slice(0, preloadCount).map((url) => {
        return new Promise((resolve) => {
          const img = new globalThis.Image();
          img.onload = () => resolve(true);
          img.onerror = () => {
            console.log(`Failed to load: ${url}`);
            resolve(false);
          };
          img.src = url;
        });
      });
      
      await Promise.all(imagePromises);
      console.log(`Preloaded ${preloadCount} frames successfully`);
      setIsLoading(false);
    };
    
    preloadImages();
  }, []);

  useEffect(() => {
    let lastScrollTime = 0;
    const throttleTime = 50;
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < throttleTime) return;
      lastScrollTime = now;
      
      if (!containerRef.current || frameUrls.length === 0) return;
      
      // Get current scroll position
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      
      // Calculate scroll percentage based on viewport height
      // This will give us a smoother animation that's tied to the viewport
      const scrollPercent = Math.min(scrollTop / (winHeight * 2), 1);
      
      // Map the scroll percentage to frame index
      const numFrames = frameUrls.length;
      const frameIndex = Math.min(Math.round(scrollPercent * (numFrames - 1)), numFrames - 1);
      
      // Add subtle downward movement (max 20px) based on scroll
      if (containerRef.current && window.innerWidth >= 1024) {
        const imageElement = containerRef.current.querySelector('img');
        if (imageElement) {
          // Move image down by 0-20px based on scroll percentage
          const moveDown = Math.round(scrollPercent * 20);
          imageElement.style.transform = `translateY(${moveDown}px) scale(1.05)`;
        }
      }
      
      setCurrentFrame(frameIndex);
      setDebug({
        scrollPercent: Math.round(scrollPercent * 100),
        frameIndex,
        targetPosition: 100,
        originalFrame: frameIndex + 1,
        totalFrames: numFrames
      });
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100); // Initial calculation
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [frameUrls.length]);

  // Show a loading placeholder until frames are ready
  if (isLoading || frameUrls.length === 0) {
    return (
      <div className="fixed-background">
        <Image
          src="/casatigre_hero_webp/frame_0001.webp" // Start with frame 1 (4 digits)
          alt="Casa Tigre Background"
          fill
          className="desktop-zoom"
          style={{ 
            objectPosition: 'center center',
            transform: 'scale(1.05)'
          }}
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  }

  // Only render the current frame for performance
  return (
    <div className="animation-frames-container" ref={containerRef}>
      <div className="animation-frame visible">
        <Image
          src={frameUrls[currentFrame]}
          alt={`Animation Frame ${currentFrame + 1}`}
          fill
          className="desktop-zoom"
          style={{ objectPosition: 'center center' }}
          priority={currentFrame < 5}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Debug info - remove in production */}
      <div className="fixed bottom-4 left-4 bg-black/50 text-white p-2 text-xs z-50 rounded">
        Scroll: {debug.scrollPercent}% | Frame: {debug.frameIndex} / {debug.totalFrames - 1} | 
        Target: {debug.targetPosition}% | Original: {debug.originalFrame}
      </div>
    </div>
  );
} 