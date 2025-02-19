import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Fade & slide in from below
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} // Slide out upwards on page change
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

// ✅ Add PropTypes
AnimatedPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnimatedPage;
