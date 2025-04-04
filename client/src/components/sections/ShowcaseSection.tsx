import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeIn, staggerContainer } from "@/lib/animation";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const showcaseItems = [
  {
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Revolutionary for Indie Filmmakers",
    quote: "Using FilmCraftAI, we completed pre-production in half the time with twice the detail.",
    name: "Alex Rodriguez",
    role: "Independent Director",
  },
  {
    image: "https://images.unsplash.com/photo-1615414047026-98e41a97cdeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
    title: "Game-Changing for VFX Planning",
    quote: "We previewed complex VFX shots before filming, saving thousands in potential reshoots.",
    name: "Sarah Chen",
    role: "VFX Supervisor",
  },
  {
    image: "https://images.unsplash.com/photo-1569646636644-2d9c2e5aaae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
    title: "Perfect for Remote Collaboration",
    quote: "Our team across three continents worked as if we were in the same room.",
    name: "James Palmer",
    role: "Production Manager",
  },
];

export default function ShowcaseSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-black to-black/90 snap-start"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn()}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Filmmaker Showcase</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how FilmCraftAI is transforming productions around the world.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {showcaseItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", index * 0.1)}
              className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div 
                className="aspect-video rounded-xl mb-4 overflow-hidden"
              >
                <div 
                  className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
              </div>
              <div className="p-2">
                <h4 className="font-bold mb-1">"{item.title}"</h4>
                <p className="text-sm text-gray-400 mb-2">
                  {item.quote}
                </p>
                <div className="flex items-center">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="mx-2">•</span>
                  <span className="text-xs text-gray-400">{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn("up", 0.6)}
          className="mt-16 text-center"
        >
          <Button size="lg" className="rounded-full" asChild>
            <a href="#contact">
              Join Filmmaker Community
              <Users className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
