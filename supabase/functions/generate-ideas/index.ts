
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

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
    const { industry, targetAudience, problemArea, customPrompt } = await req.json();
    
    // Log inputs for debugging
    console.log("Received request:", { industry, targetAudience, problemArea, customPrompt });
    
    // Check if API key is configured
    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return new Response(JSON.stringify({ error: "API key is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Construct the prompt for Gemini
    let prompt = `Generate 3 innovative SaaS business ideas in the ${industry} industry for ${targetAudience} that solve problems related to ${problemArea}.`;
    
    // Add custom prompt if provided
    if (customPrompt && customPrompt.trim()) {
      prompt += ` Additional context: ${customPrompt}`;
    }
    
    prompt += ` For each idea, provide a title, brief description, category, and feasibility score from 0-100. Format the output as a JSON array of objects with properties: title, description, category, feasibilityScore.`;
    
    console.log("Sending prompt to Gemini:", prompt);

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    // Check if API response is successful
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", response.status, errorData);
      return new Response(JSON.stringify({ 
        error: `Gemini API returned ${response.status}`, 
        details: errorData 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log("Gemini API response status:", response.status);
    console.log("Gemini API response headers:", Object.fromEntries(response.headers.entries()));
    console.log("Gemini API response data:", JSON.stringify(data));

    // Extract the generated text
    let generatedText = "";
    if (data.candidates && data.candidates[0]?.content?.parts && data.candidates[0].content.parts[0]?.text) {
      generatedText = data.candidates[0].content.parts[0].text;
      console.log("Generated text:", generatedText);
    } else {
      console.error("Unexpected response format:", JSON.stringify(data));
      return new Response(JSON.stringify({ 
        error: "Unexpected response format from Gemini API",
        response: data
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Try to extract JSON from the response
    let ideas;
    try {
      // Look for JSON in the response (it might be surrounded by markdown code blocks or extra text)
      const jsonMatch = generatedText.match(/\[\s*\{.*\}\s*\]/s);
      if (jsonMatch) {
        ideas = JSON.parse(jsonMatch[0]);
        console.log("Parsed JSON from text match:", ideas);
      } else {
        // If no JSON found, try to parse the whole response
        ideas = JSON.parse(generatedText);
        console.log("Parsed whole text as JSON:", ideas);
      }
    } catch (error) {
      console.error("Failed to parse JSON from Gemini response", error);
      console.log("Text received:", generatedText);
      
      // Fallback: Create structured ideas from the text response
      ideas = processUnstructuredResponse(generatedText, industry);
      console.log("Created fallback ideas:", ideas);
    }

    // Add IDs and industry to each idea
    const formattedIdeas = ideas.slice(0, 3).map((idea: any, index: number) => ({
      id: index + 1,
      title: idea.title || `Business Idea ${index + 1}`,
      description: idea.description || "",
      category: idea.category || "SaaS",
      industry: industry,
      feasibilityScore: idea.feasibilityScore || idea.feasibility_score || Math.floor(Math.random() * 30) + 70,
    }));

    console.log("Formatted ideas:", JSON.stringify(formattedIdeas));

    return new Response(JSON.stringify(formattedIdeas), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in generate-ideas function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Function to process unstructured text responses when JSON parsing fails
function processUnstructuredResponse(text: string, industry: string): any[] {
  console.log("Falling back to text processing");
  
  const ideas = [];
  // Look for numbered sections (1., 2., 3., etc.)
  const sections = text.split(/\d+\.\s+/).filter(Boolean);
  
  // If we found sections, process each one
  if (sections.length >= 2) {
    for (let i = 0; i < Math.min(sections.length, 3); i++) {
      const section = sections[i];
      
      // Try to extract a title (first line or sentence)
      const titleMatch = section.match(/^([^:.]+)[:.]/);
      const title = titleMatch ? titleMatch[1].trim() : `Business Idea ${i + 1}`;
      
      // The rest is the description
      const description = section.replace(title, "").trim();
      
      ideas.push({
        title,
        description,
        category: "SaaS",
        feasibilityScore: Math.floor(Math.random() * 30) + 70
      });
    }
  } else {
    // If no clear sections, create generic ideas from the text
    ideas.push({
      title: "AI-Generated SaaS Idea",
      description: text.substring(0, 200) + "...",
      category: "SaaS",
      feasibilityScore: 85
    });
  }
  
  return ideas;
}
