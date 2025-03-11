
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface Idea {
  id: number;
  title: string;
  category: string;
  industry: string;
  feasibilityScore: number;
  description: string;
  saved?: boolean;
}

interface GeneratedIdeasProps {
  ideas: Idea[];
  loading: boolean;
  onIdeaSaved?: (ideaId: number) => void;
}

const GeneratedIdeas = ({ ideas, loading, onIdeaSaved }: GeneratedIdeasProps) => {
  const { session } = useAuth();

  const saveIdea = async (idea: Idea) => {
    if (!session) {
      toast.error("Please login to save ideas");
      return;
    }

    try {
      const { error } = await supabase.from("ideas").insert({
        user_id: session.user.id,
        title: idea.title,
        category: idea.category,
        industry: idea.industry,
        description: idea.description,
        feasibility_score: idea.feasibilityScore,
      });

      if (error) throw error;
      
      toast.success("Idea saved successfully!");
      if (onIdeaSaved) onIdeaSaved(idea.id);
    } catch (error: any) {
      toast.error(error.message || "Failed to save idea");
    }
  };

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-300">Feasibility Score:</span>
              <Progress value={idea.feasibilityScore} className="w-24" />
              <span className="text-sm text-teal-400">{idea.feasibilityScore}%</span>
            </div>
            {!idea.saved && session && (
              <Button 
                size="sm" 
                variant="outline" 
                className="text-teal-400 border-teal-400/30 hover:bg-teal-400/10"
                onClick={() => saveIdea(idea)}
              >
                <Save className="w-4 h-4 mr-1" /> Save
              </Button>
            )}
            {idea.saved && (
              <span className="text-xs px-2 py-1 bg-teal-500/20 rounded-full text-teal-400">
                Saved
              </span>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GeneratedIdeas;
