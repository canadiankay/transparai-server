import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OPENAI_API;

const openai = new OpenAI({
  apiKey: APIKEY,
});

async function generatePackingList(formData) {
  const {
    //inputs from the form
  } = formData;

  // Construct the prompt for OpenAI
  const prompt = `
  
  I am a small business owner looking to explore AI-powered solutions within the Microsoft ecosystem. Based on the following inputs, provide tailored recommendations on how Microsoft AI tools can enhance my business operations:
  
  - **Current Microsoft products I use:** ${input1}
  - **Industry I am in:** ${input2}
  - **My business pain points:** ${input3}
  
  For each recommended Microsoft AI solution, include:  
  1. **Product Name & Description**  Identify which Microsoft AI-powered products best address my pain points. Provide a detailed explanation of what the product does.  
  2. **Use Case Explanation**  Explain specifically how the AI solution can be applied in my business, with real-world examples tailored to my industry.  
  3. **Implementation Guidance**  Provide a high-level overview of how I can start using this solution, including any integrations with my existing Microsoft tools.  
  
  Additionally, address common concerns about AI adoption, including but not limited to:  
  - **Transparency & Explainability**  How does Microsoft ensure AI decisions are clear and understandable?  
  - **Data Privacy & Security**  What measures does Microsoft have in place to protect sensitive business and customer data?  
  - **Bias & Fairness**  How does Microsoft address bias in AI models to ensure fair and ethical outcomes?  
  - **Cost & ROI Considerations**  What pricing models exist, and how can a small business ensure a strong return on investment with AI adoption?  
  
  Ensure that the response is clear and written in simple language. (e.g Is AI trustworthy?). Dont add too much text. PLAIN & SIMPLE. How to start should be detailed. no emojis.
  `;

  try {
    // Make the API request to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert on all Microsoft products, including their features, AI-powered solutions, limitations, constraints, and common customer pain points. Your goal is to provide detailed, accurate, and actionable recommendations for small business owners looking to leverage AI within the Microsoft ecosystem. Ensure responses are clear, in **simple** language, non-technical, and address concerns such as transparency, data privacy, bias, and ROI considerations.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let generatedResponse = response.choices[0].message.content.trim();

    return generatedResponse;
  } catch (error) {
    console.error("OpenAI API Error:", error);

    if (error.response && error.response.status === 429) {
      throw new Error("Too many requests. Please try again later.");
    }

    throw error;
  }
}
