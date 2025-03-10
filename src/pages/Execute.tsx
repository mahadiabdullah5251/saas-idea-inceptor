
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Execute = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-8 text-slate-300 border-slate-700 hover:bg-slate-700"
        >
          ← Back to Home
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">SaaS Idea Execution Planner</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h2 className="text-xl font-semibold mb-6 text-teal-400">Execution Planning</h2>
            <p className="text-slate-300 mb-4">
              Create a detailed roadmap to turn your SaaS idea into reality. This tool will help you:
            </p>
            <ul className="space-y-2 mb-6 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span>Validate your idea with market research</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span>Create development and marketing roadmaps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span>Plan your business model and pricing strategy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span>Identify potential risks and mitigation strategies</span>
              </li>
            </ul>
            <Button 
              className="w-full bg-teal-500 hover:bg-teal-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Coming Soon"}
            </Button>
          </Card>

          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h2 className="text-xl font-semibold mb-6 text-teal-400">Recently Generated Ideas</h2>
            <p className="text-slate-300 mb-6">
              You haven't generated any ideas yet or need new inspiration?
            </p>
            <Button 
              onClick={() => navigate("/generate")}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            >
              Generate New Ideas
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Execute;
