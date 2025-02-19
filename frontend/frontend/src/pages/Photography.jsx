import PropTypes from "prop-types";
import MasonryGrid from "../components/MasonryGrid";


const Photography = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#d64933]">
        Photography Showcase
      </h2>
      <MasonryGrid />
    </div>
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
