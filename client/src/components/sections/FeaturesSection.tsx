import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeIn, staggerContainer } from "@/lib/animation";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Camera, Code, Palette, MapPin, Film, User } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const features = [
  {
    icon: <Code className="h-16 w-16" />,
    title: "Script Development",
    description:
      "Modify character arcs or plot points and see how it affects the overall story. Your writer's room at your disposal.",
    longDescription: "Our AI-powered script development tool analyzes your screenplay to identify plot holes, character inconsistencies, and pacing issues. It can suggest alternative plot developments based on the emotional arcs you want to achieve. Get instant feedback on dialogue authenticity and character motivations, and explore different narrative directions with just a few clicks.",
    color: "from-blue-600/20 to-indigo-900/30",
    features: [
      "Real-time plot analysis and suggestions",
      "Character consistency tracking",
      "Dialogue authenticity scoring",
      "Genre-specific storytelling guidance",
      "Emotional arc visualization"
    ]
  },
  {
    icon: <Palette className="h-16 w-16" />,
    title: "Concept Art",
    description:
      "Rapidly generate concept art. Realize your vision, tweak and adjust in real-time to perfect every detail.",
    longDescription: "Transform your ideas into stunning visual concepts with our AI concept art generator. Input text descriptions or rough sketches and watch as your vision takes form. Adjust styles, lighting, perspective, and mood in real-time until you achieve the perfect look for your production. Explore multiple variations simultaneously to find the ideal direction.",
    color: "from-purple-600/20 to-pink-900/30",
    features: [
      "Text-to-image generation",
      "Style transfer and adaptation",
      "Multiple variation exploration",
      "Mood and atmosphere adjustment",
      "Seamless iterative refinement"
    ]
  },
  {
    icon: <Film className="h-16 w-16" />,
    title: "Look Development",
    description:
      "Explore film styles, aspect ratios, film stocks, and color profiles. Test various options before committing.",
    longDescription: "Visualize your film's aesthetic before shooting a single frame. Our look development tool lets you experiment with different film stocks, aspect ratios, color grades, and lighting approaches. Upload reference images or describe the look you want to achieve, then watch as AI generates preview frames that show how your choices will impact the final product.",
    color: "from-amber-600/20 to-red-900/30",
    features: [
      "Film stock simulation",
      "Color grading experiments",
      "Lighting scenario testing",
      "Frame composition visualization",
      "Reference-based style matching"
    ]
  },
  {
    icon: <User className="h-16 w-16" />,
    title: "Character Design",
    description:
      "Try endless looks for characters. Map actors' faces to see how they fit the roles. Perfect every detail.",
    longDescription: "Design and refine characters with unprecedented flexibility. Experiment with different facial features, body types, clothing styles, and expressions. Preview how different actors would look in your roles by mapping their features onto character concepts. Ensure visual consistency across different scenes and lighting conditions.",
    color: "from-emerald-600/20 to-teal-900/30",
    features: [
      "Actor face mapping",
      "Costume design visualization", 
      "Character aging simulation",
      "Expression library creation",
      "Cross-scene consistency checking"
    ]
  },
  {
    icon: <MapPin className="h-16 w-16" />,
    title: "Location Scouting",
    description:
      "Scout locations remotely in 3D. Fly through spaces and observe from any angle before visiting in person.",
    longDescription: "Transform location scouting with our advanced 3D environment creator. Browse thousands of real-world locations or build custom environments from scratch. Explore each location from any angle, at any time of day, and in any weather condition. Plan camera setups, identify potential issues, and make informed decisions before setting foot on location.",
    color: "from-cyan-600/20 to-blue-900/30",
    features: [
      "Virtual location exploration",
      "Time-of-day simulation", 
      "Weather condition visualization",
      "Camera setup planning",
      "Set extension possibilities"
    ]
  },
  {
    icon: <Camera className="h-16 w-16" />,
    title: "Camera Lensing",
    description:
      "Choose different lenses and picture profiles. Test looks from ARRI to BMPCC before filming begins.",
    longDescription: "Experience the impact of different camera systems and lenses before rental day. Our camera lensing tool simulates the unique characteristics of popular camera systems from ARRI to Blackmagic. Test different focal lengths, apertures, and picture profiles to find the perfect combination for your vision. Compare options side-by-side to make confident technical decisions.",
    color: "from-red-600/20 to-orange-900/30",
    features: [
      "Camera system comparison",
      "Lens characteristic simulation",
      "Depth of field visualization",
      "Picture profile testing",
      "Side-by-side shot comparison"
    ]
  },
];

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Setup intersection observer manually
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

  // Handle scroll events to change the active feature
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isScrolling) return;

      // Get the scroll position inside the section
      const currentScrollPos = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      
      // Calculate where in the section we are
      const scrolledIntoSection = currentScrollPos - sectionTop;
      
      if (scrolledIntoSection > 0 && scrolledIntoSection < sectionHeight) {
        // Calculate which feature to show based on scroll position
        const featureIndex = Math.min(
          Math.floor((scrolledIntoSection / sectionHeight) * features.length),
          features.length - 1
        );
        
        if (featureIndex !== activeFeatureIndex) {
          setIsScrolling(true);
          setActiveFeatureIndex(featureIndex);
          setTimeout(() => setIsScrolling(false), 500);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeFeatureIndex, isScrolling]);

  const currentFeature = features[activeFeatureIndex];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="bg-gradient-to-b from-black to-black/90 relative snap-start"
      style={{height: `${features.length * 100}vh`}}
    >
      <div className="h-screen w-full sticky top-0 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="container mx-auto px-6 py-20 relative z-10"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn()}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionize Your Production
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive AI tools to enhance and augment every aspect of your filmmaking process.
            </p>
          </motion.div>

          {/* Feature Display */}
          <motion.div
            key={activeFeatureIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-radial ${currentFeature.color} backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl mx-auto max-w-6xl`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-primary mb-6 bg-black/30 p-6 inline-block rounded-2xl">
                  {currentFeature.icon}
                </div>
                <h3 className="text-4xl font-bold mb-3">{currentFeature.title}</h3>
                <p className="text-primary text-xl mb-6">{currentFeature.description}</p>
                <p className="text-lg text-gray-300 mb-8">{currentFeature.longDescription}</p>
                
                <div className="space-y-3 mb-8">
                  <h4 className="text-xl font-semibold">Key Features:</h4>
                  <ul className="space-y-2">
                    {currentFeature.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="mr-2 mt-1 bg-primary/20 p-1 rounded-full">
                          <ArrowRight className="h-3 w-3 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full bg-primary text-black hover:bg-primary/90"
                >
                  Explore {currentFeature.title}
                </Button>
              </div>
              
              <div className="bg-black/40 rounded-2xl aspect-video flex items-center justify-center p-4 border border-white/5">
                <div className="text-center text-gray-500">
                  <div className="mb-4">
                    <Camera className="h-16 w-16 mx-auto opacity-30" />
                  </div>
                  <p className="text-sm">Feature demonstration would appear here</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Feature Navigation */}
          <div className="flex justify-center mt-12 space-x-2">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveFeatureIndex(index);
                  if (sectionRef.current) {
                    const sectionHeight = sectionRef.current.offsetHeight;
                    const sectionTop = sectionRef.current.offsetTop;
                    const scrollTarget = sectionTop + (sectionHeight / features.length) * (index + 0.5);
                    window.scrollTo({
                      top: scrollTarget,
                      behavior: "smooth"
                    });
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeFeatureIndex ? 'bg-primary scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
                aria-label={`View ${feature.title}`}
              />
            ))}
          </div>
          
          <motion.div
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
                View Advanced Tools
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
