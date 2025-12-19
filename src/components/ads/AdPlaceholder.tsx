import { useEffect, useRef, useState } from "react";
import { useUser } from "@/contexts/UserContext";

interface AdPlaceholderProps {
  slot: string;
  format?: "horizontal" | "vertical" | "rectangle" | "leaderboard";
  className?: string;
  label?: string;
}

const formatSizes = {
  horizontal: { minHeight: "90px", aspectRatio: "728/90" },
  vertical: { minHeight: "600px", aspectRatio: "160/600" },
  rectangle: { minHeight: "250px", aspectRatio: "300/250" },
  leaderboard: { minHeight: "90px", aspectRatio: "970/90" },
};

/**
 * AdPlaceholder Component
 * 
 * AdSense-friendly ad container that:
 * - Lazy loads ads only when visible
 * - Prevents layout shift (CLS safe) with reserved space
 * - Respects Pro user status (no ads for Pro)
 * - Uses responsive containers
 * - Clearly separates ads from content
 */
const AdPlaceholder = ({
  slot,
  format = "horizontal",
  className = "",
  label = "Advertisement",
}: AdPlaceholderProps) => {
  const { isPro } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load ads using Intersection Observer
  useEffect(() => {
    if (isPro) return; // Don't load ads for Pro users

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Load ads 200px before they come into view
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isPro]);

  // Simulate ad loading (replace with actual AdSense script in production)
  useEffect(() => {
    if (isVisible && !isLoaded) {
      // Simulate ad load delay
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded]);

  // Don't render anything for Pro users
  if (isPro) {
    return null;
  }

  const sizes = formatSizes[format];

  return (
    <div
      ref={containerRef}
      className={`ad-container w-full ${className}`}
      data-ad-slot={slot}
      data-ad-format={format}
    >
      {/* CLS-safe container with reserved space */}
      <div
        className="relative mx-auto overflow-hidden rounded-lg bg-muted/30 border border-border/50"
        style={{
          minHeight: sizes.minHeight,
          maxWidth: format === "horizontal" || format === "leaderboard" ? "728px" : "300px",
        }}
      >
        {/* Sponsored label - AdSense compliant */}
        <div className="absolute top-2 left-2 z-10">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">
            {label}
          </span>
        </div>

        {/* Ad content area */}
        <div className="flex items-center justify-center h-full min-h-[inherit] p-4">
          {isVisible ? (
            isLoaded ? (
              // Placeholder for actual ad content
              // In production, this would be replaced with actual AdSense code:
              // <ins className="adsbygoogle" data-ad-client="..." data-ad-slot={slot} />
              <div className="text-center text-muted-foreground/40">
                <div className="text-xs">Ad Space</div>
                <div className="text-[10px] mt-1">({format})</div>
              </div>
            ) : (
              <div className="animate-pulse bg-muted/50 w-full h-full absolute inset-0" />
            )
          ) : (
            <div className="text-muted-foreground/20 text-xs">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdPlaceholder;
