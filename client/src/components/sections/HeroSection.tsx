import { motion } from "framer-motion";
import { fadeIn, slideIn } from "@/lib/animation";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 snap-start">
      <div className="absolute top-0 left-0 w-full h-full">
        <div
          className="w-full h-full bg-gradient-to-b from-black via-black/80 to-black"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn("up")}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
              Reimagine
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                Filmmaking
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Augment every stage of your production with AI-powered tools designed for the modern filmmaker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="rounded-full"
                asChild
              >
                <a href="#features">
                  Discover Tools
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <a href="#demo">
                  Watch Demo
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn("up", 0.3)}
          >
            <div 
              className="aspect-video rounded-2xl shadow-2xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 relative group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')"
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black/70 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#features" className="text-white">
          <ChevronDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
}
