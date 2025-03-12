
// Follow Deno's new recommended format for handling requests
Deno.serve(async (req) => {
  // Define CORS headers for browser requests
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

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
    const data = {
      message: `Hello ${name || 'World'}!`,
      timestamp: new Date().toISOString()
    };
    
    return new Response(
      JSON.stringify(data), 
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error("Error in hello-world function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to process request",
        details: error.message 
      }), 
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});
