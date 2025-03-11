
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast.success("Logged in successfully!");
        navigate("/generate");
      } else {
        // Sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        toast.success("Account created successfully! You can now log in.");
        setIsLogin(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <Button 
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-8 text-slate-300 border-slate-700 hover:bg-slate-700 w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
          <Card className="p-8 bg-slate-800/50 border-slate-700 w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">
              {isLogin ? "Log In" : "Create Account"}
            </h1>
            
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-slate-700/50 border-slate-600 text-slate-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-slate-700/50 border-slate-600 text-slate-200"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-teal-500 hover:bg-teal-600"
                disabled={loading}
              >
                {loading ? "Processing..." : (isLogin ? "Log In" : "Create Account")}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-teal-400 hover:text-teal-300 text-sm font-medium"
              >
                {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
