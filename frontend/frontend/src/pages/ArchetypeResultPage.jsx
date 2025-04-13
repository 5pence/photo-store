import { useParams } from 'react-router-dom';
import { archetypes } from '../archetypeWheel/data';


export default function ArchetypeResult() {
  const { slug } = useParams();
  const archetype = archetypes.find((a) => a.slug === slug);

  if (!archetype) return <div className="text-center p-8">Archetype not found.</div>;

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
        <p className="mt-4 text-sm italic">{archetype.affirmationSettle}</p>
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

      {/* Parting Message (optional) */}
      {archetype.partingMessage && (
        <div className="max-w-3xl mx-auto mt-10 bg-melon p-6 rounded-xl shadow">
          <p className="italic text-sm">{archetype.partingMessage}</p>
        </div>
      )}
    </div>
  );
}
