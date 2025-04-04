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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="bg-gradient-to-b from-black to-black/90 relative py-24"
    >
      <div className="container mx-auto px-6">
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

        {/* Vertically stacked features */}
        <div className="space-y-12 md:space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn('up', index * 0.1)}
              className={`bg-gradient-radial ${feature.color} backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl w-full max-w-6xl mx-auto`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="text-primary mb-6 bg-black/30 p-6 inline-block rounded-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-4xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-primary text-xl mb-6">{feature.description}</p>
                  
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
                </div>
                
                <div className="bg-black/40 rounded-2xl flex items-center justify-center p-4 border border-white/5 overflow-hidden w-full mx-auto mt-8 md:mt-0 h-[320px]">
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
          ))}
        </div>
        
        <motion.div
          variants={fadeIn("up", 0.6)}
          className="mt-24 text-center"
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
      </div>
    </section>
  );
}
