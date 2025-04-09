import { motion } from "framer-motion";
import ArchetypeWheel from "../archetypeWheel/ArchetypeWheel";

export default function ArchetypeWheelPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen bg-[#E3F1DC] flex flex-col items-center justify-center px-4 py-12 text-center font-serif"
    >
        <h1 className="z-10 text-4xl lg:text-5xl font-light mb-4 tracking-wide text-gray-800">
        Your Inner Compass
        </h1>


        <p className="z-10 text-lg max-w-xl text-gray-600 mb-12 italic leading-relaxed">
            Twelve voices. Each with a shape.  
            Not shouting — but waiting.  
            Turn toward the one that’s been whispering.
        </p>


      <ArchetypeWheel />
    </motion.div>
  );
}

