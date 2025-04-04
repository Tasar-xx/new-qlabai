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

// Import feature videos
// Replacing the previous single video with multiple videos for each feature
import featureVideo1 from '@/assets/videos/feature-video.mp4';
import featureVideo2 from '@assets/freepik__a-closeup-shot-of-a-woman-with-braided-hair-standi__24609.mp4';
import featureVideo3 from '@assets/freepik__camera-zooms-in-on-his-face-as-he-breathes-heavily__24616.mp4';
import featureVideo4 from '@assets/freepik__horror-shot-head-turns-around-360-degree__24620.mp4';
import featureVideo5 from '@assets/freepik__flies-through-the-city-at-insane-jet-speeds__25181.mp4';
import featureVideo6 from '@assets/freepik__closeup-shot-a-man-stands-in-a-dimly-lit-bathroom-__24615.mp4';

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

  // Touch tracking variables
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle wheel events for horizontal scrolling and touch events for mobile
  useEffect(() => {
    // Minimum swipe distance to trigger change
    const MIN_SWIPE_DISTANCE = 50;
    
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
    
    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (!featuresContainerRef.current || isScrolling) return;
      
      setTouchStartX(e.touches[0].clientX);
      setTouchEndX(null);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX) return;
      
      setTouchEndX(e.touches[0].clientX);
    };
    
    const handleTouchEnd = () => {
      if (!touchStartX || !touchEndX || isScrolling) return;
      
      const distance = touchStartX - touchEndX;
      const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
      const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
      
      if (isLeftSwipe) {
        // Swipe left - go to next feature
        const newIndex = Math.min(features.length - 1, activeFeatureIndex + 1);
        if (newIndex !== activeFeatureIndex) {
          setIsScrolling(true);
          setActiveFeatureIndex(newIndex);
          setTimeout(() => setIsScrolling(false), 500);
        }
      } else if (isRightSwipe) {
        // Swipe right - go to previous feature
        const newIndex = Math.max(0, activeFeatureIndex - 1);
        if (newIndex !== activeFeatureIndex) {
          setIsScrolling(true);
          setActiveFeatureIndex(newIndex);
          setTimeout(() => setIsScrolling(false), 500);
        }
      }
      
      // Reset touch values
      setTouchStartX(null);
      setTouchEndX(null);
    };
    
    // Add keyboard navigation
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
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const newIndex = Math.min(features.length - 1, activeFeatureIndex + 1);
          if (newIndex !== activeFeatureIndex) {
            setIsScrolling(true);
            setActiveFeatureIndex(newIndex);
            setTimeout(() => setIsScrolling(false), 500);
          }
        } else if (e.key === 'ArrowLeft') {
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
    
    // Touch event listeners (passive: true is fine for touch events)
    if (featuresContainerRef.current) {
      featuresContainerRef.current.addEventListener('touchstart', handleTouchStart, { passive: true });
      featuresContainerRef.current.addEventListener('touchmove', handleTouchMove, { passive: true });
      featuresContainerRef.current.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      
      if (featuresContainerRef.current) {
        featuresContainerRef.current.removeEventListener('touchstart', handleTouchStart);
        featuresContainerRef.current.removeEventListener('touchmove', handleTouchMove);
        featuresContainerRef.current.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [activeFeatureIndex, isScrolling, touchStartX, touchEndX]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="bg-gradient-to-b from-black to-black/90 relative py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn()}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Revolutionize Your Production
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive AI tools to enhance and augment every aspect of your filmmaking process.
          </p>
        </motion.div>

        {/* Mobile swipe instructions */}
        {isMobile && (
          <div className="text-center mb-4 text-gray-400 text-sm flex items-center justify-center">
            <ArrowRight className="h-4 w-4 mr-1" />
            <span>Swipe left or right to navigate features</span>
            <ArrowRight className="h-4 w-4 ml-1 transform rotate-180" />
          </div>
        )}
        
        {/* Floating features with horizontal scroll */}
        <div 
          ref={featuresContainerRef}
          className="relative mx-auto overflow-visible mb-8 md:mb-16"
          style={{ height: isMobile ? '650px' : '700px' }}
        >
          {features.map((feature, index) => {
            // Calculate position and z-index based on distance from active index
            const distance = Math.abs(index - activeFeatureIndex);
            const zIndex = features.length - distance;
            
            // Calculate x position (left/right offset)
            let xPosition = '0%';
            let scale = 1;
            let opacity = 1;
            let isPointerEventsNone = false;
            
            // Different positioning for mobile vs desktop
            if (isMobile) {
              if (index < activeFeatureIndex) {
                // Left side cards (tighter stacking on mobile)
                xPosition = `-${30 + (distance - 1) * 10}%`;
                scale = 1 - 0.1 * distance;
                opacity = 1 - 0.3 * distance;
                if (distance > 1) {
                  opacity = 0;
                  isPointerEventsNone = true;
                }
              } else if (index > activeFeatureIndex) {
                // Right side cards (tighter stacking on mobile)
                xPosition = `${30 + (distance - 1) * 10}%`;
                scale = 1 - 0.1 * distance;
                opacity = 1 - 0.3 * distance;
                if (distance > 1) {
                  opacity = 0;
                  isPointerEventsNone = true;
                }
              }
            } else {
              // Desktop positioning
              if (index < activeFeatureIndex) {
                // Left side cards
                xPosition = `-${20 + (distance - 1) * 5}%`;
                scale = 1 - 0.07 * distance;
                opacity = 1 - 0.2 * distance;
                if (distance > 2) {
                  opacity = 0;
                  isPointerEventsNone = true;
                }
              } else if (index > activeFeatureIndex) {
                // Right side cards
                xPosition = `${20 + (distance - 1) * 5}%`;
                scale = 1 - 0.07 * distance;
                opacity = 1 - 0.2 * distance;
                if (distance > 2) {
                  opacity = 0;
                  isPointerEventsNone = true;
                }
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
                className={`bg-gradient-radial ${feature.color} backdrop-blur-md p-4 sm:p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl absolute w-full max-w-6xl left-0 right-0 mx-auto top-0 overflow-y-auto`}
                style={{ 
                  transformOrigin: index < activeFeatureIndex ? 'left center' : 'right center',
                  pointerEvents: isPointerEventsNone ? 'none' : 'auto',
                  cursor: index !== activeFeatureIndex ? 'pointer' : 'default',
                  height: isMobile ? '650px' : '700px'
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start h-full px-2 md:px-4">
                  <div>
                    <div className="text-primary mb-4 md:mb-6 bg-black/30 p-4 md:p-6 inline-block rounded-2xl">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">{feature.title}</h3>
                    <p className="text-primary text-lg md:text-xl mb-4 md:mb-6">{feature.description}</p>
                    
                    {index === activeFeatureIndex && (
                      <>
                        <p className="text-base md:text-lg text-gray-300 mb-4 md:mb-8">{feature.longDescription}</p>
                        
                        <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                          <h4 className="text-lg md:text-xl font-semibold">Key Features:</h4>
                          <ul className="space-y-2">
                            {feature.features.map((featureItem, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="mr-2 mt-1 bg-primary/20 p-1 rounded-full">
                                  <ArrowRight className="h-3 w-3 text-primary" />
                                </div>
                                <span className="text-sm md:text-base">{featureItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button
                          variant="default"
                          size={isMobile ? "default" : "lg"}
                          className="rounded-full bg-primary text-black hover:bg-primary/90 text-sm md:text-base"
                        >
                          Explore {feature.title}
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <div className="bg-black/40 rounded-2xl flex items-center justify-center p-2 md:p-4 border border-white/5 overflow-hidden w-full mx-auto mt-4 md:mt-0 h-[200px] md:h-[320px]">
                    <video 
                      src={
                        index === 0 ? featureVideo1 :
                        index === 1 ? featureVideo2 :
                        index === 2 ? featureVideo3 :
                        index === 3 ? featureVideo4 :
                        index === 4 ? featureVideo5 :
                        featureVideo6
                      } 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Feature Navigation Dots */}
        <div className="flex justify-center mb-8 md:mb-16 space-x-3 md:space-x-2">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveFeatureIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeFeatureIndex ? 'bg-primary scale-150' : 'bg-gray-600 hover:bg-gray-400'
              }`}
              style={{ 
                padding: isMobile ? '8px' : '0',
                margin: isMobile ? '0 5px' : '0'
              }}
              aria-label={`View ${feature.title}`}
            />
          ))}
        </div>
        
        {/* Mobile swipe indicator */}
        {isMobile && (
          <div className="flex justify-center items-center mb-12">
            <div className={`w-12 h-1 rounded-full bg-gray-600 opacity-50 transition-all duration-500`} />
          </div>
        )}
        
        <motion.div
          variants={fadeIn("up", 0.6)}
          className="mt-8 md:mt-16 text-center"
        >
          <Button
            variant="outline"
            size={isMobile ? "default" : "lg"}
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-white text-sm md:text-base"
            asChild
          >
            <a href="#tools" className="px-4 py-2 flex items-center justify-center">
              View Advanced Tools
              <ArrowDown className="ml-2 h-3 w-3 md:h-4 md:w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
