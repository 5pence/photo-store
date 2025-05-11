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
      setSuccess("Got it. Your note is on its way - I'll write back soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError("Hmm. Something didn’t work. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-16 max-w-4xl text-center">
      <title>Contact | Spencers Studio</title>
      <meta
        name="description"
        content="Get in touch with Spencer Barriball at Spencers Studio. Whether you have a project in mind, need photography services, or just want to connect—reach out today!"
      />

      <h1 className="text-5xl font-serif text-charcoal mb-4">Contact Me</h1>
      <p className="text-lg text-vandyke max-w-xl mx-auto mb-10">
        Write me a note - I’ll write back.
      </p>

      <div className="bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200">
        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d64933] bg-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d64933] bg-white"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone (Optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d64933] bg-white"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d64933] bg-white"
            required
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="relative mt-6 px-8 py-2 bg-moss/80 backdrop-blur-sm text-seasalt rounded-full font-body tracking-wide shadow-md hover:shadow-[0_0_1.25rem_#41625960] transition-all duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] focus:outline-none focus:ring-0 focus:ring-transparent overflow-hidden group w-fit mx-auto"
            >
            {loading ? "Sending..." : "Send Message"}
            <span className="pointer-events-none absolute inset-0 before:content-[''] before:absolute before:top-0 before:left-[-40%] before:h-full before:w-1/3 before:bg-white/20 before:blur-md before:opacity-70 before:transition-transform before:duration-700 before:ease-out group-hover:before:translate-x-[160%]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
