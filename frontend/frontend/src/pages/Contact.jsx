import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    
    try {
      await axios.post(`${API_BASE_URL}/api/contact/`, formData);
      setSuccess("Your message has been sent successfully! 🎉");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
    <title>Contact | Spencers Studio</title>
    <meta name="description" content="Get in touch with Spencer Barriball at Spencers Studio. Whether you have a project in mind, need photography services, or just want to connect—reach out today!" />

      <h1 className="text-4xl font-bold text-center mb-8 text-[#d64933]">Contact Me</h1>
      <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto">
        Have a project in mind? Drop me a message and I'll get back to you!
      </p>
      
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d64933]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d64933]"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone (Optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d64933]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d64933]"
            required
          ></textarea>
          
          <motion.button
            type="submit"
            className="w-full bg-[#d64933] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Contact;