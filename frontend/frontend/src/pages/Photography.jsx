import PropTypes from "prop-types";
import MasonryGrid from "../components/MasonryGrid";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Photography = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <title>Photography | Spencers Studio</title>
    <meta name="description" content="Explore the photography of Spencer Barriball at Spencers Studio. Capturing stunning landscapes, portraits, street photography, and creative visuals." />
      <motion.div
        className="container mx-auto px-4 py-8 min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#d64933]">
          Photography Showcase
        </h2>
        <MasonryGrid />
      </motion.div>
    </>
  );
};

// ✅ Define PropTypes
Photography.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
};

export default Photography;
