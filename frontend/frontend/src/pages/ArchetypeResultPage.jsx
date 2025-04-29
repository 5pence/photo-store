import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { archetypes } from '../archetypeWheel/data';


export default function ArchetypeResult() {
const { slug } = useParams();
const archetype = archetypes.find((a) => a.slug === slug);
const [showModal, setShowModal] = useState(false);
const [showThanks, setShowThanks] = useState(false);
const [showToast, setShowToast] = useState(false);
const [formData, setFormData] = useState({ name: '', email: '' });
const [submitting, setSubmitting] = useState(false);
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!archetype) return <div className="text-center p-8">Archetype not found.</div>;

const handleJoinClick = () => setShowModal(true);

const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/archetype`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
};

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
    setShowModal(false);
    setShowThanks(true);
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
      <img src={archetype.icon} alt={`${archetype.name} symbol`} className="w-20 h-20 rounded-full object-cover" />
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
      <motion.button onClick={handleJoinClick} className="relative rounded-full bg-lavender w-44 h-44 flex items-center justify-center text-gunmetal font-serif
                transition-all duration-500 ease-out mt-8 hover:bg-lavender
                shadow-[0_10px_20px_rgba(186,133,255,0.25)]
                hover:shadow-[0_15px_25px_rgba(186,133,255,0.35)]
                hover:scale-105 active:scale-95" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 1 }}>
        <motion.img src="/archetypes/handsCircle.png" alt="" className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none rounded-full" animate={{ rotate: 360 }} transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
            }} />
        {/* Text block, nicely spaced */}
        <div className="relative z-10 text-center leading-tight text-gunmetal text-[0.9rem] space-y-1">
          <div>Join</div>
          <div>the</div>
          <div>Circle</div>
        </div>
      </motion.button>
    </motion.div>
    <p className="text-gunmetal mt-12 mb-6 leading-relaxed tracking-wide font-loretta italic">
      Share this moment with someone you love.<br />
      If this stirred something in you, give it as a moment to another who walks the quiet path too.<br />
      No one knows who might cradle a light like this.
    </p>
    <div className="flex justify-center mt-6">
        <button
            onClick={handleCopyLink}
            className="bg-isabelline hover:bg-nyanza text-gunmetal font-serif text-lg px-6 py-2 rounded-full shadow transition-all duration-300"
        >
            Copy Link to Share
        </button>
    </div>
    <AnimatePresence>
        {showToast && (
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}    
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-lavender text-gunmetal font-serif px-6 py-3 rounded-full shadow-lg"
            >
                <div className="text-lg">Link copied. A new journey begins...</div>
                <div className="text-sm italic mt-1 opacity-80">The quiet path opens to another.</div>
            </motion.div>
        )}
    </AnimatePresence>

    <p className="text-center italic font-loretta tracking-wide text-lg text-gunmetal mt-8 mb-2">
      This sacred space carries no ads, no noise, no algorithms nudging you toward more.<br />
      Everything you see here is shaped with love, care, and supported not by sponsors but by kindness.<br />
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      If something here lit a candle in the quiet, and you'd like to help keep this fire tended -<br />
      Your support helps me keep it gentle, personal, and true. Thank you.
    </p>
    <div className="flex justify-center mt-6">
      <div className="relative">
        <div className="absolute -inset-1.5 rounded-full bg-lavender opacity-40 blur-xl animate-pulse pointer-events-none"></div>
        <a href="https://ko-fi.com/spencersstudio" target="_blank" rel="noopener noreferrer">
          <button className="relative bg-isabelline hover:bg-nyanza text-gunmetal font-serif text-lg px-8 py-4 rounded-full shadow transition-all duration-300 z-10">
            Support the Circle
          </button>
        </a>
      </div>
    </div>
    <p className="text-center italic font-loretta tracking-wide text-lg text-gunmetal mt-8 mb-2">
        As a thank you for your kindness, you’ll receive the full Archetype Series album (12 songs) — a gift for your journey, from TØOR.
    </p>
  </div>
  {/* Parting Message (optional) */}
  {archetype.partingMessage && (
  <div className="max-w-3xl mx-auto mt-10 bg-melon p-6 rounded-xl shadow">
    <div className="mt-4 text-center">
      <div className='items-center justify-items-center'>
      </div>
    </div>
    <p className="italic text-base">{archetype.partingMessage}</p>
    <div className="flex justify-center items-center space-x-6 mt-6">
      <button onClick={()=> window.location.href = "/archetype-wheel"}
        className="bg-lavender hover:bg-isabelline text-hookers-green font-serif px-6 py-2 rounded-full shadow transition-all duration-300"
        >
        Return to your results wheel
      </button>


    </div>
  </div>
  )}

  {/* Modal */}
  {showModal && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={() => setShowModal(false)} // click outside to close
  >
    <div
      className="relative bg-isabelline p-8 rounded-xl max-w-md w-full shadow-xl"
      onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
    >
      {/* Close button */}
      <button
        className="absolute top-3 right-4 text-gunmetal text-4xl bg-isabelline hover:bg-hookers-green hover:text-isabelline transition"
        onClick={() => setShowModal(false)}
        aria-label="Close modal"
      >
        &times;
      </button>

      <h2 className="text-xl font-serif text-gunmetal text-center mb-4">🌕 Welcome, wanderer</h2>
      <p className="font-loretta text-center mb-4">
        You’re about to enter the quiet circle where the stories continue.<br /><br />
        Would you like to receive occasional letters from the circle?<br />
        They carry reflections, archetype songs, and rare offerings — no noise, no clutter.
      </p>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <input aria-label="name area" type="text" placeholder="Your Name" required className="w-full p-2 rounded border border-gray-300" value={formData.name} onChange={(e)=> setFormData({ ...formData, name: e.target.value })} />
        <input aria-label="email area" type="email" placeholder="Your Email" required className="w-full p-2 rounded border border-gray-300" value={formData.email} onChange={(e)=> setFormData({ ...formData, email: e.target.value })} />
        <button type="submit" disabled={submitting} className="w-full bg-lavender text-gunmetal text-lg py-2 rounded-full hover:bg-pale-dogwood">
          {submitting ? "Sending..." : "Join"}
        </button>
      </form>
      <p className="text-center mt-4 text-base text-gray-600 italic">
        This isn’t a funnel. It’s a fireside.<br />
        I don’t sell data. I don’t chase clicks.<br />
        Just quiet emails for kind souls — handwritten in spirit, if not in ink.<br />
        For people, not users.
      </p>
    </div>
  </div>
)}
  {showThanks && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-isabelline p-8 rounded-xl max-w-md w-full shadow-xl text-center">
      <h2 className="text-xl font-serif text-gunmetal mb-3">🌕 You’re in the circle</h2>
      <p className="font-loretta text-gunmetal leading-relaxed mb-4">
        A quiet letter will find its way to your inbox soon.<br />
        If you’d like to help keep this space alight, you can offer your kindness below.
      </p>
      <a
        href="https://ko-fi.com/spencersstudio"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <button className="bg-nyanza hover:bg-hookers-green hover:text-isabelline text-gunmetal font-serif text-lg px-6 py-2 rounded-full shadow transition">
          Support the Circle
        </button>
      </a>
      <button
        onClick={() => setShowThanks(false)}
        className="mt-6 text-sm text-gunmetal underline hover:text-hookers-green transition"
      >
        Close
      </button>
    </div>
  </div>
)}



</div>
);
}