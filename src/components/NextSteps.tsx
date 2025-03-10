
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clipboard, FileText } from "lucide-react";
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
    <Card className="p-6 bg-slate-800/50 border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-teal-400">What's Next?</h2>
      
      {hasIdeas ? (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-teal-400 mt-0.5" size={18} />
            <div>
              <h3 className="font-medium text-slate-200">Ideas Generated</h3>
              <p className="text-sm text-slate-300">You've successfully generated SaaS ideas</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clipboard className="text-slate-300 mt-0.5" size={18} />
            <div>
              <h3 className="font-medium text-slate-200">Save Your Ideas</h3>
              <p className="text-sm text-slate-300 mb-2">Keep your ideas for future reference</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-slate-300 border-slate-600 hover:bg-slate-700"
                onClick={copyToClipboard}
              >
                Copy to Clipboard
              </Button>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <FileText className="text-slate-300 mt-0.5" size={18} />
            <div>
              <h3 className="font-medium text-slate-200">Plan Execution</h3>
              <p className="text-sm text-slate-300 mb-2">Move forward with your favorite idea</p>
              <Button 
                className="bg-teal-500 hover:bg-teal-600 text-white"
                size="sm"
                onClick={() => navigate("/execute")}
              >
                Start Execution Plan <ArrowRight className="ml-1" size={16} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-slate-300">
            After generating ideas, you can:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-teal-400" size={16} />
              <span>Save your favorite ideas</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-teal-400" size={16} />
              <span>Create an execution plan</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-teal-400" size={16} />
              <span>Refine and develop your concept</span>
            </li>
          </ul>
        </div>
      )}
    </Card>
  );
};

export default NextSteps;
