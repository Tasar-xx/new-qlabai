import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animation";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Camera, Code, Palette, MapPin, Film, User } from "lucide-react";
import React, { useRef, useState, useEffect, ReactNode } from "react";

// Import all feature images
import feature1Img from '@/assets/features/feature-1.png';
import feature2Img from '@/assets/features/feature-2.png';
import feature3Img from '@/assets/features/feature-3.png';
import feature4Img from '@/assets/features/feature-4.png';
import feature5Img from '@/assets/features/feature-5.png';
import feature6Img from '@/assets/features/feature-6.png';

// Import feature video
import featureVideo from '@/assets/videos/feature-video.mp4';

// Define feature interface
interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  longDescription: string;
  color: string;
  image: string; 
  filter: string;
  features: string[];
}

const features: Feature[] = [
  {
    icon: <Code className="h-16 w-16" />,
    title: "Script Development",
    description:
      "Modify character arcs or plot points and see how it affects the overall story. Your writer's room at your disposal.",
    longDescription: "Our AI-powered script development tool analyzes your screenplay to identify plot holes, character inconsistencies, and pacing issues. It can suggest alternative plot developments based on the emotional arcs you want to achieve. Get instant feedback on dialogue authenticity and character motivations, and explore different narrative directions with just a few clicks.",
    color: "from-blue-600/20 to-indigo-900/30",
    image: feature1Img,
    filter: "brightness(1.2) contrast(1.1)",
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
    image: feature2Img,
    filter: "hue-rotate(40deg) saturate(1.2)",
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
    image: feature3Img,
    filter: "sepia(0.4) contrast(1.1)",
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
    image: feature4Img,
    filter: "hue-rotate(120deg) brightness(1.1)",
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
    image: feature5Img,
    filter: "hue-rotate(180deg) saturate(0.8)",
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
    image: feature6Img,
    filter: "hue-rotate(320deg) brightness(0.9) contrast(1.2)",
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
  const featuresContainerRef = useRef<HTMLDivElement | null>(null);
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

  // Handle wheel events for floating windows navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!featuresContainerRef.current || isScrolling) return;
      
      // Check if the wheel event is within our container
      if (featuresContainerRef.current.contains(e.target as Node)) {
        e.preventDefault();
        
        // Determine scroll direction
        const direction = e.deltaY > 0 ? 1 : -1;
        
        // Calculate new index with boundary checks
        const newIndex = Math.max(0, Math.min(features.length - 1, activeFeatureIndex + direction));
        
        if (newIndex !== activeFeatureIndex) {
          setIsScrolling(true);
          setActiveFeatureIndex(newIndex);
          setTimeout(() => setIsScrolling(false), 500);
        }
      }
    };
    
    // Add keyboard navigation for accessibility
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!featuresContainerRef.current || isScrolling) return;
      
      // Only handle keyboard navigation when features container is in viewport
      const rect = featuresContainerRef.current.getBoundingClientRect();
      const isInViewport = 
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth;
        
      if (isInViewport) {
        // Handle arrow keys
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const newIndex = Math.min(features.length - 1, activeFeatureIndex + 1);
          if (newIndex !== activeFeatureIndex) {
            setIsScrolling(true);
            setActiveFeatureIndex(newIndex);
            setTimeout(() => setIsScrolling(false), 500);
          }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const newIndex = Math.max(0, activeFeatureIndex - 1);
          if (newIndex !== activeFeatureIndex) {
            setIsScrolling(true);
            setActiveFeatureIndex(newIndex);
            setTimeout(() => setIsScrolling(false), 500);
          }
        }
      }
    };
    
    // Add event listeners with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeFeatureIndex, isScrolling]);

  // Handle normal scroll events to change the active feature
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
          <div 
            ref={featuresContainerRef}
            className="relative h-[700px] mx-auto overflow-visible mb-20">
            {features.map((feature, index) => {
              // Calculate position and z-index based on distance from active index
              const distance = Math.abs(index - activeFeatureIndex);
              const zIndex = features.length - distance;
              
              // Calculate x position (left/right offset)
              let xPosition = '0%';
              let scale = 1;
              let opacity = 1;
              let isPointerEventsNone = false;
              
              if (index < activeFeatureIndex) {
                // Left side cards
                xPosition = `-${15 + (distance - 1) * 5}%`;
                scale = 1 - 0.07 * distance;
                opacity = 1 - 0.2 * distance;
                if (distance > 2) {
                  opacity = 0;
                  isPointerEventsNone = true;
                }
              } else if (index > activeFeatureIndex) {
                // Right side cards
                xPosition = `${15 + (distance - 1) * 5}%`;
                scale = 1 - 0.07 * distance;
                opacity = 1 - 0.2 * distance;
                if (distance > 2) {
                  opacity = 0;
                  isPointerEventsNone = true;
                }
              }
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: opacity, 
                    y: 0,
                    x: xPosition,
                    scale: scale,
                    zIndex: zIndex
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                  className={`bg-gradient-radial ${feature.color} backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl absolute w-full max-w-7xl left-0 right-0 mx-auto top-0 h-[700px] overflow-y-auto`}
                  style={{ 
                    transformOrigin: index < activeFeatureIndex ? 'left center' : 'right center',
                    pointerEvents: isPointerEventsNone ? 'none' : 'auto',
                    cursor: index !== activeFeatureIndex ? 'pointer' : 'default'
                  }}
                  onClick={() => {
                    if (index !== activeFeatureIndex) {
                      setActiveFeatureIndex(index);
                    }
                  }}
                  tabIndex={isPointerEventsNone ? -1 : 0}
                  role="button"
                  aria-label={`View ${feature.title} feature details`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (index !== activeFeatureIndex) {
                        setActiveFeatureIndex(index);
                      }
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start h-full px-4">
                    <div>
                      <div className="text-primary mb-6 bg-black/30 p-6 inline-block rounded-2xl">
                        {feature.icon}
                      </div>
                      <h3 className="text-4xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-primary text-xl mb-6">{feature.description}</p>
                      
                      {/* Only show detailed content for active feature */}
                      {index === activeFeatureIndex && (
                        <>
                          <p className="text-lg text-gray-300 mb-8">{feature.longDescription}</p>
                          
                          <div className="space-y-3 mb-8">
                            <h4 className="text-xl font-semibold">Key Features:</h4>
                            <ul className="space-y-2">
                              {feature.features.map((featureItem, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="mr-2 mt-1 bg-primary/20 p-1 rounded-full">
                                    <ArrowRight className="h-3 w-3 text-primary" />
                                  </div>
                                  <span>{featureItem}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <Button
                            variant="default"
                            size="lg"
                            className="rounded-full bg-primary text-black hover:bg-primary/90"
                          >
                            Explore {feature.title}
                          </Button>
                        </>
                      )}
                    </div>
                    
                    <div className="bg-black/40 rounded-2xl flex items-center justify-center p-4 border border-white/5 overflow-hidden w-full mx-auto mt-8 md:mt-12 h-[320px]">
                      {index === activeFeatureIndex ? (
                        <video 
                          src={featureVideo} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                          style={{ filter: feature.filter }}
                        />
                      ) : (
                        <img 
                          src={feature.image} 
                          alt={`Demonstration of ${feature.title} feature`}
                          className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                          style={{ filter: feature.filter }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Feature Navigation */}
          <div className="flex justify-center mt-12 space-x-2">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveFeatureIndex(index);
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
