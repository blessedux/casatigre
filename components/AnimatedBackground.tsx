"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import dynamic from 'next/dynamic';

// Create a client-only version of the component
const AnimatedBackgroundClient = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [frameUrls, setFrameUrls] = useState<string[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  
  // Memoize debug logging function - removed state update
  const logDebug = useCallback((message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[AnimatedBackground] ${message}`);
    }
  }, []);

  // Memoize frame URLs generation
  const generatedFrameUrls = useMemo(() => {
    const firstFrameNumber = 266;
    const lastFrameNumber = 365;
    const urls: string[] = [];
    
    for (let i = firstFrameNumber; i <= lastFrameNumber; i++) {
      const frameNumber = i.toString().padStart(4, '0');
      urls.push(`/casatigre_hero_webp/frame_${frameNumber}.webp`);
    }
    
    return urls;
  }, []);

  // Set frame URLs once on mount
  useEffect(() => {
    logDebug(`Generated ${generatedFrameUrls.length} frame URLs`);
    setFrameUrls(generatedFrameUrls);
  }, [generatedFrameUrls, logDebug]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      logDebug('ERROR: Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      logDebug('ERROR: Could not get canvas context');
      return;
    }

    logDebug('Canvas initialized successfully');
    ctxRef.current = ctx;
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      logDebug(`Canvas size updated: ${canvas.width}x${canvas.height}`);
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [logDebug]);

  // Memoize draw frame function
  const drawFrame = useCallback((frameIndex: number) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) {
      logDebug('ERROR: Cannot draw frame - canvas or context not available');
      return;
    }

    const img = imagesRef.current[frameIndex];
    if (!img) {
      logDebug(`ERROR: Cannot draw frame ${frameIndex} - image not loaded`);
      return;
    }

    // Calculate dimensions to maintain aspect ratio while ensuring full coverage
    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    ) * 1.1;

    // Center the image
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    logDebug(`Drawing frame ${frameIndex}: scale=${scale.toFixed(2)}, pos=(${x.toFixed(0)},${y.toFixed(0)})`);

    // Draw image
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, [logDebug]);

  // Memoize preload images function
  const preloadImages = useCallback(async () => {
    if (frameUrls.length === 0) {
      logDebug('No frame URLs available for preloading');
      return;
    }

    logDebug(`Starting preload of ${frameUrls.length} frames`);
    const promises = frameUrls.map((url, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          logDebug(`Loaded frame ${index + 1}: ${img.width}x${img.height}`);
          imagesRef.current[index] = img;
          
          // Draw first frame immediately when loaded
          if (index === 0 && ctxRef.current && canvasRef.current) {
            logDebug('Drawing first frame');
            drawFrame(0);
          }
          
          resolve(true);
        };
        img.onerror = (error) => {
          logDebug(`ERROR: Failed to load frame ${index + 1}: ${url}`);
          resolve(false);
        };
        img.src = url;
      });
    });

    try {
      const results = await Promise.all(promises);
      const successCount = results.filter(Boolean).length;
      logDebug(`Preload complete: ${successCount}/${frameUrls.length} frames loaded`);
      setIsLoading(false);
    } catch (error) {
      logDebug(`ERROR during preload: ${error}`);
      setIsError(true);
    }
  }, [frameUrls, drawFrame, logDebug]);

  // Initial preload
  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // Scroll handler
  useEffect(() => {
    let lastDrawnFrame = 0;
    let isTransitioning = false;
    let transitionStartTime = 0;
    const TRANSITION_DURATION = 100; // ms

    const handleScroll = () => {
      if (frameUrls.length === 0) {
        logDebug('No frames available for animation');
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const winHeight = window.innerHeight;
        
        // If we're at the top of the page, always show the first frame
        if (scrollTop === 0) {
          drawFrame(0);
          return;
        }
        
        // Make the animation more sensitive by reducing the scroll distance needed
        const scrollPercent = Math.min(scrollTop / (winHeight * 1.2), 1);
        const numFrames = frameUrls.length;
        const targetFrameIndex = Math.min(
          Math.floor(scrollPercent * (numFrames - 1)),
          numFrames - 1
        );

        // If we're already transitioning, continue the transition
        if (isTransitioning) {
          const currentTime = performance.now();
          const elapsed = currentTime - transitionStartTime;
          
          if (elapsed < TRANSITION_DURATION) {
            // Continue showing the last frame during transition
            drawFrame(lastDrawnFrame);
          } else {
            // Transition complete
            isTransitioning = false;
            lastDrawnFrame = targetFrameIndex;
            drawFrame(targetFrameIndex);
          }
        } 
        // If we're not transitioning and the frame has changed
        else if (targetFrameIndex !== lastDrawnFrame) {
          // Start transition
          isTransitioning = true;
          transitionStartTime = performance.now();
          lastDrawnFrame = targetFrameIndex;
          drawFrame(targetFrameIndex);
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
  }, [frameUrls.length, drawFrame, logDebug]);

  if (isLoading || isError) {
    logDebug(`Rendering ${isLoading ? 'loading' : 'error'} state`);
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
};

// Create a placeholder component for server-side rendering
const AnimatedBackgroundPlaceholder = () => (
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

// Export a dynamically imported version of the component
export const AnimatedBackground = dynamic(
  () => Promise.resolve(AnimatedBackgroundClient),
  {
    ssr: false,
    loading: () => <AnimatedBackgroundPlaceholder />
  }
); 