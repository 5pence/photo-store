import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Spencers Studio`;
    }
  }, [post]);

  if (loading) return <p className="text-center mt-8 text-charcoal1/70">Gathering thoughts…</p>;

  if (!post) return <p className="text-center mt-8 text-rust font-semibold">This page wandered off the path.</p>;

  const cleanMetaDescription = post.meta_description.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <div className="container mx-auto px-4 py-16">
      <meta name="description" content={cleanMetaDescription} />

      {/* Cover Image */}
      {post.cover_image && (
        <motion.img
          src={post.cover_image}
          alt={post.title}
          className="w-full max-h-[480px] object-cover rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Title and Date */}
      <div className="text-center mt-8">
        <h1 className="text-4xl font-serif font-light text-charcoal tracking-wide">{post.title}</h1>
        <p className="text-muted mt-2 text-sm italic">Shared on {new Date(post.published_date).toLocaleDateString()}</p>
      </div>

      {/* Blog Content */}
      <motion.div
        className="prose prose-lg prose-neutral mx-auto max-w-3xl mt-12 text-[1.1rem] font-body tracking-wide"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Back to Journal Button */}
      <div className="flex justify-center mt-16">
        <Link to="/journal">
          <motion.button
            className="px-6 py-3 bg-moss/90 text-seasalt font-body rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-[cubic-bezier(0.42,0,0.58,1)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            ← Return to the Journal
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
