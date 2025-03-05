import { useState } from "react";

const About = () => {
  const technologies = [
    "React", "Django", "Django Rest Framework", "Tailwind", "PostgreSQL", "Stripe", 
    "Bootstrap", "MongoDB", "Node", "JavaScript", "HTML", "CSS", "ESRI", "Geoserver", 
    "AWS", "GCP", "Git"
  ];

  const clients = [
    "SMS", "Oilennium", "Spiderspun", "Spatialist", "Kainos", 
    "PwC", "L3Harris", "Ocean Infinity", "Code Institute"
  ];

  const testimonials = [
    {
      quote: "Spencer is an incredibly talented developer with an eye for clean, elegant design.",
      author: "John Doe, CEO of XYZ Startup",
    },
    {
      quote: "I've worked with Spencer on multiple projects, and his expertise in web development is unmatched.",
      author: "Jane Smith, Lead Developer at ABC Agency",
    },
    {
      quote: "Beyond coding, Spencer has a fantastic ability to tell stories through photography.",
      author: "Sarah Johnson, Creative Director",
    },
  ];

  // For Testimonials Carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Technologies & Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#d64933] mb-6">Technologies & Tools Used</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 text-gray-700 font-semibold">
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Past Clients */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#d64933] mb-6">Past Clients & Brands Worked With</h2>
        <p className="text-center text-gray-600 text-lg">
          Worked with startups, agencies, and individuals across the UK & beyond. Clients include:
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {clients.map((client, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
              {client}
            </span>
          ))}
        </div>
      </section>

      {/* Testimonials & Quotes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#d64933] mb-6">What People Say</h2>
        <div className="relative max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg text-center">
          <p className="text-lg italic text-gray-800">"{testimonials[currentTestimonial].quote}"</p>
          <p className="mt-4 text-sm font-semibold text-gray-600">
            — {testimonials[currentTestimonial].author}
          </p>
          <button
            className="mt-6 px-4 py-2 bg-[#d64933] text-white rounded-full hover:bg-[#bf3a26] transition"
            onClick={nextTestimonial}
          >
            Next Testimonial
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
