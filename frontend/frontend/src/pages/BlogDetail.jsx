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

  if (loading)
    return <p className="text-center mt-8 text-gray-600">Loading...</p>;

  if (!post)
    return <p className="text-center mt-8 text-red-600">Post not found</p>;

  const cleanMetaDescription = post.meta_description.replace(
    /<\/?[^>]+(>|$)/g,
    ""
  );

  return (
    <div className="relative container mx-auto px-4 py-12 max-w-3xl">
      <meta name="description" content={cleanMetaDescription} />

      {post.cover_image && (
        <motion.img
          src={post.cover_image}
          alt={post.title}
          className="w-full max-h-[420px] object-cover rounded-xl shadow-md mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}

      <div className="text-center">
        <h1 className="font-serif text-4xl font-light text-charcoal mb-2">
          {post.title}
        </h1>
        <p className="italic text-sm text-muted">
          Shared on {new Date(post.published_date).toLocaleDateString("en-GB")}
        </p>
      </div>

      <motion.div
        className="prose lg:prose-lg prose-gray font-body text-[1.1rem] leading-[1.8] mt-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="flex justify-center mt-14">
        <Link to="/journal">
          <motion.button
            className="px-6 py-2 rounded-full font-proxima tracking-wide border border-charcoal text-charcoal bg-white hover:bg-charcoal hover:text-white transition shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            ← Back to Journal
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
