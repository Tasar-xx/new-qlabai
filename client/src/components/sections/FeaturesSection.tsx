import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeIn, staggerContainer } from "@/lib/animation";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Camera, Code, Palette, MapPin, Film, User } from "lucide-react";

const features = [
  {
    icon: <Code className="h-8 w-8" />,
    title: "Script Development",
    description:
      "Modify character arcs or plot points and see how it affects the overall story. Your writer's room at your disposal.",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Concept Art",
    description:
      "Rapidly generate concept art. Realize your vision, tweak and adjust in real-time to perfect every detail.",
  },
  {
    icon: <Film className="h-8 w-8" />,
    title: "Look Development",
    description:
      "Explore film styles, aspect ratios, film stocks, and color profiles. Test various options before committing.",
  },
  {
    icon: <User className="h-8 w-8" />,
    title: "Character Design",
    description:
      "Try endless looks for characters. Map actors' faces to see how they fit the roles. Perfect every detail.",
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Location Scouting",
    description:
      "Scout locations remotely in 3D. Fly through spaces and observe from any angle before visiting in person.",
  },
  {
    icon: <Camera className="h-8 w-8" />,
    title: "Camera Lensing",
    description:
      "Choose different lenses and picture profiles. Test looks from ARRI to BMPCC before filming begins.",
  },
];

export default function FeaturesSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="features"
      ref={ref}
      className="min-h-screen py-24 bg-gradient-to-b from-black to-black/90 relative snap-start"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn()}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Revolutionize Your Production
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive AI tools to enhance and augment every aspect of your filmmaking process.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", index * 0.1)}
              className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors shadow-lg group"
            >
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">
                {feature.description}
              </p>
              <a
                href="#"
                className="text-primary flex items-center group-hover:underline"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn("up", 0.6)}
          className="mt-16 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
            asChild
          >
            <a href="#tools">
              View All Tools
              <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
