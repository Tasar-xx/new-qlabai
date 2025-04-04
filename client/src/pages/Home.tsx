import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import DemoSection from "@/components/sections/DemoSection";
import ToolsSection from "@/components/sections/ToolsSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import ContactSection from "@/components/sections/ContactSection";
import { useEffect } from "react";

export default function Home() {
  // Force a scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="snap-y snap-proximity">
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <ToolsSection />
      <WorkflowSection />
      <ShowcaseSection />
      <ContactSection />
    </div>
  );
}
