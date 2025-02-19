import PropTypes from "prop-types";
import Masonry from "react-masonry-css";

const MasonryGrid = ({ images }) => {
  // Responsive breakpoints
  const breakpointColumnsObj = {
    default: 4,  // 4 columns by default
    1100: 3,     // 3 columns when screen width < 1100px
    768: 2,      // 2 columns when screen width < 768px
    500: 1,      // 1 column when screen width < 500px
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-4"
      columnClassName="masonry-column"
    >
      {images.map((image, index) => (
        <img 
          key={index} 
          src={image.src} 
          alt={image.alt} 
          className="w-full rounded-lg shadow-md hover:opacity-90 transition"
        />
      ))}
    </Masonry>
  );
};

// ✅ Define PropTypes
MasonryGrid.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      })
    ).isRequired,
};

export default MasonryGrid;
