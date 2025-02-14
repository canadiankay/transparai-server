import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OPENAI_API;

const openai = new OpenAI({
  apiKey: APIKEY,
});

async function generateResponse(formData) {
  const { products, industry, painPoints } = formData;

  const prompt = `
  
  I am a small business owner looking to explore AI-powered solutions within the Microsoft ecosystem. Based on the following inputs, provide tailored recommendations on how Microsoft AI tools can enhance my business operations:
  
  - **Current Microsoft products I use:** ${products}
  - **Industry I am in:** ${industry}
  - **My business pain points:** ${painPoints}
  
  Response structure (add 1-3 relevant AI tools):
  Start your sentence with: Here are some recommendations... 
  1. Microsoft Syntex - Document Management Made Easy
  What it does: Syntex uses AI to organize your documents and extract important data from them.
  How it helps you: For example, if you have customer records or service invoices, Syntex can automatically extract key details (like customer name or invoice amount) and organize them for easy access.
  How to start:
  Enable Syntex in SharePoint (your document storage platform).
  Set up automatic categorization rules (e.g., invoices go to a "Finance" folder).
  Syntex will begin scanning and tagging documents for you.
  
  Adressing common concerns(include up to 4):
  1. Is AI trustworthy?
Yes. Microsoft’s AI solutions, like Power BI, show you how they make decisions. For example, Power BI shows the reasoning behind its predictions, so you know how the insights are formed.



  
  Ensure that the response is clear and written in simple language. (e.g Is AI trustworthy?). Dont add too much text. PLAIN & SIMPLE. No * or other symbols. No bold text! Use bullet points/numbers. How to start should be detailed. no emojis. Remote 
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
    console.log(generatedResponse);

    return generatedResponse;
  } catch (error) {
    console.error("OpenAI API Error:", error);

    if (error.response && error.response.status === 429) {
      throw new Error("Too many requests. Please try again later.");
    }

    throw error;
  }
}

export { generateResponse };
