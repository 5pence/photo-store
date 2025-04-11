import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import questions from "../archetypeWheel/archetypeQuestions";

const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

const moonPhases = [
  {
    label: "Never",
    value: 0,
    src: "/archetypes/never-moon.png",
  },
  {
    label: "Rarely",
    value: 1,
    src: "/archetypes/rarely-moon.png",
  },
  {
    label: "Sometimes",
    value: 2,
    src: "/archetypes/sometimes-moon.png",
  },
  {
    label: "Often",
    value: 3,
    src: "/archetypes/often-moon.png",
  },
  {
    label: "Always",
    value: 4,
    src: "/archetypes/always-moon.png",
  },
];

export default function ArchetypeQuiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [selected, setSelected] = useState(null);
  const isFirstQuestion = currentIndex === 0;
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  const handleAnswer = (score, archetype) => {
    if (disabled) return; // prevent double clicking
    setDisabled(true);
    setSelected(score);
    setResponses((prev) => ({
      ...prev,
      [archetype]: (prev[archetype] || 0) + score,
    }));
    setTimeout(() => {
      setSelected(null);
      setDisabled(false);
      if (currentIndex < shuffledQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        navigate("/archetype-wheel", { state: { responses } });
      }
    }, 500);
  };

  if (shuffledQuestions.length === 0) return <div className="p-8">Loading...</div>;

  const current = shuffledQuestions[currentIndex];
  const progress = ((currentIndex + 1) / shuffledQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-nyanza text-gunmetal font-serif flex flex-col items-center px-4 pt-20 pb-12 text-center relative">
        {/* Progress Message and Bar */}
      <div className="mb-16 flex flex-col items-center w-full max-w-md">
        <p className="text-xs italic mb-1">
          Step {currentIndex + 1} of 48 — <span className="text-gunmetal/60">the journey begins in shadow</span>
        </p>
        <div className="w-full h-5 bg-[#d9d9d9] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-hookers-green rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: isFirstQuestion ? 1.2 : 0.6 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-10 w-full"
        >
            <div className="min-h-[7rem] flex items-center justify-center">
                <motion.h2
                className="text-xl md:text-2xl font-thin max-w-2xl text-gunmetal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: isFirstQuestion ? 0.6 : 0 }} // ✨ small delay
                >
                    {current.question}
                </motion.h2>
            </div>
          
          <div className="relative w-full flex justify-center items-center mt-4">
          {/* Connecting line */}
            <svg
                height="1"
                width="30rem"
                className="absolute top-[2.75rem] left-1/2 transform -translate-x-1/2 -translate-y-0.5 z-0"
            >
                <line x1="0" y1="1" x2="100%" y2="1" stroke="#2E3D3A" strokeWidth="2" />
            </svg>

            <div className="flex justify-center items-center gap-6 relative z-10">
                {moonPhases.map(({ value, label, src }) => (
                <motion.button
                    key={value}
                    className="flex flex-col items-center bg-transparent hover:bg-transparent"
                    onClick={() => handleAnswer(value, current.archetype)}
                    whileHover={{ scale: 1, boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.img
                    src={src}
                    alt={label}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    animate={{ scale: selected === value ? 1.2 : 1 }}
                    transition={{
                        duration: 0.4,
                        delay: isFirstQuestion ? 1 + value * 0.05 : 0,
                      }}
                    />
                    <span className="text-xs mt-1 text-gunmetal opacity-70">{label}</span>
                </motion.button>
                ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
