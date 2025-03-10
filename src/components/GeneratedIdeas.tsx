
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Idea {
  id: number;
  title: string;
  category: string;
  industry: string;
  feasibilityScore: number;
  description: string;
}

interface GeneratedIdeasProps {
  ideas: Idea[];
  loading: boolean;
}

const GeneratedIdeas = ({ ideas, loading }: GeneratedIdeasProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <p className="text-slate-300">Analyzing market trends and generating ideas...</p>
        <Progress value={66} className="w-full" />
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <p className="text-slate-300">
        Fill out the form to generate SaaS ideas tailored to your requirements.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {ideas.map((idea) => (
        <Card key={idea.id} className="p-4 bg-slate-700/50 border-slate-600">
          <h3 className="text-lg font-semibold mb-2 text-teal-400">{idea.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-1 bg-slate-600 rounded-full text-slate-200">
              {idea.category}
            </span>
            <span className="text-xs px-2 py-1 bg-slate-600 rounded-full text-slate-200">
              {idea.industry}
            </span>
          </div>
          <p className="text-sm text-slate-300 mb-3">{idea.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-300">Feasibility Score:</span>
            <Progress value={idea.feasibilityScore} className="w-24" />
            <span className="text-sm text-teal-400">{idea.feasibilityScore}%</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GeneratedIdeas;
