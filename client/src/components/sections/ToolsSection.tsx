import React, { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerContainer, zoomIn } from "@/lib/animation";
import { Camera, Film, Pencil, Volume2, Lightbulb, Wand2, Map, Palette, Shirt, Clapperboard, Users, LayoutGrid, Sparkles, FlipVertical, Languages } from "lucide-react";

// Import tool images
import tool1Img from '@/assets/tools/tool-1.png';
import tool2Img from '@/assets/tools/tool-2.png';
import tool3Img from '@/assets/tools/tool-3.png';
import tool4Img from '@/assets/tools/tool-4.png';
import tool5Img from '@/assets/tools/tool-5.png';

// Define tool interface
interface Tool {
  category: string;
  title: string;
  description: string;
  icon: ReactNode;
  longDescription: string;
  features: string[];
  image?: string;
  filter?: string;
}

// Combined tools data with icons and more details
const toolsSections: Tool[] = [
  {
    category: "Pre-Production",
    title: "Script Development",
    description: "Modify character arcs and plot points to see immediate effects on your story structure.",
    icon: <Pencil className="w-20 h-20 text-primary" />,
    longDescription: "Our AI analyzes your script to identify weak points in character development, plot holes, and pacing issues. You can experiment with different scenarios and see how they affect the overall narrative flow.",
    features: [
      "Character arc analysis and suggestion",
      "Plot hole detection",
      "Dialogue enhancement",
      "Genre-specific recommendations",
      "Pacing optimization"
    ],
    image: tool1Img,
    filter: "brightness(1.1) contrast(1.1)"
  },
  {
    category: "Pre-Production",
    title: "Storyboarding",
    description: "Generate detailed storyboards directly from your script with customizable styles.",
    icon: <Palette className="w-20 h-20 text-primary" />,
    longDescription: "Transform your script into visual storyboards in seconds. Choose from various artistic styles or match your preferred visual aesthetic. Experiment with different camera angles and compositions.",
    features: [
      "Script-to-storyboard automation",
      "Multiple artistic styles",
      "Camera framing suggestions",
      "Shot sequencing optimization",
      "Direct edits and adjustments"
    ],
    image: tool2Img,
    filter: "hue-rotate(40deg) saturate(1.2)"
  },
  {
    category: "Pre-Production",
    title: "Location Scouting",
    description: "Scout locations remotely in 3D with advanced VR technology.",
    icon: <Map className="w-20 h-20 text-primary" />,
    longDescription: "Virtually explore potential filming locations from anywhere in the world. Our AI can even suggest modifications to existing locations to better fit your vision.",
    features: [
      "Global location database",
      "Virtual location tours",
      "Lighting conditions simulation",
      "Location modification visualization",
      "Permit requirement insights"
    ],
    image: tool3Img,
    filter: "sepia(0.3) contrast(1.2)"
  },
  {
    category: "Pre-Production",
    title: "Concept Art",
    description: "Rapidly generate concept art versions of the director's vision.",
    icon: <Sparkles className="w-20 h-20 text-primary" />,
    longDescription: "Describe your vision and watch as our AI transforms it into professional concept art. Iterate quickly through variations to find the perfect visual style for your film.",
    features: [
      "Text-to-image generation",
      "Style consistency across scenes",
      "Rapid iteration capability",
      "Asset library integration",
      "Visual reference management"
    ],
    image: tool4Img,
    filter: "hue-rotate(120deg) brightness(1.1)"
  },
  {
    category: "Pre-Production",
    title: "Costume Design",
    description: "Test hundreds of costume variations for characters in different scenes.",
    icon: <Shirt className="w-20 h-20 text-primary" />,
    longDescription: "Visualize your characters in different costumes before making production decisions. The AI considers historical accuracy, character personality, and scene context.",
    features: [
      "Character-specific recommendations",
      "Historical period accuracy",
      "Fabric and texture visualization",
      "Color palette harmonization",
      "Budget-conscious alternatives"
    ],
    image: tool5Img,
    filter: "contrast(1.2) saturate(1.1)"
  },
  {
    category: "Production",
    title: "Camera Lensing",
    description: "Select different lenses and picture profiles to visualize the final look of your film.",
    icon: <Camera className="w-20 h-20 text-primary" />,
    longDescription: "Experiment with various camera lenses, filters, and picture profiles to achieve your desired aesthetic. Preview how different choices affect depth of field, distortion, and overall look.",
    features: [
      "Virtual lens simulation",
      "Picture profile previews",
      "Custom LUT application",
      "Sensor size comparison",
      "Depth of field visualization"
    ]
  },
  {
    category: "Production",
    title: "Blocking Visualization",
    description: "Plan and visualize actor movements and camera positions for complex scenes.",
    icon: <Users className="w-20 h-20 text-primary" />,
    longDescription: "Map out complex scene choreography with our 3D visualization tools. Position actors and cameras, then run simulations to ensure your blocking achieves the desired emotional impact.",
    features: [
      "3D scene blocking",
      "Camera movement planning",
      "Actor positioning optimization",
      "Timing and rhythm analysis",
      "Coverage verification"
    ]
  },
  {
    category: "Production",
    title: "Set Design",
    description: "Modify real locations or create entire virtual sets tailored to your vision.",
    icon: <LayoutGrid className="w-20 h-20 text-primary" />,
    longDescription: "Transform existing locations or build complete virtual sets from scratch. Adjust lighting, furniture, colors, and architecture to create the perfect environment for your story.",
    features: [
      "Real location modification",
      "Complete virtual set creation",
      "Prop and furniture placement",
      "Set extension visualization",
      "Color scheme experimentation"
    ]
  },
  {
    category: "Production",
    title: "Lighting Simulation",
    description: "Preview lighting setups before implementation on set to save time and resources.",
    icon: <Lightbulb className="w-20 h-20 text-primary" />,
    longDescription: "Experiment with various lighting setups in a virtual environment before investing in physical equipment. Test natural, artificial, and mixed lighting scenarios.",
    features: [
      "Time-of-day simulation",
      "Multiple lighting technique presets",
      "Equipment selection guide",
      "Mood and atmosphere enhancement",
      "Power requirement calculations"
    ]
  },
  {
    category: "Production",
    title: "Motion Capture",
    description: "One-shot video motion capture for performance testing and visualization.",
    icon: <Clapperboard className="w-20 h-20 text-primary" />,
    longDescription: "Capture actor movements from a single video feed without expensive motion capture equipment. Apply these movements to digital characters for previsualization.",
    features: [
      "Single-camera mocap",
      "Real-time performance capture",
      "Character animation transfer",
      "Motion library building",
      "Performance refinement tools"
    ]
  },
  {
    category: "Post-Production",
    title: "Relighting",
    description: "Relight scenes after they've been shot to fix issues or change the mood.",
    icon: <Wand2 className="w-20 h-20 text-primary" />,
    longDescription: "Change the lighting of your footage in post-production without reshoots. Modify intensity, color, direction, and quality of light to enhance storytelling.",
    features: [
      "Complete scene relighting",
      "Light source addition/removal",
      "Time-of-day transformation",
      "Mood enhancement",
      "Continuity correction"
    ]
  },
  {
    category: "Post-Production",
    title: "Sound Reformer AI",
    description: "Enhance and optimize audio in post-production to achieve professional sound.",
    icon: <Volume2 className="w-20 h-20 text-primary" />,
    longDescription: "Fix audio issues, remove background noise, enhance dialogue clarity, and create immersive soundscapes. Our AI can even synthesize missing audio elements.",
    features: [
      "Noise reduction",
      "Dialogue enhancement",
      "Sound design assistance",
      "Automated audio mixing",
      "Foley sound generation"
    ]
  },
  {
    category: "Post-Production",
    title: "Dialogue Change",
    description: "Modify dialogue in post while maintaining perfect lip sync and voice matching.",
    icon: <Film className="w-20 h-20 text-primary" />,
    longDescription: "Change what your actors say after filming is complete. Our AI adjusts lip movements to match new dialogue while preserving the original performance quality.",
    features: [
      "Voice cloning",
      "Lip sync adjustment",
      "Script revision implementation",
      "Performance preservation",
      "Language optimization"
    ]
  },
  {
    category: "Post-Production",
    title: "Dubbing & Localization",
    description: "Create seamless dubbing for international releases with perfect lip sync.",
    icon: <Languages className="w-20 h-20 text-primary" />,
    longDescription: "Localize your film for international audiences with AI-powered dubbing that matches lip movements. Preserve performance nuances across languages.",
    features: [
      "Multi-language support",
      "Cultural reference adaptation",
      "Performance style matching",
      "Automated subtitle generation",
      "Regional dialect options"
    ]
  },
  {
    category: "Post-Production",
    title: "Physics Engine AI",
    description: "Create realistic physics-based VFX elements with minimal technical knowledge.",
    icon: <FlipVertical className="w-20 h-20 text-primary" />,
    longDescription: "Generate realistic visual effects like explosions, water, fire, and destruction without complex simulations. Our AI handles the physics while you focus on the creative vision.",
    features: [
      "Realistic elemental effects",
      "Destruction simulation",
      "Particle system generation",
      "Physics-accurate interactions",
      "Low-resource rendering"
    ]
  }
];

export default function ToolsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Function to handle scroll events within the tools section
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      if (!sectionRef.current || isScrolling) return;

      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 150);

      const currentScrollPos = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      
      // Calculate how far we've scrolled into the section
      const scrolledIntoSection = currentScrollPos - sectionTop;
      
      // Calculate which tool should be active based on scroll position
      if (scrolledIntoSection > 0) {
        const toolHeight = sectionHeight / toolsSections.length;
        const newIndex = Math.min(
          Math.floor(scrolledIntoSection / toolHeight),
          toolsSections.length - 1
        );
        
        if (newIndex !== activeToolIndex) {
          setActiveToolIndex(newIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, activeToolIndex, isScrolling]);

  const currentTool = toolsSections[activeToolIndex];

  // Add intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="min-h-screen py-24 bg-gradient-to-b from-black/90 to-black relative snap-start"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn()}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Revolutionize Your Production</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            AI-powered tools for every stage of your filmmaking journey.
          </p>
          
          {/* Two-row horizontal tabbar */}
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn("up")}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 mb-2">
              {toolsSections.slice(0, 7).map((tool, index) => (
                <button
                  key={index}
                  onClick={() => setActiveToolIndex(index)}
                  className={`text-center p-3 transition-all duration-300 rounded-lg ${
                    activeToolIndex === index 
                      ? "bg-primary/20 border-b-2 border-primary" 
                      : "hover:bg-black/40 border-b-2 border-transparent"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className={`p-2 rounded-full ${activeToolIndex === index ? 'bg-primary/20' : 'bg-black/40'}`}>
                      {React.cloneElement(tool.icon as React.ReactElement, { 
                        className: "w-6 h-6 text-primary"
                      })}
                    </div>
                    <p className="text-xs text-primary/80 mt-1">{tool.category}</p>
                    <h4 className={`text-sm font-medium ${activeToolIndex === index ? "text-white" : "text-gray-400"}`}>
                      {tool.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 mb-8">
              {toolsSections.slice(7).map((tool, index) => {
                const actualIndex = index + 7;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => setActiveToolIndex(actualIndex)}
                    className={`text-center p-3 transition-all duration-300 rounded-lg ${
                      activeToolIndex === actualIndex 
                        ? "bg-primary/20 border-b-2 border-primary" 
                        : "hover:bg-black/40 border-b-2 border-transparent"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className={`p-2 rounded-full ${activeToolIndex === actualIndex ? 'bg-primary/20' : 'bg-black/40'}`}>
                        {React.cloneElement(tool.icon as React.ReactElement, { 
                          className: "w-6 h-6 text-primary"
                        })}
                      </div>
                      <p className="text-xs text-primary/80 mt-1">{tool.category}</p>
                      <h4 className={`text-sm font-medium ${activeToolIndex === actualIndex ? "text-white" : "text-gray-400"}`}>
                        {tool.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Floating window content area */}
        <motion.div 
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn("up")}
          className="relative overflow-visible min-h-[60vh]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeToolIndex}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="bg-gradient-to-br from-black/70 to-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col relative overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px -10px rgba(var(--primary-rgb), 0.3)",
              }}
            >
              <div className="flex items-center gap-6 mb-8">
                <motion.div 
                  variants={zoomIn}
                  className="p-4 rounded-2xl bg-black/40 backdrop-blur-sm"
                >
                  {currentTool.icon}
                </motion.div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">{currentTool.title}</h3>
                  <p className="text-primary">{currentTool.category}</p>
                </div>
              </div>

              {/* Tool visualization with image if available */}
              {currentTool.image && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 overflow-hidden rounded-lg relative group"
                >
                  <img 
                    src={currentTool.image} 
                    alt={currentTool.title}
                    className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    style={{ filter: currentTool.filter || 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                </motion.div>
              )}
              
              <p className="text-lg text-gray-300 mb-8">{currentTool.longDescription}</p>
              
              <div className="mt-auto">
                <h4 className="text-xl font-semibold mb-4 text-primary/90">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentTool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                <p className="text-sm text-gray-400">Tool {activeToolIndex + 1} of {toolsSections.length}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveToolIndex(prev => (prev === 0 ? toolsSections.length - 1 : prev - 1))}
                    className="p-2 rounded-full bg-black/40 hover:bg-primary/20 transition-colors"
                    aria-label="Previous tool"
                  >
                    ←
                  </button>
                  <button 
                    onClick={() => setActiveToolIndex(prev => (prev === toolsSections.length - 1 ? 0 : prev + 1))}
                    className="p-2 rounded-full bg-black/40 hover:bg-primary/20 transition-colors"
                    aria-label="Next tool"
                  >
                    →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Reflective element */}
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 blur-3xl rounded-full" />
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 animate-pulse">Scroll to explore more tools</p>
        </div>
      </div>
    </section>
  );
}
