import { useEffect } from "react";
import { motion } from "framer-motion";

const projects = [
  { id: 1, title: "E-Commerce Platform", size: "large", image: "/images/ecommerce.jpg" },
  { id: 2, title: "Portfolio Website", size: "small", image: "/images/portfolio.jpg" },
  { id: 3, title: "Photography Showcase", size: "medium", image: "/images/photography.jpg" },
  { id: 4, title: "React Dashboard", size: "small", image: "/images/dashboard.jpg" },
  { id: 5, title: "Django API Backend", size: "large", image: "/images/django-api.jpg" },
];

const services = [
  { id: 1, title: "Web Development", description: "Custom web applications built with modern tech.", image: "/images/web-dev.jpg", price: "From £499" },
  { id: 2, title: "Photography Sessions", description: "Professional photoshoots for any occasion.", image: "/images/photography-service.jpg", price: "From £199" },
  { id: 3, title: "UI/UX Design", description: "Sleek and intuitive designs for your brand.", image: "/images/ui-ux.jpg", price: "From £299" },
];

const gridStyles = {
  large: "col-span-2 row-span-2",
  medium: "col-span-2 row-span-1",
  small: "col-span-1 row-span-1",
};

const Coding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-[#d64933]">About Me</h1>
          <p className="text-lg text-gray-600 mt-4">
            I'm Spencer, a full-stack developer and photographer. I build sleek web apps and capture stunning visuals.
          </p>
        </div>
        <div>
          <img src="/images/spencer.jpg" alt="Spencer Barriball" className="w-full rounded-lg shadow-lg" />
        </div>
      </div>
      
      {/* Services Section (Moved Above Projects) */}
      <h2 className="text-3xl font-semibold mt-16 mb-6 text-[#d64933] text-center">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="bg-white p-5 rounded-lg shadow-lg overflow-hidden"
            initial={{ scale: 1, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.2)" 
            }}
            transition={{ duration: 0.3, ease: "linear" }}
          >
            <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-3">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
            <p className="text-lg font-bold mt-2">{service.price}</p>
            <div className="flex justify-between mt-4">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">Learn More</button>
              <button className="bg-[#d64933] text-white px-4 py-2 rounded-md hover:bg-red-700 transition">Book Now</button>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Projects Section */}
      <h2 className="text-3xl font-semibold mt-16 mb-6 text-[#d64933] text-center">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[200px]">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className={`relative rounded-lg overflow-hidden ${gridStyles[project.size]} shadow-lg`}
            initial={{ boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.2)" 
            }}
            transition={{ duration: 0.3, ease: "linear" }}
          >
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
              <span className="text-white text-xl font-semibold">{project.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Coding;
