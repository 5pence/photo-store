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

  const clients = ["SMS", "Oilennium", "Spiderspun", "Spatialist", "Kainos", "PwC", "L3Harris", "Ocean Infinity", "Code Institute"];

  const testimonials = [
    {
      quote: "I had the pleasure of being mentored by Spencer for my last two projects that I worked on at The Code Institute, both of which I scored a Distinction grade.",
      author: "Derek de Goey, Junior Frontend Developer",
    },
    // ...additional testimonials
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <title>About | Spencers Studio</title>
      <meta name="description" content="Learn more about Spencer Barriball – a developer, photographer, and creative mind." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
        <div>
            <img src="/media/spencer-small.webp" alt="Spencer" className="max-w-full" />
        </div>
        <div>
            <h1 className="text-4xl font-serif font-light text-charcoal">I make things.</h1>
            
            <p className="text-lg mt-6 text-vandyke leading-relaxed">
            With code, with light, with pigment and paper.<br /> 
            With rhythm and language.
            </p>
            
            <p className="text-lg mt-4 text-vandyke">
            By trade, I’m a full-stack developer. By nature, a maker of moments.<br /> 
            I build elegant web applications - clean, fast, thoughtfully designed.<br /> 
            But my work stretches beyond screens.
            </p>

            <p className="text-lg mt-4 text-vandyke">
            I’m also a photographer, a painter, a designer.<br /> 
            I use Adobe tools like a carpenter uses wood - Illustrator, Lightroom, Photoshop, Premiere.<br />
            Sometimes I paint to understand.<br />
            Sometimes I design to express what can’t be said aloud.<br />
            Sometimes I code because it lets me build worlds from logic and light.
            </p>

            <p className="text-lg mt-4 text-vandyke">
            I write to connect. I compose to remember.<br /> 
            My songs are letters I never sent.<br /> 
            My journal is a map I draw as I walk it. 
            </p>

            <p className="text-lg mt-4 text-vandyke">
            What connects it all is story -<br /> 
            that quiet thread in the things we make when we remember who we are.
            </p>

            <p className="text-lg mt-4 text-vandyke">
            So whether I’m capturing a quiet gaze, building an archetype quiz,
            writing a verse, or crafting a mythic homepage -<br />  
            I do it with care.
            </p>

            <p className="text-lg mt-4 text-vandyke font-medium">
            Because beauty matters. <br />
            Because good work isn’t just built — it’s felt.<br />
            The world doesn’t need more noise. Just something true.
            </p>
        </div>
        </div>


      <h2 className="text-3xl font-bold text-center text-yinmn-blue mb-8">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="bg-seasalt p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img src={`/images/icons/${service.image}`} alt={service.title} className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold text-eggplant">{service.title}</h3>
            <p className="text-warm-black mt-2">{service.description}</p>
            <p className="text-moss font-bold mt-4">{service.price}</p>
          </motion.div>
        ))}
      </div>

      <section className="my-20">
        <h2 className="text-2xl font-bold text-center text-charcoal mb-6">Clients</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {clients.map((client, i) => (
            <span key={i} className="bg-misty text-raisin-black px-4 py-2 rounded-full text-sm">{client}</span>
          ))}
        </div>
      </section>

      <section className="mb-20 text-center">
        <h2 className="text-3xl font-semibold text-china-rose mb-8">What People Say</h2>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
            >
              <p className="italic text-eggplant text-lg">{testimonials[currentTestimonial].quote}</p>
              <p className="mt-4 text-sm text-vandyke font-medium">&mdash; {testimonials[currentTestimonial].author}</p>
            </motion.div>
          </AnimatePresence>
          <button
            className="mt-6 px-4 py-2 text-sm bg-charcoal text-seasalt rounded-md hover:bg-charcoal2"
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
