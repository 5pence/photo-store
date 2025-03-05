import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Coding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    { id: 1, title: "Web Development", description: "Custom web applications with modern tech.", image: "webdev.png", price: "From £499" },
    { id: 2, title: "Photography Sessions", description: "Professional photoshoots for any occasion.", image: "camera.png", price: "From £199" },
    { id: 3, title: "Coding Mentorship", description: "Personalised coding mentorship and help.", image: "mentorship.png", price: "From £40" },
  ];
  
    const clients = [
      "SMS", "Oilennium", "Spiderspun", "Spatialist", "Kainos", 
      "PwC", "L3Harris", "Ocean Infinity", "Code Institute"
    ];
  
    const testimonials = [
      {
        quote: "I had the pleasure of being mentored by Spencer for my last two projects that I worked on at The Code Institute, both of which I scored a Distinction grade.",
        author: "Derek de Goey, Junior Frontend Developer",
      },
      {
        quote: "Spencer was my mentor throughout my journey with the Full-Stack Development Course with Code Institute & has been an absolutely superb mentor.  I was able to secure a 'First Class Honours'. He truly deserves recognition for his efforts.",
        author: "Charlie Jeffries-Tipton, Full Stack Developer",
      },
      {
        quote: "He has a superb work ethic and always goes the extra mile to help with any queries I might have. When carrying out project work, Spencer is always on hand to give advice and help provide guidance should it be required. He is a brilliant mentor.",
        author: "Martin Crowley, Full Stack Developer",
      },
      {
        quote: "The best mentor I had during the course, very helpful, and his feedback really helped to push me further and improve my work. Overall, a very knowledgeable mentor and all-around good guy.",
        author: "Martin Crowley, Full Stack Developer",
      },
      {
        quote: "Websites, SEO, and website optimisation are all vital to the success of any business but finding the right company to help is far from easy. Spencer helped us re-build our site, optimise the content and vastly improved our Google profile. We have no hesitation recommending him.",
        author: "James Chrystal MCIOB CMgr FCMI CertIOSH",
      },
      {
        quote: "Spencer listens to the requirements specified by a non tech and is able to interpret them to provide a technical solution. In my experience he gives 100 and one percent to any task presented to him and you can be sure he will have a solution ready for you at the end of the day.",
        author: "Alice Denham, Oilennuim",
      },
      {
        quote: "Spencer has shown a fantastic service level agreement in website development and other IT research and development particularly the Unity3D game engine for simulating 3D models. He collaborate with his colleagues in an effective way.",
        author: "Wissam A. Albukhanajer PhD, Senior Engineer",
      },
      {
        quote: "The easy way to recommend Spencer is to ask you to type in to google 'oil elearning' one of our preferred search terms- this morning we had the top three slots. 6 months ago we didn't even appear. This is over and above what we asked for.",
        author: "Kevin Keable, Oilennium",
      },
    ];
  
    // For Testimonials Carousel
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 10000); // Change testimonial every 10s
    
        return () => clearInterval(interval);
      }, []);
    

  return (
    <div className="container mx-auto px-4 py-12">
      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-[#d64933]">About Me</h1>
          <p className="text-lg text-gray-600 mt-4">
          Hey, I’m Spencer—a full-stack developer and photographer with a passion for creating elegant web applications and compelling visuals. With over 20 years of experience in web development, I specialize in crafting fast, modern websites that don’t just look great but perform exceptionally.
          </p>
          <p className="text-lg text-gray-600 mt-4">
          Beyond coding, my photography is more than just capturing moments—I love using photo editing to create surreal compositions, giving images a deeper story and exploring archetypes through visual storytelling. Whether it's a conceptual piece, a striking portrait, or a digitally enhanced scene, I enjoy pushing the boundaries of what a photograph can say.
          </p>
          <p className="text-lg text-gray-600 mt-4">
          If you’re looking for a developer who understands design, or a photographer who brings storytelling into every shot—let’s chat!
          </p>
        </div>
        <div>
          <img src="spencer.jpg" alt="Spencer Barriball" className="w-full rounded-lg shadow-lg" />
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
            <img src={service.image} alt={service.title} className="w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover mx-auto rounded-t-lg" />
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

      {/* Technoloies section */}
      <section className="mb-16 mt-20 bg-gradient-to-b from-gray-100 to-gray-50 rounded-lg py-16 px-6 shadow-lg">
        <h2 className="text-4xl font-bold text-center text-[#d64933] mb-14">
            Technologies & Tools Used
        </h2>

        {/* Backend & Development */}
        <h3 className="text-2xl font-semibold text-muted-blue text-center mb-6 flex items-center justify-center border-b-2 border-gray-300 pb-2">
            <i className="bx bx-code-alt text-2xl mr-2"></i> Development & Backend
        </h3>
        <div className="mx-auto max-w-screen-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center mb-10">
            {[
            { name: "React", icon: "bxl-react text-blue-500", experience: 6 },
            { name: "Django", icon: "bxl-django text-green-600", experience: 9 },
            { name: "Node.js", icon: "bxl-nodejs text-green-500", experience: 3 },
            { name: "PostgreSQL", icon: "bxl-postgresql text-blue-700", experience: 21 },
            { name: "MongoDB", icon: "bxl-mongodb text-green-500", experience: 9 },
            { name: "JavaScript", icon: "bxl-javascript text-yellow-500", experience: 21 },
            { name: "TypeScript", icon: "bxl-typescript text-blue-500", experience: 5 },
            { name: "HTML", icon: "bxl-html5 text-orange-600", experience: 25 },
            { name: "CSS", icon: "bxl-css3 text-blue-400", experience: 25 },
            { name: "Docker", icon: "bxl-docker text-blue-500", experience: 5 },
            { name: "Kubernetes", icon: "bxl-kubernetes text-blue-500", experience: 4 },
            { name: "MySQL", icon: "bx bxs-data text-blue-700", experience: 21 },
            { name: "Git", icon: "bxl-git text-red-500", experience: 8 },
            { name: "AWS", icon: "bxl-aws text-orange-500", experience: 7 },
            { name: "GCP", icon: "bxs-cloud text-blue-500", experience: 4 },
            ].map((tech, index) => (
            <motion.div
                key={index}
                className="relative bg-white shadow-lg rounded-lg p-5 flex items-center justify-center gap-3 transition transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
            >
                <i className={`bx ${tech.icon} text-3xl`}></i>
                <span className="font-medium">{tech.name}</span>
                <span className="absolute top-0 right-0 bg-muted-blue text-white text-xs px-2 py-1 rounded-full">
                {tech.experience} yrs
                </span>
            </motion.div>
            ))}
        </div>

        {/* IDEs & Development Tools */}
        <h3 className="text-2xl font-semibold text-muted-blue text-center mb-6 flex items-center justify-center border-b-2 border-gray-300 pb-2">
            <i className="bx bx-terminal text-2xl mr-2"></i> IDEs & Development Tools
        </h3>
        <div className="mx-auto max-w-screen-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center mb-10">
            {[
            { name: "VS Code", icon: "bxl-visual-studio text-blue-500", experience: 10 },
            { name: "GitHub", icon: "bxl-github text-black", experience: 8 },
            { name: "Postman", icon: "bx bx-rocket text-orange-600", experience: 6 },
            ].map((tool, index) => (
            <motion.div
                key={index}
                className="relative bg-white shadow-lg rounded-lg p-5 flex items-center justify-center gap-3 transition transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
            >
                <i className={`bx ${tool.icon} text-3xl`}></i>
                <span className="font-medium">{tool.name}</span>
                <span className="absolute top-0 right-0 bg-muted-blue text-white text-xs px-2 py-1 rounded-full">
                {tool.experience} yrs
                </span>
            </motion.div>
            ))}
        </div>

        {/* Photography & Editing */}
        <h3 className="text-2xl font-semibold text-muted-blue text-center mb-6 flex items-center justify-center border-b-2 border-gray-300 pb-2">
            <i className="bx bx-camera text-2xl mr-2"></i> Photography & Editing
        </h3>
        <div className="mx-auto max-w-screen-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center mb-10">
            {[
            { name: "Photoshop", icon: "bxl-adobe text-red-500", experience: 12 },
            { name: "Lightroom", icon: "bxl-adobe text-blue-500", experience: 10 },
            { name: "Exposure X7", icon: "bx bx-image text-purple-500", experience: 3 },
            ].map((photo, index) => (
            <motion.div
                key={index}
                className="relative bg-white shadow-lg rounded-lg p-5 flex items-center justify-center gap-3 transition transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
            >
                <i className={`bx ${photo.icon} text-3xl`}></i>
                <span className="font-medium">{photo.name}</span>
                <span className="absolute top-0 right-0 bg-muted-blue text-white text-xs px-2 py-1 rounded-full">
                {photo.experience} yrs
                </span>
            </motion.div>
            ))}
        </div>

        {/* GIS & Mapping */}
        <h3 className="text-2xl font-semibold text-muted-blue text-center mb-6 flex items-center justify-center border-b-2 border-gray-300 pb-2">
            <i className="bx bx-map text-2xl mr-2"></i> GIS & Mapping
        </h3>
        <div className="mx-auto max-w-screen-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center mb-10">
            {[
            { name: "ESRI", icon: "bx bxs-map-pin text-green-500", experience: 5 },
            { name: "Geoserver", icon: "bx bx-map-alt text-blue-500", experience: 3 },
            { name: "QGIS", icon: "bx bx-globe text-green-500", experience: 4 },
            { name: "PostGIS", icon: "bx bxs-layer text-purple-600", experience: 4 },
            { name: "Leaflet", icon: "bx bx-leaf text-green-500", experience: 3 },
            ].map((gis, index) => (
            <motion.div
                key={index}
                className="relative bg-white shadow-lg rounded-lg p-5 flex items-center justify-center gap-3 transition transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
            >
                <i className={`bx ${gis.icon} text-3xl`}></i>
                <span className="font-medium">{gis.name}</span>
                <span className="absolute top-0 right-0 bg-muted-blue text-white text-xs px-2 py-1 rounded-full">
                {gis.experience} yrs
                </span>
            </motion.div>
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
        <h2 className="text-3xl font-bold text-center text-[#d64933] mb-6">What People Say</h2>
        <div className="relative max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
            >
              <p className="text-lg italic text-gray-800">"{testimonials[currentTestimonial].quote}"</p>
              <p className="mt-4 text-sm font-semibold text-gray-600">
                — {testimonials[currentTestimonial].author}
              </p>
            </motion.div>
          </AnimatePresence>
          <button
            className="mt-6 px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition"
            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Coding;
