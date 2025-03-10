
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clipboard, FileText, Paintbrush } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface NextStepsProps {
  hasIdeas: boolean;
}

const NextSteps = ({ hasIdeas }: NextStepsProps) => {
  const navigate = useNavigate();

  const copyToClipboard = () => {
    // This would be expanded with actual idea data in a real implementation
    const ideaData = "SaaS Idea: AI-Powered Content Optimization Platform";
    navigator.clipboard.writeText(ideaData)
      .then(() => toast.success("Ideas copied to clipboard"))
      .catch(() => toast.error("Failed to copy ideas"));
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 transition-all duration-300 hover:border-teal-500/50">
      <h2 className="text-xl font-semibold mb-6 text-teal-400 flex items-center gap-2">
        <span className="bg-teal-500/10 p-2 rounded-lg">
          <Paintbrush className="w-5 h-5" />
        </span>
        What's Next?
      </h2>
      
      {hasIdeas ? (
        <div className="space-y-6">
          <div className="group flex items-start gap-3 transition-all duration-300 hover:translate-x-1">
            <span className="mt-0.5 p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
              <CheckCircle className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-medium text-slate-200 group-hover:text-teal-400 transition-colors">Ideas Generated</h3>
              <p className="text-sm text-slate-400">You've successfully generated SaaS ideas</p>
            </div>
          </div>
          
          <div className="group flex items-start gap-3 transition-all duration-300 hover:translate-x-1">
            <span className="mt-0.5 p-1.5 rounded-lg bg-slate-700/50 text-slate-300 group-hover:bg-teal-500/10 group-hover:text-teal-400">
              <Clipboard className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-medium text-slate-200 group-hover:text-teal-400 transition-colors">Save Your Ideas</h3>
              <p className="text-sm text-slate-400 mb-3">Keep your ideas for future reference</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-teal-400 transition-all duration-300"
                onClick={copyToClipboard}
              >
                Copy to Clipboard
              </Button>
            </div>
          </div>
          
          <div className="group flex items-start gap-3 transition-all duration-300 hover:translate-x-1">
            <span className="mt-0.5 p-1.5 rounded-lg bg-slate-700/50 text-slate-300 group-hover:bg-teal-500/10 group-hover:text-teal-400">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-medium text-slate-200 group-hover:text-teal-400 transition-colors">Plan Execution</h3>
              <p className="text-sm text-slate-400 mb-3">Move forward with your favorite idea</p>
              <Button 
                className="bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300 group-hover:translate-x-1"
                size="sm"
                onClick={() => navigate("/execute")}
              >
                Start Execution Plan 
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <p className="text-slate-300">
            After generating ideas, you can:
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
              <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
                <CheckCircle className="w-4 h-4" />
              </span>
              <span className="text-slate-300">Save your favorite ideas</span>
            </li>
            <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
              <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
                <CheckCircle className="w-4 h-4" />
              </span>
              <span className="text-slate-300">Create an execution plan</span>
            </li>
            <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
              <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
                <CheckCircle className="w-4 h-4" />
              </span>
              <span className="text-slate-300">Refine and develop your concept</span>
            </li>
          </ul>
        </div>
      )}
    </Card>
  );
};

export default NextSteps;
