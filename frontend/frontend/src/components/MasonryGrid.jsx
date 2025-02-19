import Masonry from "react-masonry-css";
import PropTypes from "prop-types";

const MasonryGrid = ({ images }) => {
  const breakpointColumns = {
    default: 3, // 3 columns for large screens
    1024: 2,   // 2 columns for tablets
    768: 1,    // 1 column for mobile
  };

  return (
    <Masonry
        breakpointCols={breakpointColumns}
        className="flex"
        columnClassName="masonry-column space-y-4 px-2" // Adds spacing between images
        >
        {images.map((image) => (
            <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md">
                <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
                {/* Image Title */}
                {/* Image Title with Delay */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 bg-black bg-opacity-60 p-2 rounded">
                    {image.title ? image.title : "untitled"}
                </div>

            </div>
        ))}
    </Masonry>

  );
};

// Prop validation
MasonryGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MasonryGrid;
