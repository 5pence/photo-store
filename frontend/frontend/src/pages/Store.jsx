import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import useCart from "../context/useCart";
import { motion, AnimatePresence } from "framer-motion";

const Store = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="pb-12"> {/* ✅ Added subtle background */}
    <title>Store | Spencers Studio</title>
    <meta name="description" content="Explore the Spencers Studio store. Shop for high-quality prints, digital downloads, and photography-related products. Secure payments and fast delivery." />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl text-center mb-8 text-charcoal font-serif font-thin">🛍️ Store</h1>
        <h2 className="text-2xl font-normal font-serif text-charcoal text-center">
            🌿 A quiet shelf for now.
        </h2>
        <p className="font-body font-light text-center text-vandyke text-lg">
            This part of the studio is still being shaped - a work in progress, like most good things.<br />
            Check back soon... I'm crafting something worth the wait.
        </p>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ✅ **Product Card Component**
const ProductCard = ({ product, addToCart }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevIndex) =>
      (prevIndex + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setCurrentImage((prevIndex) =>
      (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <motion.div
  className="bg-white p-5 rounded-lg shadow-lg w-full max-w-sm"
  initial={{ scale: 1, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
  whileHover={{
    scale: 1.05,
    boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.2)",
  }}
  transition={{ duration: 0.3, ease: "linear" }}
>
  {/* Image Carousel */}
  <div className="relative w-full h-40 overflow-hidden rounded-md">
    <AnimatePresence mode="wait">
      <motion.img
        key={product.images[currentImage]?.image || "placeholder"}
        src={product.images.length > 0 ? product.images[currentImage].image : "https://via.placeholder.com/150"}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "linear" }}
      />
    </AnimatePresence>
  </div>

  {/* Product Details */}
  <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
  <p className="text-gray-600">£{!isNaN(parseFloat(product.price)) ? parseFloat(product.price).toFixed(2) : "0.00"}</p>

  <button
    onClick={() => addToCart(product, 1)}
    className="mt-3 w-full bg-rust text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
  >
    ➕ Add to Cart
  </button>
</motion.div>

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
