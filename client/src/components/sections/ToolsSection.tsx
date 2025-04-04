import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeIn, staggerContainer } from "@/lib/animation";

const preProductionTools = [
  { title: "Script Development", description: "Modify character arcs and plot points to see effects on story." },
  { title: "Storyboarding", description: "Generate detailed storyboards directly from script." },
  { title: "Location Scouting", description: "Scout locations remotely in 3D with VR tech." },
  { title: "Concept Art", description: "Rapidly generate concept art versions of the director's vision." },
  { title: "Costume Design", description: "Test hundreds of costume variations for characters." },
];

const productionTools = [
  { title: "Camera Lensing", description: "Select different lenses and picture profiles for your film." },
  { title: "Blocking Visualization", description: "Plan and visualize actor movements and camera positions." },
  { title: "Set Design", description: "Modify real locations or create entire virtual sets." },
  { title: "Lighting Simulation", description: "Preview lighting setups before implementation on set." },
  { title: "Motion Capture", description: "One-shot video motion capture for performance testing." },
];

const postProductionTools = [
  { title: "Relighting", description: "Relight scenes after they've been shot." },
  { title: "Sound Reformer AI", description: "Enhance and optimize audio in post-production." },
  { title: "Dialogue Change", description: "Modify dialogue in post while maintaining lip sync." },
  { title: "Dubbing & Localization", description: "Create seamless dubbing for international releases." },
  { title: "Physics Engine AI", description: "Create realistic physics-based VFX elements." },
];

export default function ToolsSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="tools"
      ref={ref}
      className="min-h-screen py-24 bg-gradient-to-b from-black/90 to-black relative snap-start"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn()}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Complete Toolkit</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AI-powered tools for every stage of your filmmaking journey.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <motion.div variants={fadeIn()}>
            <h3 className="text-2xl font-bold mb-6 text-primary">Pre-Production</h3>
            <div className="space-y-6">
              {preProductionTools.map((tool, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", index * 0.1)}
                  className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <h4 className="font-bold mb-2">{tool.title}</h4>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn("up", 0.2)}>
            <h3 className="text-2xl font-bold mb-6 text-primary">Production</h3>
            <div className="space-y-6">
              {productionTools.map((tool, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", index * 0.1)}
                  className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <h4 className="font-bold mb-2">{tool.title}</h4>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn("up", 0.4)}>
            <h3 className="text-2xl font-bold mb-6 text-primary">Post-Production</h3>
            <div className="space-y-6">
              {postProductionTools.map((tool, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", index * 0.1)}
                  className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <h4 className="font-bold mb-2">{tool.title}</h4>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
