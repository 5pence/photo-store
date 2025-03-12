import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blog/${slug}/`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <p className="text-center mt-8 text-gray-600">Loading...</p>;

  if (!post) return <p className="text-center mt-8 text-red-600">Post not found</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Cover Image */}
      {post.cover_image && (
        <motion.img
          src={post.cover_image}
          alt={post.title}
          className="w-full max-h-[400px] object-cover rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Title and Date */}
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold text-[#d64933]">{post.title}</h1>
        <p className="text-gray-500 text-sm mt-2">📅 {new Date(post.published_date).toLocaleDateString()}</p>
      </div>

      {/* Blog Content in a Styled Card */}
      <motion.div
        className="ck-content bg-white shadow-lg rounded-lg p-8 mt-10 mx-auto max-w-4xl text-lg leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        dangerouslySetInnerHTML={{ __html: post.content }} // Ensuring rich text formatting
      />

        {/* Back to Blog Button - Centered with Smooth Animated Shadow */}
        <div className="flex justify-center mt-10">
        <Link to="/blog">
            <motion.button
            className="px-6 py-3 bg-muted-blue text-white font-semibold rounded-lg shadow-lg flex items-center gap-2 transition-all"
            initial={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.15)" }} // Subtle default shadow
            whileHover={{
                scale: 1.08,
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)", // Gradually expand shadow
            }}
            transition={{ duration: 0.3, ease: "easeOut" }} // Smooth animation
            >
            <i className="bx bx-arrow-back"></i> Back to Blog
            </motion.button>
        </Link>
        </div>



    </div>
  );
};

export default BlogDetail;
