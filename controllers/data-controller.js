import { generateResponse } from './openai.js';
import { sanitizeInput } from '../utils/sanitize.js';

export const processUserData = async (req, res) => {
  try {
    const { industry, tools, painPoints } = req.body;

    if (!industry || !tools || !painPoints) {
      return res.status(400).json({ 
        error: "Missing required fields",
        details: {
          industry: !industry ? "Industry is required" : null,
          tools: !tools ? "Tools are required" : null,
          painPoints: !painPoints ? "Pain points are required" : null
        }
      });
    }

    const sanitizedData = {
      industry: sanitizeInput(industry),
      tools: Array.isArray(tools) ? tools.map(sanitizeInput) : [sanitizeInput(tools)],
      painPoints: sanitizeInput(painPoints)
    };

    const formattedData = {
      industry: sanitizedData.industry,
      products: sanitizedData.tools.join(", "),
      painPoints: sanitizedData.painPoints
    };

    const aiResponse = await generateResponse(formattedData);

    return res.status(200).json({ 
      success: true,
      recommendations: aiResponse 
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ 
      error: error.message || "Internal server error",
      success: false
    });
  }
};