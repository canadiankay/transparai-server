import { generateRecommendations } from './openai.js';
import { sanitizeInput } from '../utils/sanitize.js';

export const processUserData = async (req, res) => {
  try {
    const { industry, tools, painPoints } = req.body;

    const sanitizedData = {
      industry: sanitizeInput(industry),
      tools: Array.isArray(tools) ? tools.map(sanitizeInput) : [],
      painPoints: sanitizeInput(painPoints)
    };

    if (!sanitizedData.industry || !sanitizedData.tools.length || !sanitizedData.painPoints) {
      return res.status(400).json({ 
        error: "All fields are required.",
        details: {
          industry: !sanitizedData.industry ? "Industry is required" : null,
          tools: !sanitizedData.tools.length ? "At least one tool must be selected" : null,
          painPoints: !sanitizedData.painPoints ? "Pain points description is required" : null
        }
      });
    }

    const formattedData = {
      industry: sanitizedData.industry,
      tools: sanitizedData.tools.join(", "),
      painPoints: sanitizedData.painPoints
    };

    const recommendations = await generateRecommendations(formattedData);

    return res.status(200).json({ 
      success: true,
      recommendations 
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ 
      error: error.message || "Internal server error",
      success: false
    });
  }
};