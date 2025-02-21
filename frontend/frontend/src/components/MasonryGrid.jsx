import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Masonry from "react-masonry-css";
import PropTypes from "prop-types";
import axios from "axios";

const MasonryGrid = () => {
  const API_URL = "http://localhost:8000/api/images/";
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true); // Start loading
      try {
        const url = selectedTag === "All" ? API_URL : `${API_URL}?tag=${selectedTag}`;
        const response = await axios.get(url);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchImages();
  }, [selectedTag]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(API_URL);
        const allTags = new Set();
        response.data.forEach((image) => {
          image.tags.forEach((tag) => allTags.add(tag));
        });
        setTags(Array.from(allTags));
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const openLightbox = useCallback((index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!lightboxOpen) return;

      if (event.key === "ArrowRight") {
        nextImage();
      } else if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "Escape") {
        closeLightbox();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    onSwipedDown: closeLightbox,
    trackMouse: true,
  });

  const breakpointColumns = {
    default: 4,
    1024: 3,
    768: 2,
    400: 1,
  };

  return (
    <div className="container mx-auto px-4">
      {/* Tag Filters */}
      <div className="flex flex-wrap justify-center space-x-2 mb-6">
        <button
          className={`px-4 py-2 rounded focus:outline-none ${
            selectedTag === "All" ? "bg-rust text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setSelectedTag("All")}
        >
          All
        </button>

        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded ${selectedTag === tag ? "bg-rust text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ✅ Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rust"></div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <Masonry breakpointCols={breakpointColumns} className="flex" columnClassName="masonry-column space-y-4 px-2">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer"
                onClick={() => openLightbox(index)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <img
                  src={image.image_url}
                  alt={image.title || "untitled"}
                  loading="lazy"
                  className="w-full h-auto transform transition-transform duration-300 ease-in-out group-hover:scale-105 opacity-0 transition-opacity duration-500"
                  onLoad={(e) => e.target.classList.remove("opacity-0")}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 bg-black bg-opacity-60 p-2 rounded">
                  {image.title || "untitled"}
                </div>
              </motion.div>
            ))}
          </Masonry>
        </AnimatePresence>
      )}

      {/* Lightbox with Smooth Transitions, Keyboard & Swipe Support */}
      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            {...swipeHandlers}
          >
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={closeLightbox}>
              ✖
            </button>

            <button className="absolute left-4 text-white text-3xl" onClick={prevImage}>
              ◀
            </button>

            <motion.img
              key={images[currentIndex].image_url}
              src={images[currentIndex].image_url}
              alt={images[currentIndex].title || "untitled"}
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            <button className="absolute right-4 text-white text-3xl" onClick={nextImage}>
              ▶
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Prop validation
MasonryGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image_url: PropTypes.string.isRequired,
      title: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

export default MasonryGrid;
