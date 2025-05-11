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

  if (loading) return <p className="text-center mt-8 text-gray-600">Loading...</p>;
  if (!post) return <p className="text-center mt-8 text-red-600">Post not found</p>;

  const cleanMetaDescription = post.meta_description.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <div className="container mx-auto px-4 py-12">
      <meta name="description" content={cleanMetaDescription} />

      {/* Cover Image */}
      {post.cover_image && (
        <motion.img
          src={post.cover_image}
          alt={post.title}
          className="w-full max-h-[400px] object-cover rounded-xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Title */}
      <div className="text-center mt-10">
        <h1 className="text-4xl font-serif font-light text-charcoal tracking-wide">
          {post.title}
        </h1>
        <p className="text-sm text-muted italic mt-2">
          Shared on {new Date(post.published_date).toLocaleDateString()}
        </p>
      </div>

      {/* Content */}
      <motion.div
        className="prose prose-lg max-w-3xl mx-auto mt-10 p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-xl
                   prose-headings:font-serif prose-headings:text-charcoal prose-headings:font-light
                   prose-p:font-body prose-p:text-charcoal1 prose-p:leading-relaxed
                   prose-a:text-moss hover:prose-a:underline
                   prose-strong:text-charcoal prose-em:text-muted prose-blockquote:border-l-moss
                   prose-hr:border-t border-charcoal/10 my-8
                   prose-ul:pl-5 prose-li:marker:text-moss"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Back Button */}
      <div className="flex justify-center mt-12">
        <Link to="/journal">
          <motion.button
            className="px-6 py-3 bg-moss text-seasalt font-body rounded-full shadow-lg hover:shadow-xl transition-all"
            initial={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }}
            whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.25)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            ← Back to Journal
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
