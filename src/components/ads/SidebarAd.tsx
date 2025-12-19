import AdPlaceholder from "./AdPlaceholder";
import { useUser } from "@/contexts/UserContext";

/**
 * SidebarAd Component
 * 
 * Desktop-only sidebar ad placement.
 * Hidden on mobile to prevent accidental clicks and maintain UX.
 */
const SidebarAd = () => {
  const { isPro } = useUser();

  if (isPro) return null;

  return (
    <aside 
      className="hidden lg:block sticky top-24"
      aria-label="Sponsored content"
    >
      <AdPlaceholder 
        slot="sidebar-sticky" 
        format="rectangle"
        label="Sponsored"
      />
    </aside>
  );
};

export default SidebarAd;
