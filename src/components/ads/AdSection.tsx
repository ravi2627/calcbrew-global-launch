import AdPlaceholder from "./AdPlaceholder";

interface AdSectionProps {
  slot: string;
  format?: "horizontal" | "vertical" | "rectangle" | "leaderboard";
  className?: string;
}

/**
 * AdSection Component
 * 
 * Wrapper for ad placements between content sections.
 * Provides proper spacing and separation from content.
 * 
 * Safe placement zones (per AdSense policy):
 * - After calculator result section
 * - Between content sections (not inside tools)
 * - Sidebar on desktop only
 * - Bottom of page (before footer)
 */
const AdSection = ({ slot, format = "horizontal", className = "" }: AdSectionProps) => {
  return (
    <section 
      className={`py-8 md:py-12 bg-background ${className}`}
      aria-label="Sponsored content"
    >
      <div className="container">
        <AdPlaceholder slot={slot} format={format} />
      </div>
    </section>
  );
};

export default AdSection;
