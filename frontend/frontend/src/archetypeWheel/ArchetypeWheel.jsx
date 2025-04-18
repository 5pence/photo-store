import { useEffect, useRef, useState } from "react";
import { archetypes } from "./data";
import gsap from "gsap";
import ArchetypeModal from "../components/ArchetypeModal.jsx";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const names = [
  "The Pathfinder",
  "The Orphan",
  "The Hero",
  "The Lover",
  "The Rebel",
  "The Jester",
  "The Friend",
  "The Sage",
  "The Healer",
  "The Artist",
  "The Ruler",
  "The Magician",
];

export default function ArchetypeWheel({ responses }) {
  const [showOverlay, setShowOverlay] = useState(() => {
    return sessionStorage.getItem("hasSeenWheelIntro") !== "true";
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const [overlayStep, setOverlayStep] = useState(0);
  const [overlayComplete, setOverlayComplete] = useState(false);

  const iconRefs = useRef([]);
  const lineRefs = useRef([]);
  const scoreRefs = useRef([]);
  const radius = 220;
  const center = 250;
  const circleSize = 500;

  const [savedScores, setSavedScores] = useState(() => {
    const stored = sessionStorage.getItem("archetypeScores");
    return stored ? JSON.parse(stored) : responses;
  });

  const scores = names.map((name) => savedScores?.[name] || 0);
  const maxScore = Math.max(...scores);

  const topIndexes = scores
    .map((score, i) => (score === maxScore ? i : -1))
    .filter((i) => i !== -1);
  const topNames = topIndexes.map((i) => names[i]);

  const poeticLine = (() => {
    if (topNames.length === 1) {
      return `Your strongest voice is ${topNames[0]}. Its whisper rises alone.`;
    } else if (topNames.length === 2) {
      return `Your strongest voices are ${topNames[0]} and ${topNames[1]}. Their whispers rise together.`;
    } else {
      const last = topNames.pop();
      return `Your strongest voices are ${topNames.join(", ")}, and ${last}. Their whispers rise together.`;
    }
  })();

  const handleIconClick = (index) => {
    setSelectedArchetype({
      name: names[index],
      description: archetypes[index].description || "A gentle placeholder for now.",
      highlighted: topIndexes.includes(index),
    });
    setModalOpen(true);
  };

  useEffect(() => {
    if (sessionStorage.getItem("hasSeenWheelIntro") === "true") {
      setShowOverlay(false);
      setOverlayComplete(true);
      return;
    }

    const timeouts = [
      setTimeout(() => setOverlayStep(1), 2000),
      setTimeout(() => setOverlayStep(2), 4000),
      setTimeout(() => setOverlayStep(3), 6000),
      setTimeout(() => {
        setShowOverlay(false);
        setOverlayComplete(true);
        sessionStorage.setItem("hasSeenWheelIntro", "true");
      }, 8000),
    ];
    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (showOverlay) return;

    const byScoreDesc = scores
      .map((score, index) => ({ score, index }))
      .sort((a, b) => b.score - a.score);

    const spiralClockwise = [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6];
    const sortedIndices = Array(archetypes.length);
    spiralClockwise.forEach((visualIndex, i) => {
      sortedIndices[visualIndex] = byScoreDesc[i].index;
    });

    sortedIndices.forEach((index, visualIndex) => {
      const angle = (visualIndex / archetypes.length) * 2 * Math.PI - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const score = scores[index];
      const scale = 0.8 + (score / 16) * 0.7;
      const size = 76 * scale;

      const icon = iconRefs.current[index];
      const line = lineRefs.current[index];
      const scoreLabel = scoreRefs.current[index];

      gsap.fromTo(
        icon,
        { opacity: 0, y: 300 },
        {
          opacity: 1,
          x: x,
          y: y,
          duration: 1,
          delay: visualIndex * 0.1,
          ease: "power3.out",
        }
      );

      gsap.to(line, {
        attr: {
          x2: center + radius * Math.cos(angle),
          y2: center + radius * Math.sin(angle),
        },
        duration: 1,
        delay: visualIndex * 0.1,
        ease: "power3.out",
      });

      gsap.to(scoreLabel, {
        opacity: 1,
        x: (radius + size / 2 + 20) * Math.cos(angle),
        y: (radius + size / 2 + 20) * Math.sin(angle),
        delay: visualIndex * 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, [showOverlay]);

  const sortedScores = scores
    .map((score, index) => ({ score, index }))
    .sort((a, b) => b.score - a.score);

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-50 bg-gunmetal text-isabelline flex items-center justify-center font-serif text-xl md:text-2xl text-center px-6"
          >
            <motion.img
              src="archetypes/vegvisir.png"
              alt="Vegvisir"
              initial={{ scale: 1, rotate: 0 }}
              animate={{ scale: 5.5, rotate: 360 }}
              transition={{ duration: 7.5, ease: "easeInOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 opacity-20 origin-center mix-blend-overlay w-[400px] pointer-events-none"
            />
            <div className="relative space-y-4">
              {overlayStep > 0 && <h1 className="animate-fade-slow font-serif text-isabelline p-4">The Old Ones gather.</h1>}
              {overlayStep > 1 && <h1 className="animate-fade-slow font-serif text-isabelline p-4">The Circle turns.</h1>}
              {overlayStep > 2 && <h1 className="animate-fade-slow font-serif text-isabelline p-4">The truth begins to rise.</h1>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showOverlay && (
        <>
          {overlayComplete && (
            <div className="text-center mb-16 text-gunmetal font-serif italic text-base lg:text-lg leading-relaxed tracking-wide">
              {poeticLine}
            </div>
          )}

          <div className="hidden sm:block relative w-[500px] h-[500px] mx-auto my-12">
            <svg width={circleSize} height={circleSize} className="absolute top-0 left-0">
              {archetypes.map((_, i) => (
                <line
                  key={i}
                  ref={(el) => (lineRefs.current[i] = el)}
                  x1={center}
                  y1={center}
                  x2={center}
                  y2={center}
                  stroke={scores[i] === maxScore ? "#997A8D" : "#6A7D76"}
                  strokeWidth={scores[i] === maxScore ? 5 : 1}
                  strokeOpacity="0.9"
                />
              ))}
            </svg>

            {archetypes.map((a, i) => {
              const score = scores[i];
              const isTop = score === maxScore;
              const scale = 0.8 + (score / 16) * 0.7;
              const size = 76 * scale;

              return (
                <div
                  key={a.name}
                  className="absolute left-1/2 top-1/2"
                  ref={(el) => (iconRefs.current[i] = el)}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    marginLeft: `-${size / 2}px`,
                    marginTop: `-${size / 2}px`,
                    cursor: "pointer",
                  }}
                  onClick={() => handleIconClick(i)}
                >
                  <div
                    className={`rounded-full overflow-hidden transition-all duration-500 ${
                      isTop ? "ring-2 border-2 shadow-inner" : "shadow-md"
                    } ${isTop ? "shadow-[0_0_12px_rgba(106,125,118,0.6)]" : ""}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: isTop
                        ? "radial-gradient(ellipse at center, #F1F8F3 10%, #F1EBE5 100%)"
                        : "",
                      borderColor: isTop ? "#997A8D" : undefined,
                    }}
                  >
                    <img src={a.icon} alt={a.name} className="w-full h-full object-contain" />
                  </div>
                </div>
              );
            })}
            {sortedScores.map(({ index }) => (
              <div key={`score-${index}`} className="absolute left-[250px] top-[250px]">
                <div
                  ref={(el) => (scoreRefs.current[index] = el)}
                  className="absolute text-[1rem] text-[#2E3D3A] font-serif z-20"
                  style={{ transform: "translate(-50%, -50%)", opacity: 0 }}
                >
                  {scores[index]}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View: Vertical List */}
          <div className="sm:hidden w-full max-w-sm mx-auto my-8 space-y-3 px-4">
  {sortedScores.map(({ score, index }) => {
    const isTop = score === maxScore;
    return (
      <div
        key={index}
        onClick={() => handleIconClick(index)}
        className={`flex items-center gap-4 p-3 rounded-xl shadow hover:bg-nyanza cursor-pointer transition ${
          isTop ? "bg-isabelline ring-2 ring-[#997A8D]" : "bg-isabelline"
        }`}
      >
        <img
          src={archetypes[index].icon}
          alt={names[index]}
          className="w-12 h-12 object-contain rounded-full"
        />
        <div className="flex-1">
          <p className="font-serif text-base text-gunmetal">{names[index]}</p>
        </div>
        <span className="text-hookers-green font-serif text-lg font-medium">{score}</span>
      </div>
    );
  })}
</div>


          <ArchetypeModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            archetype={selectedArchetype}
          />
        </>
      )}
    </>
  );
}

ArchetypeWheel.propTypes = {
  responses: PropTypes.object.isRequired,
};
