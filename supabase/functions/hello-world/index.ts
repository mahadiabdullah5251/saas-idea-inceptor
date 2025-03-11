
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { name } = await req.json();
    
    // Log the request for debugging
    console.log("Received request with name:", name);
    
    // Create the response
    const message = `Hello ${name || 'World'}! This is your Supabase Edge Function.`;
    
    return new Response(JSON.stringify({ 
      message,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in hello-world function:", error);
    
    return new Response(JSON.stringify({ 
      error: "Failed to process request",
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
