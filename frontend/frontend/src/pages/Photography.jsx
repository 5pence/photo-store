import PropTypes from "prop-types";
import MasonryGrid from "../components/MasonryGrid";

const sampleImages = [
    { src: "https://picsum.photos/400/300", alt: "Sample Image 1" },
    { src: "https://picsum.photos/400/400", alt: "Sample Image 2" },
    { src: "https://picsum.photos/500/700", alt: "Sample Image 3" },
    { src: "https://picsum.photos/600/500", alt: "Sample Image 4" },
];

const Photography = ({ images = sampleImages }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#d64933]">
        Photography Showcase
      </h2>
      <MasonryGrid images={images} />
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
