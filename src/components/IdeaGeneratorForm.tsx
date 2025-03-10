
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  targetAudience: z.string().min(1, "Target audience is required"),
  problemArea: z.string().min(1, "Problem area is required"),
});

interface IdeaGeneratorFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  loading: boolean;
}

const IdeaGeneratorForm = ({ onSubmit, loading }: IdeaGeneratorFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      targetAudience: "",
      problemArea: "",
    },
  });

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
