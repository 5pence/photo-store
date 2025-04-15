import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { archetypes } from '../archetypeWheel/data';


export default function ArchetypeResult() {
  const { slug } = useParams();
  const archetype = archetypes.find((a) => a.slug === slug);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  if (!archetype) return <div className="text-center p-8">Archetype not found.</div>;

  const handleJoinClick = () => setShowModal(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: '', // optional
      message: "I'd love to join the circle.",
    };
  
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (res.ok) {
        window.location.href = "https://ko-fi.com/spencersstudio";
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Network error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-nyanza min-h-screen py-12 px-6 text-[#2E3D3A] font-serif">
      <div className="max-w-3xl mx-auto bg-lavender rounded-xl p-6 shadow-md flex items-center space-x-4">
      <div className="flex items-center space-x-4">
        <img
            src={archetype.icon}
            alt={`${archetype.name} symbol`}
            className="w-20 h-20 rounded-full object-cover"
        />
        <div>
            <h1 className="font-serif text-gunmetal font-thin text-2xl tracking-wide">{archetype.name}</h1>
            <p className="font-serif text-gunmetal font-thin italic relative top-3 tracking-wide">
            {archetype.tagline}
            </p>
        </div>
      </div>
    </div>

      {/* Base Text */}
      <div className="max-w-3xl mx-auto mt-8 space-y-4 text-lg">
        {archetype.base.map((para, i) => (
          <p className='font-loretta text-hookers-green' key={i}>{para}</p>
        ))}
      </div>

      {/* Shadow Section */}
      <div className="max-w-3xl mx-auto mt-10 bg-isabelline p-6 rounded-xl shadow">
        <p className="font-serif italic mb-2 text-hookers-green tracking-wide">{archetype.shadowTag}</p>
        <ul className="font-loretta list-none list-inside space-y-1 text-base text-hookers-green">
          {archetype.shadowList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Reframe Section */}
      <div className="max-w-3xl mx-auto mt-10 bg-isabelline p-6 rounded-xl shadow">
        <p className="font-serif italic mb-2 text-hookers-green tracking-wide">{archetype.reframeTag}</p>
        <p className="font-loretta space-y-1 text-base text-hookers-green">{archetype.reframeText}</p>
      </div>

      {/* Gratitude Section */}
      <div className="max-w-3xl mx-auto mt-10 bg-lavender p-6 rounded-xl shadow space-y-4">
        <h2 className="font-serif italic font-thin text-gunmetal text-2xl">🕯️ {archetype.gratitudeThanks}</h2>
        {archetype.gratitudeIntro.map((para, i) => (
          <p className="font-loretta space-y-1 text-base text-gunmetal" key={i}>{para}</p>
        ))}
        <p className="mt-4 font-loretta space-y-1 text-base text-gunmetal">{archetype.affirmationIntro}</p>
        <blockquote className="border-l-4 border-[#6A7D76] pl-4 text-gunmetal italic">
          {archetype.affirmation.map((line, i) => (
            <p className="font-serif italic font-thin text-gunmetal text-lg" key={i}>{line}</p>
          ))}
        </blockquote>
        <p className="font-serif italic font-thin text-gunmetal text-base">{archetype.affirmationSettle}</p>
      </div>

      {/* Reflection Section */}
      <div className="max-w-3xl mx-auto mt-10 bg-isabelline p-6 rounded-xl shadow">
        <p className="font-serif italic font-thin text-gunmetal text-2xl">🌀 reflection prompt</p>
        <p className="mt-2 ont-serif italic font-thin text-gunmetal text-lg">{archetype.reflectionTag}</p>
        <p className="mt-4 font-loretta space-y-1 text-base text-gunmetal">{archetype.reflectionSettle}</p>
      </div>

      {/* Song Section */}
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <p className="italic">Now breathe, and listen to your song...</p>
        <audio controls className="mt-4 w-full">
          <source src={archetype.song} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Closing Circle Invitation */}
        <div className="max-w-3xl mx-auto mt-16 bg-pale-dogwood p-8 rounded-xl shadow text-center">
        <p className="italic text-gunmetal text-lg mb-4">
            The journey doesn’t end here.
        </p>
        <p className="text-gunmetal mb-6 leading-relaxed font-loretta">
            You’ve glimpsed what stirs in your heart’s horizon.<br />
            There’s one spiral path left still.<br />
            Twelve hands reach out to be met.<br />
            Let this form one remembering.
        </p>

        <motion.div className="w-full flex justify-center">
            <motion.button
            onClick={handleJoinClick}
            className="relative rounded-full bg-lavender w-44 h-44 flex items-center justify-center text-gunmetal font-serif
                transition-all duration-500 ease-out mt-8 hover:bg-lavender
                shadow-[0_10px_20px_rgba(186,133,255,0.25)]
                hover:shadow-[0_15px_25px_rgba(186,133,255,0.35)]
                hover:scale-105 active:scale-95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 1 }}
            >
        <motion.img
            src="/archetypes/handsCircle.png"
            alt=""
            className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none rounded-full"
            animate={{ rotate: 360 }}
            transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
            }}
        />
    {/* Text block, nicely spaced */}
    <div className="relative z-10 text-center leading-tight text-gunmetal text-[0.9rem] space-y-1">
        <div>Join</div>
        <div>the</div>
        <div>Circle</div>
        </div>
    </motion.button>
    </motion.div>
    <p className="text-gunmetal mt-12 mb-6 leading-relaxed font-loretta italic">
            Share this moment with someone you love.<br />
            If this stirred something in you, give it as a moment to another who walks the quiet path too.<br />
            No one knows who might cradle a light like this.
        </p>
            <div className="flex justify-center items-center space-x-6 mt-6">
                <button
                onClick={() => window.location.href = "/archetype-wheel"}
                className="bg-lavender hover:bg-isabelline text-hookers-green font-serif px-6 py-2 rounded-full shadow transition-all duration-300"
                >
                Return to your results wheel
                </button>


            </div>
            </div>
              
      {/* Parting Message (optional) */}
      {archetype.partingMessage && (
        <div className="max-w-3xl mx-auto mt-10 bg-melon p-6 rounded-xl shadow">
          <p className="italic text-base">{archetype.partingMessage}</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-isabelline p-8 rounded-xl max-w-md w-full shadow-xl">
            <h2 className="text-xl font-serif text-gunmetal text-center mb-4">🌕 Welcome, wanderer</h2>
            <p className="font-loretta text-center mb-4">
              You’re about to enter the quiet circle where the stories continue.<br /><br />
              Would you like to receive occasional letters from the circle?<br />
              They carry reflections, archetype songs, and rare offerings — no noise, no clutter.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                required 
                className="w-full p-2 rounded border border-gray-300"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}  
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                required 
                className="w-full p-2 rounded border border-gray-300" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              />
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-lavender text-gunmetal text-lg py-2 rounded-full hover:bg-pale-dogwood">
                {submitting ? "Sending..." : "Join"}
              </button>
            </form>
            <p className="text-center mt-4 text-base text-gray-600 italic">
                This isn’t a funnel.  It’s a fireside.<br />
                I don’t sell data.  I don’t chase clicks.<br />  
                Just quiet emails for kind souls - handwritten in spirit, if not in ink.<br />
                For people, not users.
            </p>

          </div>
        </div>
      )}

    </div>
  );
}
