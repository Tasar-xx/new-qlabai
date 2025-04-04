import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeIn } from "@/lib/animation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function DemoSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="demo"
      ref={ref}
      className="min-h-screen py-24 relative overflow-hidden bg-black snap-start"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn()}
          >
            <div className="aspect-video rounded-2xl shadow-2xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 relative group">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2056&q=80')"
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

          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn("up", 0.3)}
          >
            <h2 className="text-4xl font-bold mb-6">
              See FilmCraft<span className="text-primary">AI</span> in Action
            </h2>
            <p className="text-gray-400 mb-8">
              Watch how our comprehensive suite of AI tools transforms the
              filmmaking process from concept to final cut, enabling directors
              to realize their vision faster and with greater precision than
              ever before.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="text-primary h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <span>Reduce pre-production time by up to 70%</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <span>50+ iterations in a single afternoon</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <span>Real-time collaboration between all departments</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <span>Lower production budgets with precise planning</span>
              </li>
            </ul>
            <Button size="lg" className="rounded-full" asChild>
              <a href="#workflow">
                Explore Workflow
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
