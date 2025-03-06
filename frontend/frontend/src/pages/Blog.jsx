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

  useEffect(() => {
    fetchPosts(true);
  }, []);

  const fetchPosts = async (reset = false) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/blog/?page=${page}`);
  
      if (reset) {
        setPosts(res.data); // Reset the posts when returning
        setFilteredPosts(res.data);
      } else {
        setPosts((prev) => [...prev, ...res.data]);
        setFilteredPosts((prev) => [...prev, ...res.data]);
      }
  
      extractTags(res.data);
      setHasMore(res.data.length > 0);
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

  // Infinite scroll logic
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && hasMore) {
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#d64933]">Blog</h2>

      {/* Tag Filter Buttons */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-5 py-2 whitespace-nowrap rounded-lg text-base font-medium focus:outline-none ${
              activeTag === tag ? "bg-[#d64933] text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
    className="bg-white p-5 rounded-lg w-full max-w-sm" // ✅ Removed Tailwind's shadow-lg
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
          
              <Link to={`/blog/${post.slug}`}>
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
                  <p className="text-sm text-gray-500 mt-2">📅 {new Date(post.published_date).toLocaleDateString()}</p>
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
