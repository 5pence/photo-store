import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ArchetypeIntro() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/archetype-quiz");
    }

  return (
    <div className="min-h-screen bg-nyanza text-gunmetal font-poetic flex flex-col items-center justify-center px-4 py-12">
      <motion.h1
        className="text-gunmetal font-poetic font-thin text-xl md:text-3xl mb-4 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        The Old Ones Remember You
      </motion.h1>

      <motion.img
        src="/archetypes/vegvisir.png"
        alt="Vegvísir Symbol"
        className="w-28 h-28 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1.2 }}
      />

      <motion.div
        className="w-full max-w-2xl lg:max-w-3xl bg-isabelline p-10 rounded-xl shadow-md font-poetic font-light md:text-lg leading-loose tracking-wide text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1.5 }}
      >
        <span className="italic text-lg md:text-xl mb-px font-extralight">Heed me when I say the Old Ones remember you.</span>
        <br />
        <br />
        Just as I now remember them. <br />
        There comes a time when the Earth goes quiet. <br />
        And softer voices speak. <br />
        You don’t know where they come from. <br />
        But they know your name.
        <br />
        <br />
        You’ve felt it, <br />
        in the hush between thoughts, <br />
        in the ache sleep cannot soften, <br />
        in the longing that lives beneath your words.
        <br />
        <br />
        This is not a test. <br />
        It is a remembering. <br />
        Of who you are, <br />
        and who you were before the world got too loud.
        <br />
        <br />
        Take a breath. <br />
        Walk softly, the way knows you. <br />
        Let your intuition speak. <br />
        Return to the Circle.
      </motion.div>

      <motion.button
        onClick={handleStart}
        className="relative rounded-full bg-lavender w-40 h-40 flex items-center justify-center text-gunmetal font-poetic
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
        animate={{ rotate: -360 }}
        transition={{
        repeat: Infinity,
        duration: 60,
        ease: "linear",
        }}
    />
  <span className="relative z-10 font-poetic text-gunmetal text-sm tracking-wide">
    Enter
  </span>
</motion.button>



      <motion.p
        className="text-sm italic text-gunmetal mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        Takes just a few minutes. No right answers. Just truth.
      </motion.p>
    </div>
  );
}
