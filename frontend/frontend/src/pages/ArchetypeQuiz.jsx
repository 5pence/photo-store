import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import questions from "../archetypeWheel/archetypeQuestions";
import styles from "./ArchetypeQuiz.module.css"; 

const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

const moonPhases = [
  { label: "Never", value: 0, src: "/archetypes/never-moon.png" },
  { label: "Rarely", value: 1, src: "/archetypes/rarely-moon.png" },
  { label: "Sometimes", value: 2, src: "/archetypes/sometimes-moon.png" },
  { label: "Often", value: 3, src: "/archetypes/often-moon.png" },
  { label: "Always", value: 4, src: "/archetypes/always-moon.png" },
];

export default function ArchetypeQuiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [selected, setSelected] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const isFirstQuestion = currentIndex === 0;
  const navigate = useNavigate();
  const prevIndexRef = useRef(currentIndex);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  useEffect(() => {
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    setSelected(null);
  }, [currentIndex]);

  const handleAnswer = (score, archetype) => {
    if (disabled) return;
    setDisabled(true);
    setSelected(score);

    const updatedResponses = {
      ...responses,
      [archetype]: (responses[archetype] || 0) + score,
    };

    setTimeout(() => {
      if (currentIndex < shuffledQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
      } else {
        sessionStorage.setItem("archetypeScores", JSON.stringify(updatedResponses));
        navigate("/archetype-wheel", { state: { responses: updatedResponses } });
      }
      setDisabled(false);
    }, 500);
  };

  if (shuffledQuestions.length === 0) return <div className="p-8">Loading...</div>;

  const current = shuffledQuestions[currentIndex];
  const progress = ((currentIndex + 1) / shuffledQuestions.length) * 100;

  return (
    <div className={`${styles.root} min-h-screen bg-nyanza text-gunmetal font-serif flex flex-col items-center px-4 pt-6 sm:pt-20 pb-12 text-center relative`}>
      <div className="mb-6 sm:mb-16 flex flex-col items-center w-full max-w-md">
        <p className="text-[10px] sm:text-xs italic mb-1 sm:mb-1 mt-2 sm:mt-0">
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
          className="flex flex-col items-center gap-6 sm:gap-10 w-full"
        >
          <div className="min-h-[5rem] sm:min-h-[7rem] flex items-center justify-center">
            <motion.h2
              className="text-base sm:text-xl md:text-2xl font-thin max-w-2xl text-gunmetal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: isFirstQuestion ? 0.6 : 0 }}
            >
              {current.question}
            </motion.h2>
          </div>

          <div className="relative w-full">
            <svg
              height="1"
              width={window.innerWidth < 768 ? "440px" : "500px"}
              className="absolute top-[2.3rem] left-1/2 transform -translate-x-1/2 -translate-y-0.5 z-0 hidden sm:block"
            >
              <line x1="0" y1="1" x2="100%" y2="1" stroke="#2E3D3A" strokeWidth="2" />
            </svg>

            {/* Desktop */}
            <div className="hidden sm:flex justify-center items-center gap-6 relative z-10">
              {moonPhases.map(({ value, label, src }) => (
                <motion.button
                  key={value}
                  className="flex flex-col items-center bg-transparent hover:bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none active:outline-none"
                  onClick={() => handleAnswer(value, current.archetype)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.img
                    src={src}
                    alt={label}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    animate={
                      selected === value && currentIndex === prevIndexRef.current
                        ? { scale: 1.15 }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.3 }}
                  />
                  <span className="text-xs mt-1 text-gunmetal opacity-70">{label}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile */}
            <div className="sm:hidden relative flex justify-center items-center mt-6 mb-10">
              <svg
                width="1"
                height="calc(100% - 40px)"
                viewBox="0 0 2 100"
                preserveAspectRatio="none"
                className="absolute left-[calc(50%-2.8rem)] top-5 bottom-0"
              >
                <line x1="1" y1="0" x2="1" y2="100" stroke="#2E3D3A" strokeWidth="2" />
              </svg>

              <div className="flex flex-col gap-6 relative z-10">
                {moonPhases.map(({ value, label, src }) => (
                  <motion.button
                    key={value}
                    className="flex items-center gap-4 bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none active:outline-none"
                    onClick={() => handleAnswer(value, current.archetype)}
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.img
                      src={src}
                      alt={label}
                      className="w-10 h-10 object-contain"
                      animate={
                        selected === value && currentIndex === prevIndexRef.current
                          ? { scale: 1.1 }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                    />
                    <span className="text-base text-gunmetal font-serif">{label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
