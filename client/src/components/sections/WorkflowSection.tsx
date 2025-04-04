import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeIn } from "@/lib/animation";
import { CheckCircle } from "lucide-react";

const workflowSteps = [
  {
    title: "Conceptualization",
    description:
      "Transform your written ideas into visual concepts. Generate mood boards, explore visual styles, and develop character designs before pre-production begins.",
    features: ["Script to Visual Concepts", "Character Look Development", "Visual Style Exploration"],
    image: "https://images.unsplash.com/photo-1610433572201-110753c6cff9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    isRightAligned: false,
  },
  {
    title: "Pre-Production",
    description:
      "Streamline planning with AI-powered storyboarding, virtual location scouting, and detailed shot breakdown to ensure everyone is aligned before shooting begins.",
    features: ["Automated Storyboarding", "Virtual Location Scouting", "Detailed Shot Planning"],
    image: "https://images.unsplash.com/photo-1523207911345-32501502db22?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    isRightAligned: true,
  },
  {
    title: "Production",
    description:
      "Enhance on-set decision making with real-time previsualization, camera setup simulation, and performance capture to minimize costly reshoots.",
    features: ["Real-time Visual Effects Preview", "Camera & Lighting Simulation", "One-shot Performance Testing"],
    image: "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    isRightAligned: false,
  },
  {
    title: "Post-Production",
    description:
      "Transform your footage with AI-powered relighting, dialogue enhancement, and visual effects integration for a polished final product.",
    features: ["Scene Relighting", "Audio Enhancement", "Physics-Based VFX"],
    image: "https://images.unsplash.com/photo-1574717024453-e599f3984a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    isRightAligned: true,
  },
];

export default function WorkflowSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      id="workflow"
      ref={ref}
      className="min-h-screen py-24 bg-black relative snap-start"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn()}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Seamless Workflow</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how FilmCraftAI integrates into every stage of your production pipeline.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 transform -translate-x-1/2" />

          <div className="space-y-24">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeIn("up", index * 0.2)}
                className={`grid md:grid-cols-2 gap-8 items-center relative ${
                  index % 2 !== 0 ? "md:rtl" : ""
                }`}
              >
                <div className={`${index % 2 !== 0 ? "md:text-right rtl:text-left" : ""}`}>
                  <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10 md:rtl:text-left">
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-400 mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {step.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className={`flex items-center ${
                            index % 2 !== 0 ? "md:justify-end rtl:justify-start" : ""
                          }`}
                        >
                          {index % 2 !== 0 && (
                            <>
                              <span className="md:rtl:text-left">{feature}</span>
                              <CheckCircle className="text-primary h-5 w-5 ml-2 mt-0.5 flex-shrink-0" />
                            </>
                          )}
                          {index % 2 === 0 && (
                            <>
                              <CheckCircle className="text-primary h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div 
                    className="aspect-video rounded-2xl shadow-xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10"
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url('${step.image}')`,
                      }}
                    />
                  </div>
                </div>

                <div className="hidden md:flex absolute left-1/2 top-1/2 w-10 h-10 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10">
                  <span>{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
