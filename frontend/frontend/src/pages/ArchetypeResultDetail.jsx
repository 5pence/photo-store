import { useParams } from "react-router-dom";
import { archetypes } from '../archetypeWheel/data';
import ArchetypeResult  from "../pages/ArchetypeResultPage";

export default function ArchetypeDetailPage() {
  const { slug } = useParams();
  const archetype = archetypes.find((a) => a.slug === slug);

  if (!archetype) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl font-semibold">Archetype not found</h2>
        <p>Please check the link or return to the wheel.</p>
      </div>
    );
  }

  return <ArchetypeResult archetype={archetype} />;
}
