import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const url = selectedTag === "All" ? API_URL : `${API_URL}?tag=${selectedTag}`;
        const response = await axios.get(url);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
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

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const breakpointColumns = {
    default: 3,
    1024: 2,
    768: 1,
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

      <Masonry
        breakpointCols={breakpointColumns}
        className="flex"
        columnClassName="masonry-column space-y-4 px-2"
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img
                src={image.image_url}
                alt={image.title || "untitled"}
                className="w-full h-auto transform transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {/* Image Title */}
            <div className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 bg-black bg-opacity-60 p-2 rounded">
              {image.title || "untitled"}
            </div>
          </div>
        ))}
      </Masonry>

      {/* Lightbox (Custom) */}
      {lightboxOpen && images.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={closeLightbox}>
            ✖
          </button>
          <button className="absolute left-4 text-white text-3xl" onClick={prevImage}>
            ◀
          </button>
          <img
            src={images[currentIndex].image_url}
            alt={images[currentIndex].title || "untitled"}
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
          />
          <button className="absolute right-4 text-white text-3xl" onClick={nextImage}>
            ▶
          </button>
        </div>
      )}
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
