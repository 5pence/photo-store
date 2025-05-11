import { useEffect } from "react";

const Coding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 pb-12">
      <title>About | Spencers Studio</title>
      <meta name="description" content="Learn more about Spencer Barriball – a developer, photographer, and creative mind." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 ">
        <div>
            <img src="/media/spencer-small.webp" alt="Spencer" className="w-full max-w-[500px] lg:max-w-full mx-auto" />
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
            Because good work isn’t just built - it’s felt.<br />
            The world doesn’t need more noise. Just something true.
            </p>
        </div>
      </div>
      <div className="mt-16 text-center border-t border-misty pt-12 pb-24">
        <p className="text-xl font-light text-charcoal font-serif mb-4">
            Curious to work together, or just say hello?
        </p>
        <a
            href="/contact"
            className="relative mt-6 px-8 py-2 bg-moss/80 backdrop-blur-sm text-seasalt rounded-full font-body tracking-wide shadow-md hover:shadow-[0_0_1.25rem_#41625960] transition-all duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] focus:outline-none focus:ring-0 focus:ring-transparent overflow-hidden group w-fit mx-auto"
        >
            Send a note
             <span className="pointer-events-none absolute inset-0 before:content-[''] before:absolute before:top-0 before:left-[-40%] before:h-full before:w-1/3 before:bg-white/20 before:blur-md before:opacity-70 before:transition-transform before:duration-700 before:ease-out group-hover:before:translate-x-[160%]" />
        </a>
    </div>
    </div>
  );
};

export default Coding;
