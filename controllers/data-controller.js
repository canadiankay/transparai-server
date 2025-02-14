export const processUserData = (req, res, next) => {
    const { industry, tools, painPoints } = req.body;
  
    if (!industry || !tools?.length || !painPoints) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    req.formattedData = {
      industry,
      tools: tools.join(", "),
      painPoints,
    };
  
    // next(); // Pass the processed data to the OpenAI controller
  };
  