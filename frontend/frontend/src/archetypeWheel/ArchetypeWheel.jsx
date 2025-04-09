import { useEffect, useRef, useState } from "react";
import { archetypes } from "./data";
import gsap from "gsap";
import ArchetypeModal from "../components/ArchetypeModal.jsx";

const scores = [9, 6, 1, 0, 6, 14, 6, 15, 15, 6, 10, 13];
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
    "The King",
    "The Magician"
];

const topScore = Math.max(...scores);
const topIndexes = scores
  .map((score, i) => (score === topScore ? i : -1))
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

export default function ArchetypeWheel() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const wheelRef = useRef(null);
  const spokeRef = useRef(null);
  const iconRefs = useRef([]);

  const radius = 220;
  const maxScore = 16;

  // When clicked
  const handleIconClick = (archetypeIndex) => {
    setSelectedArchetype({
    name: names[archetypeIndex],
    description: archetypes[archetypeIndex].description || "A gentle placeholder for now."
    });
    setModalOpen(true);
  };
  useEffect(() => {
    const rotationTween = gsap.to([wheelRef.current, spokeRef.current], {
      rotation: 360,
      duration: 0,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
      onUpdate: () => {
        const currentRotation = gsap.getProperty(wheelRef.current, "rotation");
        iconRefs.current.forEach((el) => {
          gsap.set(el, { rotation: -currentRotation });
        });
      },
    });

    return () => {
      rotationTween.kill();
      gsap.killTweensOf(iconRefs.current);
    };
  }, [topScore]);

  return (
    <>
      {/* Top voice message */}
      <div className="text-center mb-8 text-[#2E3D3A] font-serif italic text-sm">
        {poeticLine}
      </div>
      <div className="relative w-[500px] h-[500px] mx-auto my-12">
        {/* SVG SPOKES */}
        <div ref={spokeRef} className="absolute inset-0 pointer-events-none z-0">
          <svg width={500} height={500} viewBox="0 0 500 500">
            {archetypes.map((_, i) => {
              const angle = (i / archetypes.length) * 2 * Math.PI;
              const spokeX = 250 + radius * Math.cos(angle);
              const spokeY = 250 + radius * Math.sin(angle);
              const isTop = scores[i] === topScore;

              return (
                <line
                  key={`spoke-${i}`}
                  x1="250"
                  y1="250"
                  x2={spokeX}
                  y2={spokeY}
                  stroke={isTop ? "#997A8D" : "#6A7D76"}
                  strokeWidth={isTop ? 5 : 1}
                  strokeOpacity="0.9"
                />
              );
            })}
          </svg>
        </div>

        {/* ROTATING ICONS */}
        <div ref={wheelRef} className="absolute inset-0 z-10">
          {archetypes.map((a, i) => {
            const angle = (i / archetypes.length) * 2 * Math.PI;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            const score = scores[i];
            const scale = 0.8 + (score / maxScore) * 0.7;
            const size = 76 * scale;
            const offset = size / 2;
            const isTop = score === topScore;

            return (
              <div 
                key={a.name} 
                className="absolute inset-0"
                onClick={() => handleIconClick(i)}
                style={{ cursor: "pointer" }}
              >
                {/* ICON */}
                <div
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `calc(50% + ${x}px - ${offset}px)`,
                    top: `calc(50% + ${y}px - ${offset}px)`,
                    borderRadius: "9999px",
                  }}
                  className="absolute flex items-center justify-center"
                >
                  <div
                    ref={(el) => (iconRefs.current[i] = el)}
                    className={`rounded-full overflow-hidden transition-all duration-500 ${
                      isTop
                        ? "ring-2 border-2 shadow-inner"
                        : "shadow-md"
                    }`}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: isTop
                        ? "radial-gradient(ellipse at center, #F1F8F3 10%, #F1EBE5 100%)"
                        : "",
                      borderColor: isTop ? "#997A8D" : undefined,
                      ringColor: isTop ? "#997A8D" : undefined,
                    }}
                  >
                    <img
                      src={a.icon}
                      alt={a.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* SCORE NUMBER */}
                <div
                  className="absolute text-[1rem] text-[#2E3D3A] font-serif z-20"
                  style={{
                    top: `calc(50% + ${(radius + size * 0.6) * Math.sin(angle)}px)`,
                    left: `calc(50% + ${(radius + size * 0.6) * Math.cos(angle)}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {score}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ArchetypeModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  archetype={selectedArchetype}
/>

    </>
  );
}