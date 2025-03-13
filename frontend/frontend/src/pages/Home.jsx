import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const Home = () => {
  const fullStudioText = "spencers.studio";
  const [studioText, setStudioText] = useState("");
  const [showStudioText, setShowStudioText] = useState(false);

  useEffect(() => {
    const typingDelay = 3000; 
    const timeout = setTimeout(() => {
      setShowStudioText(true);
    }, typingDelay);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (showStudioText) {
      let i = 0;
      const typingInterval = setInterval(() => {
        setStudioText((prev) => {
          if (i < fullStudioText.length) {
            i++;
            return fullStudioText.slice(0, i);
          } else {
            clearInterval(typingInterval);
            return prev;
          }
        });
      }, 150);
    }
  }, [showStudioText]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-r from-[#d64933] via-[#772418] to-[#220B07] animate-moving-gradient">
      <style>
        {`
          /* Multi-Directional Background Animation */
          @keyframes moving-gradient {
            0% { background-position: 0% 50%; }
            25% { background-position: 100% 30%; }
            50% { background-position: 80% 80%; }
            75% { background-position: 30% 100%; }
            100% { background-position: 0% 50%; }
          }
          .animate-moving-gradient {
            background-size: 400% 400%;
            animation: moving-gradient 18s infinite alternate ease-in-out;
          }

          /* Slow Pulse Effect */
          @keyframes slowPulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.95; }
            100% { transform: scale(1); opacity: 1; }
          }
          .slow-pulse {
            animation: slowPulse 6s infinite ease-in-out;
          }
        `}
      </style>
      <title>Spencers Studio | Photography, Coding & Creativity</title>
      <meta
        name="description"
        content="Welcome to Spencers Studio – a showcase of photography, web development, and creative projects by Spencer Barriball. Explore stunning visuals, insightful coding tutorials, and unique artistic expressions."
      />
      {/* Tagline fades in together */}
      <motion.h1
        className="text-4xl md:text-5xl font-light text-white tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
      >
        photography, creativity, and coding
      </motion.h1>

      {/* Spencer's Studio types out after fade-in */}
      {showStudioText && (
        <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 slow-pulse"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
        >
            {studioText}
        </motion.h2>
      )}

      <Link to="/photography">
        <motion.button
            className="mt-10 px-6 py-3 text-lg font-semibold text-white bg-[#d64933] rounded-full shadow-lg hover:shadow-2xl hover:bg-[#bf3a26] transition relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            Explore My Work
        </motion.button>
      </Link>
    </div>
  );
};

export default Home;
