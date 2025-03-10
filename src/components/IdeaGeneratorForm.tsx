
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Lightbulb, Wand2 } from "lucide-react";

const formSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  targetAudience: z.string().min(1, "Target audience is required"),
  problemArea: z.string().min(1, "Problem area is required"),
  customPrompt: z.string().optional(),
});

interface IdeaGeneratorFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  loading: boolean;
}

const IdeaGeneratorForm = ({ onSubmit, loading }: IdeaGeneratorFormProps) => {
  const [showPromptGuide, setShowPromptGuide] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      targetAudience: "",
      problemArea: "",
      customPrompt: "",
    },
  });

  const togglePromptGuide = () => {
    setShowPromptGuide(!showPromptGuide);
  };

  const toggleCustomPrompt = () => {
    setShowCustomPrompt(!showCustomPrompt);
  };

  const applyPromptTemplate = (template: string) => {
    form.setValue("customPrompt", template);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-200">Industry</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetAudience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-200">Target Audience</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="bg-slate-700 border-slate-600 text-slate-200"
                  placeholder="e.g., Small Business Owners"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="problemArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-200">Problem Area</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="bg-slate-700 border-slate-600 text-slate-200"
                  placeholder="e.g., Customer Support Automation"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <Button 
            type="button"
            variant="ghost" 
            onClick={togglePromptGuide}
            className="w-full justify-between mb-2 bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-teal-400"
          >
            <div className="flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              Prompt Engineering Guide
            </div>
            {showPromptGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          
          {showPromptGuide && (
            <Card className="p-4 mb-4 bg-slate-700/30 border-slate-600 text-sm text-slate-300 space-y-3 animate-in fade-in-0 zoom-in-95">
              <h3 className="font-medium text-teal-400">How to craft better prompts:</h3>
              <ul className="space-y-2 pl-5 list-disc">
                <li>Be specific about your target market and customer segments</li>
                <li>Describe the problem in detail, not just the solution you imagine</li>
                <li>Include constraints and requirements (budget, timeline, tech stack)</li>
                <li>Specify the format you want responses in (business model, features, etc.)</li>
                <li>Use iterative prompting - start general, then get more specific</li>
              </ul>
              
              <div className="pt-2 space-y-2">
                <p className="font-medium text-teal-400">Example templates:</p>
                <div className="space-y-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left text-xs bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:text-teal-400"
                    onClick={() => applyPromptTemplate("Generate a SaaS idea for [industry] focused on solving [specific problem] for [target audience]. Include potential features, pricing model, and competitive advantage.")}
                  >
                    <Wand2 className="w-3 h-3 mr-2" />
                    Comprehensive Business Idea Template
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left text-xs bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:text-teal-400"
                    onClick={() => applyPromptTemplate("What are the top 3 unsolved problems in [industry] for [target audience] that could be addressed with a software solution?")}
                  >
                    <Wand2 className="w-3 h-3 mr-2" />
                    Problem Discovery Template
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left text-xs bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:text-teal-400"
                    onClick={() => applyPromptTemplate("Design a minimal viable product (MVP) for a SaaS solution in [industry] that solves [problem] for [target audience]. Focus on core features only.")}
                  >
                    <Wand2 className="w-3 h-3 mr-2" />
                    MVP Scoping Template
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div>
          <Button 
            type="button"
            variant="ghost" 
            onClick={toggleCustomPrompt}
            className="w-full justify-between mb-2 bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-teal-400"
          >
            <div className="flex items-center">
              <Wand2 className="w-4 h-4 mr-2" />
              Custom Prompt
            </div>
            {showCustomPrompt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          
          {showCustomPrompt && (
            <FormField
              control={form.control}
              name="customPrompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Add more specific requirements for your SaaS idea generation..."
                      className="min-h-[100px] bg-slate-700 border-slate-600 text-slate-200"
                    />
                  </FormControl>
                  <FormDescription className="text-slate-400 text-xs">
                    Add additional context, constraints, or specific requirements to guide the idea generation process.
                  </FormDescription>
                </FormItem>
              )}
            />
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-teal-500 hover:bg-teal-600"
          disabled={loading}
        >
          {loading ? "Generating Ideas..." : "Generate Ideas"}
        </Button>
      </form>
    </Form>
  );
};

export default IdeaGeneratorForm;
