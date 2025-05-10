import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1200);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setVideoEnded(true);
      setShowCTA(true);
    }
  }, [isMobile]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setTimeout(() => setShowCTA(true), 300);
  };

  return (
    <div className="relative h-screen bg-[#1B1D2A] text-[#F7F7F7] overflow-hidden">
      {!videoEnded && !isMobile ? (
        <div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-24 right-20 text-white bg-info backdrop-blur-md rounded-full p-4 text-2xl shadow-lg hover:bg-[#442F34]/90 transition z-20"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
          <video
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={handleVideoEnd}
            className="absolute w-full h-full object-cover"
          >
            <source src="/media/wavesOfMemory-final.mp4" type="video/mp4" />
          </video>
        </div>
      ) : (
        <img
          src="/media/tide.png"
          alt="Tide Still"
          className="absolute w-full h-full object-cover"
        />
      )}

      {showCTA && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cormorant tracking-wide italic text-[#F7F7F7] font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            start gentle, let beauty lead.
          </motion.h1>
            <Link to="/archetype">
                <button className="relative mt-4 px-6 py-2 bg-moss/50 backdrop-blur-sm text-seasalt rounded-full font-body tracking-wide shadow-md hover:shadow-[0_0_1.25rem_#41625960] transition-all duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] focus:outline-none focus:ring-0 focus:ring-transparent overflow-hidden group">
                    Begin Your Archetype Journey
                    <span className="pointer-events-none absolute inset-0 before:content-[''] before:absolute before:top-0 before:left-[-40%] before:h-full before:w-1/3 before:bg-white/20 before:blur-md before:opacity-70 before:transition-transform before:duration-700 before:ease-out group-hover:before:translate-x-[160%]" />
                </button>
            </Link>



          <p className="mt-4 text-base text-base-100/80 font-body">
            or{" "}
            <a
              href="/studio"
              className="underline hover:text-moss transition"
            >
              enter the studio
            </a>{" "}
            to see what I've been creating
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
