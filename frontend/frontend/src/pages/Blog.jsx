import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("All");
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // ✅ Fetch initial posts when component mounts
  useEffect(() => {
    fetchPosts(true); // ✅ Ensures page 1 loads
  }, []);

  // ✅ Fetch additional posts when page changes
  useEffect(() => {
    if (page > 1) {
      fetchPosts();
    }
  }, [page]);

  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/blog/?page=${page}`);
      
      if (res.data.length === 0) {
        setHasMore(false); // ✅ Stop API calls if no more data
        return;
      }

      if (reset) {
        setPosts(res.data);
        setFilteredPosts(res.data);
      } else {
        setPosts((prev) => [...prev, ...res.data]);
        setFilteredPosts((prev) => [...prev, ...res.data]);
      }

      extractTags(res.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique tags from posts
  const extractTags = (posts) => {
    let allTags = new Set();
    posts.forEach((post) => {
      post.tags.forEach((tag) => allTags.add(tag));
    });
    setTags(["All", ...Array.from(allTags)]);
  };

  // ✅ Infinite Scroll Logic (Better threshold + prevents spam)
  const handleScroll = () => {
    if (!hasMore || loading) return; // ✅ Prevents unnecessary API calls

    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const threshold = document.documentElement.offsetHeight - 500; // ✅ Slightly increased buffer for smoother loading

    if (scrollPosition >= threshold) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Strip HTML tags from blog descriptions
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Filter posts by tag
  const handleTagClick = (tag) => {
    setActiveTag(tag);
    if (tag === "All") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.tags.includes(tag)));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-12">
    <title>Journal | Spencers Studio</title>
    <meta name="description" content="Quiet reflections from the Studio - notes on craft, story, and soul by Spencer Barriball." />
      <h1 className="text-4xl font-serif font-light text-center text-charcoal">Journal</h1>

      {/* Tag Filter Buttons */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-1 rounded-full text-sm tracking-wide font-body transition-all duration-300 ${
            activeTag === tag
                ? "bg-moss text-seasalt shadow"
                : "bg-seasalt text-charcoal hover:bg-seasalt/70"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white p-5 rounded-lg w-full max-w-sm"
              initial={{ scale: 1, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
              animate={{ scale: 1, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
              whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.2)"
              }}
              transition={{
                  duration: 0.3,
                  ease: "linear"
              }}
            >
              <Link to={`/journal/${post.slug}`}>
                {post.cover_image && (
                  <motion.img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-600">{stripHtml(post.meta_description).substring(0, 100)}...</p>
                  <p className="text-xs text-muted italic mt-2">Filed: {new Date(post.published_date).toLocaleDateString()}</p>

                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
};

export default Blog;
