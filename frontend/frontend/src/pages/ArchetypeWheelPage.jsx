import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ArchetypeWheel from "../archetypeWheel/ArchetypeWheel";

export default function ArchetypeWheelPage() {
  const location = useLocation();
  const responses = location.state?.responses || {};
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenWheelIntro") === "true";
  
    if (hasSeenIntro) {
      setShowContent(true); // Show immediately
    } else {
      const timer = setTimeout(() => {
        setShowContent(true); // Wait 8 seconds on first view
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen bg-nyanza flex flex-col items-center justify-center px-4 pt-0 pb-12 text-center font-serif"
    >
      <div className="w-full max-w-3xl pt-0 lg:pt-0">

        {/* Title */}
        {showContent && (
            <motion.div
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 2, ease: "easeOut" }}
            >
                <h1 className="text-5xl lg:text-6xl font-light mt-4 mb-4 tracking-wide text-gunmetal font-serif">
                Your Inner Compass
                </h1>
                <p className="font-serif text-xl lg:text-2xl text-gunmetal italic leading-relaxed mb-6 font-[400] tracking-wide">
                Twelve voices. Each with a shape. <br />
                Turn toward the one that’s been whispering.
                </p>
            </motion.div>
        )}

        

        {/* Archetype Wheel */}
        <ArchetypeWheel responses={responses} />

      </div>
    </motion.div>
  );
}
