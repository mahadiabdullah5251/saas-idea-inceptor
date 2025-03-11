
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IdeaGeneratorForm from "@/components/IdeaGeneratorForm";
import GeneratedIdeas from "@/components/GeneratedIdeas";
import NextSteps from "@/components/NextSteps";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Generate = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [savedIdeaIds, setSavedIdeaIds] = useState<number[]>([]);

  useEffect(() => {
    if (session) {
      fetchSavedIdeaIds();
    }
  }, [session]);

  const fetchSavedIdeaIds = async () => {
    if (!session) return;
    
    try {
      const { data } = await supabase
        .from("ideas")
        .select("title");
      
      // Mark ideas as saved if their titles match saved ideas
      const savedTitles = data?.map(item => item.title) || [];
      
      // Update existing ideas if any are saved
      if (ideas.length > 0) {
        setIdeas(ideas.map(idea => ({
          ...idea,
          saved: savedTitles.includes(idea.title)
        })));
      }
    } catch (error) {
      console.error("Error fetching saved ideas:", error);
    }
  };

  const handleGenerate = async (formData: any) => {
    setLoading(true);
    
    // Log the custom prompt if it exists
    if (formData.customPrompt) {
      console.log("Using custom prompt:", formData.customPrompt);
      toast.info("Using your custom prompt for enhanced results");
    }
    
    // Simulated API call - replace with actual AI integration
    setTimeout(() => {
      const generatedIdeas = [
        {
          id: 1,
          title: "AI-Powered Content Optimization Platform",
          category: "B2B",
          industry: formData.industry,
          feasibilityScore: 85,
          description: "A platform that uses AI to analyze and optimize content for maximum engagement and conversion.",
          saved: false
        },
        {
          id: 2,
          title: "Remote Team Collaboration Suite",
          category: "B2B",
          industry: formData.industry,
          feasibilityScore: 78,
          description: "An all-in-one platform for remote teams to collaborate, communicate, and manage projects effectively.",
          saved: false
        },
      ];

      // Check if any ideas are already saved
      if (session) {
        fetchSavedIdeaIds().then(() => {
          setIdeas(generatedIdeas);
          setLoading(false);
          toast.success("Ideas generated successfully!");
        });
      } else {
        setIdeas(generatedIdeas);
        setLoading(false);
        toast.success("Ideas generated successfully!");
      }
    }, 2000);
  };

  const handleIdeaSaved = (ideaId: number) => {
    setSavedIdeaIds(prev => [...prev, ideaId]);
    
    // Update the ideas array to mark the saved idea
    setIdeas(ideas.map(idea => 
      idea.id === ideaId ? { ...idea, saved: true } : idea
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            className="text-slate-300 border-slate-700 hover:bg-slate-700"
          >
            ← Back to Home
          </Button>

          <div className="flex gap-3">
            {session ? (
              <Button 
                onClick={() => navigate("/saved-ideas")}
                variant="outline"
                className="text-teal-400 border-teal-500/30 hover:bg-teal-500/10"
              >
                My Saved Ideas
              </Button>
            ) : (
              <Button 
                onClick={() => navigate("/auth")}
                variant="outline"
                className="text-teal-400 border-teal-500/30 hover:bg-teal-500/10"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">SaaS Idea Generator</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h2 className="text-xl font-semibold mb-6 text-teal-400">Generate New Ideas</h2>
            <IdeaGeneratorForm onSubmit={handleGenerate} loading={loading} />
          </Card>

          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h2 className="text-xl font-semibold mb-6 text-teal-400">Generated Ideas</h2>
            <GeneratedIdeas 
              ideas={ideas} 
              loading={loading} 
              onIdeaSaved={handleIdeaSaved}
            />
          </Card>
          
          <NextSteps hasIdeas={ideas.length > 0} />
        </div>
      </div>
    </div>
  );
};

export default Generate;
