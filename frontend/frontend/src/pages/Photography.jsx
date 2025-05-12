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
    <title>Studio | Spencers Studio</title>
    <meta name="description" content="A living portfolio of image, texture, and dream - wander through Spencer's visual storytelling." />
      <motion.div
        className="container mx-auto px-4 pb-8 min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-serif font-light text-center text-charcoal">Studio</h1>

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
