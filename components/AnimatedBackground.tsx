"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [frameUrls, setFrameUrls] = useState<string[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate frame URLs
  useEffect(() => {
    if (!isMounted) return;

    const firstFrameNumber = 266;
    const lastFrameNumber = 365;
    const urls: string[] = [];
    
    for (let i = firstFrameNumber; i <= lastFrameNumber; i++) {
      const frameNumber = i.toString().padStart(4, '0');
      urls.push(`/casatigre_hero_webp/frame_${frameNumber}.webp`);
    }
    
    console.log('Generated frame URLs:', urls);
    setFrameUrls(urls);
  }, [isMounted]);

  // Initialize canvas and draw first frame
  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    console.log('Canvas initialized successfully');
    ctxRef.current = ctx;
    
    // Set canvas size to match window size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('Canvas size updated:', { width: canvas.width, height: canvas.height });
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [isMounted]);

  // Preload images and draw first frame
  const preloadImages = useCallback(async () => {
    if (!isMounted || frameUrls.length === 0) {
      console.log('No frame URLs available for preloading');
      return;
    }

    console.log('Starting image preload for', frameUrls.length, 'frames');
    const promises = frameUrls.map((url, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log(`Loaded frame ${index + 1}:`, {
            url,
            width: img.width,
            height: img.height,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight
          });
          imagesRef.current[index] = img;
          
          // Draw first frame immediately when it loads
          if (index === 0 && ctxRef.current && canvasRef.current) {
            drawFrame(0);
          }
          
          resolve(true);
        };
        img.onerror = (error) => {
          console.error(`Failed to load frame ${index + 1}:`, {
            url,
            error
          });
          resolve(false);
        };
        img.src = url;
      });
    });

    try {
      const results = await Promise.all(promises);
      const successCount = results.filter(Boolean).length;
      console.log(`Preload complete. Successfully loaded ${successCount} of ${frameUrls.length} frames`);
      setIsLoading(false);
    } catch (error) {
      console.error('Error during preload:', error);
      setIsError(true);
    }
  }, [frameUrls, isMounted]);

  // Initial preload
  useEffect(() => {
    if (!isMounted) return;
    preloadImages();
  }, [preloadImages, isMounted]);

  // Draw current frame
  const drawFrame = useCallback((frameIndex: number) => {
    if (!isMounted) return;

    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) {
      console.error('Cannot draw frame: canvas or context not available');
      return;
    }

    const img = imagesRef.current[frameIndex];
    if (!img) {
      console.error(`Cannot draw frame ${frameIndex}: image not loaded`);
      return;
    }

    // Clear canvas with black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions to maintain aspect ratio while ensuring full coverage
    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    ) * 1.1; // Slightly larger than viewport to prevent edges

    // Center the image
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    console.log(`Drawing frame ${frameIndex}:`, {
      canvasSize: { width: canvas.width, height: canvas.height },
      imageSize: { width: img.width, height: img.height },
      scale,
      position: { x, y }
    });

    // Draw image
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, [isMounted]);

  // Scroll handler
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (frameUrls.length === 0) {
        console.log('No frames available for animation');
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const winHeight = window.innerHeight;
        const scrollPercent = Math.min(scrollTop / (winHeight * 2), 1);
        const numFrames = frameUrls.length;
        const frameIndex = Math.min(
          Math.floor(scrollPercent * (numFrames - 1)),
          numFrames - 1
        );

        if (frameIndex !== lastFrameRef.current) {
          console.log(`Scroll update:`, {
            scrollTop,
            winHeight,
            scrollPercent,
            frameIndex,
            previousFrame: lastFrameRef.current
          });
          lastFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [frameUrls.length, drawFrame, isMounted]);

  // Server-side render a placeholder
  if (!isMounted) {
    return (
      <div className="fixed-background" style={{ zIndex: -1 }}>
        <div 
          className="w-full h-full"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            backgroundColor: '#000',
            overflow: 'hidden',
          }}
        />
        <div className="absolute inset-0 bg-black/30" style={{ zIndex: -1 }} />
      </div>
    );
  }

  if (isLoading || isError) {
    console.log('Rendering loading/error state:', { isLoading, isError });
    return (
      <div className="fixed-background" style={{ zIndex: -1 }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            backgroundColor: '#000',
            overflow: 'hidden',
          }}
        />
        <div className="absolute inset-0 bg-black/30" style={{ zIndex: -1 }} />
      </div>
    );
  }

  return (
    <div className="fixed-background" style={{ zIndex: -1 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          backgroundColor: '#000',
          overflow: 'hidden',
        }}
      />
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: -1 }} />
    </div>
  );
} 