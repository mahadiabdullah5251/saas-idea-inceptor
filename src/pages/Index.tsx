
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          SaaS Development Suite
        </h1>
        <p className="text-lg text-center text-slate-300 mb-12 max-w-2xl mx-auto">
          Generate innovative SaaS ideas and get step-by-step guidance to bring them to life
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 bg-slate-800/50 border-slate-700 hover:border-teal-500 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-teal-400">Idea Generator</h2>
            <p className="text-slate-300 mb-6">
              Generate innovative SaaS ideas using AI analysis of market trends and opportunities.
            </p>
            <Button 
              onClick={() => navigate("/generate")}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            >
              Generate Ideas
            </Button>
          </Card>

          <Card className="p-6 bg-slate-800/50 border-slate-700 hover:border-teal-500 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-teal-400">Idea Execution</h2>
            <p className="text-slate-300 mb-6">
              Get step-by-step guidance to validate and execute your SaaS idea successfully.
            </p>
            <Button 
              onClick={() => navigate("/execute")}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            >
              Plan Execution
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
