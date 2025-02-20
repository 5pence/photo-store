import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import useCart from "../context/useCart";
import { motion, AnimatePresence } from "framer-motion";

const Store = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">🛍️ Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

// ✅ **Product Card Component with Image Carousel**
const ProductCard = ({ product, addToCart }) => {
  const [currentImage, setCurrentImage] = useState(0);

  // ✅ Handle Next Image
  const nextImage = () => {
    setCurrentImage((prevIndex) =>
      (prevIndex + 1) % product.images.length
    );
  };

  // ✅ Handle Previous Image
  const prevImage = () => {
    setCurrentImage((prevIndex) =>
      (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow relative">
      {/* Image Carousel */}
      <div className="relative w-full h-40 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={product.images[currentImage]?.image || "placeholder"}
            src={product.images.length > 0 ? product.images[currentImage].image : "https://via.placeholder.com/150"}
            alt={product.name}
            className="w-full h-40 object-cover rounded-t-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Left Arrow */}
        {product.images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full opacity-75 hover:opacity-100"
          >
            ◀
          </button>
        )}

        {/* Right Arrow */}
        {product.images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full opacity-75 hover:opacity-100"
          >
            ▶
          </button>
        )}
      </div>

      {/* Product Details */}
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>

      {/* ✅ Ensure price is parsed as a float before calling toFixed() */}
      <p className="text-gray-600">
        £{!isNaN(parseFloat(product.price)) ? parseFloat(product.price).toFixed(2) : "0.00"}
      </p>

      {/* ✅ Add to Cart Button */}
      <button
        onClick={() => addToCart(product, 1)}
        className="mt-2 w-full bg-rust text-white py-2 rounded hover:bg-red-700 transition"
      >
        ➕ Add to Cart
      </button>
    </div>
  );
};

// ✅ **PropTypes**
Store.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired, // Comes as a string from API
      available: PropTypes.bool.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          image: PropTypes.string.isRequired,
          alt_text: PropTypes.string,
        })
      ).isRequired,
    })
  ),
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        alt_text: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Store;
