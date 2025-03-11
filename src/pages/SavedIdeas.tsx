
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Trash2 } from "lucide-react";

interface SavedIdea {
  id: string;
  title: string;
  category: string;
  industry: string;
  description: string;
  feasibility_score: number;
  created_at: string;
}

const SavedIdeas = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [ideas, setIdeas] = useState<SavedIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate("/auth");
      return;
    }
    
    fetchSavedIdeas();
  }, [session, navigate]);

  const fetchSavedIdeas = async () => {
    try {
      const { data, error } = await supabase
        .from("ideas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setIdeas(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch saved ideas");
    } finally {
      setLoading(false);
    }
  };

  const deleteIdea = async (id: string) => {
    try {
      const { error } = await supabase
        .from("ideas")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setIdeas(ideas.filter(idea => idea.id !== id));
      toast.success("Idea deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete idea");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-8 text-slate-300 border-slate-700 hover:bg-slate-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Your Saved Ideas</h1>
          <Button 
            onClick={() => navigate("/generate")}
            className="bg-teal-500 hover:bg-teal-600"
          >
            Generate New Ideas
          </Button>
        </div>
        
        {loading ? (
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <div className="space-y-4">
              <p className="text-slate-300">Loading your saved ideas...</p>
              <Progress value={66} className="w-full" />
            </div>
          </Card>
        ) : ideas.length === 0 ? (
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <p className="text-slate-300 text-center">
              You don't have any saved ideas yet. Go to the generator to create some!
            </p>
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => navigate("/generate")}
                className="bg-teal-500 hover:bg-teal-600"
              >
                Generate Ideas
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <Card key={idea.id} className="p-5 bg-slate-800/50 border-slate-700 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-teal-400">{idea.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-slate-600 rounded-full text-slate-200">
                      {idea.category}
                    </span>
                    <span className="text-xs px-2 py-1 bg-slate-600 rounded-full text-slate-200">
                      {idea.industry}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">{idea.description}</p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-300">Feasibility:</span>
                      <Progress value={idea.feasibility_score} className="w-20" />
                      <span className="text-sm text-teal-400">{idea.feasibility_score}%</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      onClick={() => deleteIdea(idea.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedIdeas;
