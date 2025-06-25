"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import dynamic from 'next/dynamic';

// Create a client-only version of the component
const AnimatedBackgroundClient = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [frameUrls, setFrameUrls] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
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

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      logDebug(`Device detected: ${mobile ? 'mobile' : 'desktop'}`);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [logDebug]);

  // Memoize frame URLs generation based on device type
  const generatedFrameUrls = useMemo(() => {
    const urls: string[] = [];
    
    if (isMobile) {
      // Mobile frames: 266-365 (100 frames)
      const firstFrameNumber = 266;
      const lastFrameNumber = 365;
      
      for (let i = firstFrameNumber; i <= lastFrameNumber; i++) {
        const frameNumber = i.toString().padStart(4, '0');
        urls.push(`/casatigre_hero_webp/frame_${frameNumber}.webp`);
      }
    } else {
      // Desktop frames: 1-56 (56 frames)
      const firstFrameNumber = 1;
      const lastFrameNumber = 56;
      
      for (let i = firstFrameNumber; i <= lastFrameNumber; i++) {
        const frameNumber = i.toString().padStart(4, '0');
        urls.push(`/casatigre_hero_webp_desktop/frame_${frameNumber}.webp`);
      }
    }
    
    logDebug(`Generated ${urls.length} frame URLs for ${isMobile ? 'mobile' : 'desktop'}`);
    return urls;
  }, [isMobile, logDebug]);

  // Set frame URLs when device type changes
  useEffect(() => {
    logDebug(`Setting frame URLs for ${isMobile ? 'mobile' : 'desktop'}`);
    setFrameUrls(generatedFrameUrls);
    
    // Clear existing images when switching device types
    imagesRef.current = [];
    lastFrameRef.current = 0;
    
    // Reset loading state
    setIsLoading(true);
    setIsError(false);
  }, [generatedFrameUrls, isMobile, logDebug]);

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

    logDebug(`Starting preload of ${frameUrls.length} frames for ${isMobile ? 'mobile' : 'desktop'}`);
    
    // Clear existing images before preloading new ones
    imagesRef.current = [];
    
    const promises = frameUrls.map((url, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          logDebug(`Loaded frame ${index + 1}: ${img.width}x${img.height}`);
          imagesRef.current[index] = img;
          
          // Draw first frame immediately when loaded
          if (index === 0 && ctxRef.current && canvasRef.current) {
            logDebug('Drawing first frame immediately after load');
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
      logDebug(`Preload complete: ${successCount}/${frameUrls.length} frames loaded for ${isMobile ? 'mobile' : 'desktop'}`);
      
      // Ensure first frame is drawn after all images are loaded
      if (successCount > 0 && ctxRef.current && canvasRef.current) {
        logDebug('Ensuring first frame is drawn after preload');
        drawFrame(0);
        
        // Double-check visibility after a short delay
        setTimeout(() => {
          if (ctxRef.current && canvasRef.current) {
            logDebug('Double-checking first frame visibility');
            drawFrame(0);
          }
        }, 100);
      }
      
      setIsLoading(false);
    } catch (error) {
      logDebug(`ERROR during preload: ${error}`);
      setIsError(true);
    }
  }, [frameUrls, drawFrame, logDebug, isMobile]);

  // Initial preload
  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // Scroll handler
  useEffect(() => {
    let lastDrawnFrame = -1; // Start at -1 to ensure first frame is always drawn

    const handleScroll = () => {
      if (frameUrls.length === 0) {
        logDebug('No frames available for animation');
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const maxScroll = docHeight - winHeight;
        
        // If we're at the top of the page, always show the first frame
        if (scrollTop === 0) {
          if (lastDrawnFrame !== 0) {
            logDebug('At top of page - showing first frame');
            drawFrame(0);
            lastDrawnFrame = 0;
          }
          return;
        }
        
        // Calculate scroll percentage (0 to 1)
        const scrollPercent = Math.min(scrollTop / maxScroll, 1);
        const numFrames = frameUrls.length;
        
        // Create direct linear mapping: scroll 0-100% maps to frames 0-(numFrames-1)
        const targetFrameIndex = Math.min(
          Math.floor(scrollPercent * numFrames),
          numFrames - 1
        );
        
        // Always update frame if it's different from the last one
        if (targetFrameIndex !== lastDrawnFrame) {
          logDebug(`Scroll: ${scrollTop}/${maxScroll} (${(scrollPercent * 100).toFixed(1)}%) -> Frame ${targetFrameIndex + 1}/${numFrames}`);
          drawFrame(targetFrameIndex);
          lastDrawnFrame = targetFrameIndex;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial draw of first frame
    setTimeout(() => {
      logDebug('Initial draw of first frame');
      handleScroll();
    }, 50);

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