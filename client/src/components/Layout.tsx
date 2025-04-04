import { ReactNode } from "react";
import { Link } from "wouter";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Navigation = () => {
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-8">
        <li><a href="#hero" className="hover:text-primary transition-colors">Home</a></li>
        <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
        <li><a href="#tools" className="hover:text-primary transition-colors">Tools</a></li>
        <li><a href="#workflow" className="hover:text-primary transition-colors">Workflow</a></li>
        <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
      </ul>
    </nav>
  );
};

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-black/95 backdrop-blur-lg border-muted">
        <nav className="flex flex-col gap-6 mt-12">
          <a href="#hero" className="text-lg font-medium hover:text-primary transition-colors">Home</a>
          <a href="#features" className="text-lg font-medium hover:text-primary transition-colors">Features</a>
          <a href="#tools" className="text-lg font-medium hover:text-primary transition-colors">Tools</a>
          <a href="#workflow" className="text-lg font-medium hover:text-primary transition-colors">Workflow</a>
          <a href="#contact" className="text-lg font-medium hover:text-primary transition-colors">Contact</a>
          <a href="#contact" className="bg-primary px-5 py-2.5 rounded-full hover:bg-opacity-80 transition-all text-center mt-4">Get Started</a>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="bg-black text-white antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/5 px-6 py-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Qlab<span className="text-primary">AI</span>
            </Link>
            <Navigation />
            <MobileNavigation />
            <div className="hidden md:block">
              <a 
                href="#contact" 
                className="bg-primary px-5 py-2 rounded-full hover:bg-opacity-80 transition-all"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
