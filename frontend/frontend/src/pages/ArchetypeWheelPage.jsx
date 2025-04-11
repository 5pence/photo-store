import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ArchetypeWheel from "../archetypeWheel/ArchetypeWheel";

export default function ArchetypeWheelPage() {
  const location = useLocation();
  const responses = location.state?.responses || {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen bg-nyanza flex flex-col items-center justify-center px-4 pt-0 pb-12 text-center font-serif"
    >
      <div className="w-full max-w-3xl pt-0 lg:pt-0">

        {/* Title */}
        <h1 className="text-5xl lg:text-6xl font-light mt-4 mb-4 tracking-wide text-gunmetal font-serif">
          Your Inner Compass
        </h1>

        {/* Subtext */}
        <p className="font-serif text-xl lg:text-2xl text-gunmetal italic leading-relaxed mb-6 font-[400] tracking-wide">
          Twelve voices. Each with a shape. <br />
          Turn toward the one that’s been whispering.
        </p>

        {/* Archetype Wheel */}
        <ArchetypeWheel responses={responses} />

      </div>
    </motion.div>
  );
}
