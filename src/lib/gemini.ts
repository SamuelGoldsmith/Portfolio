import { GoogleGenAI } from "@google/genai";

export async function fetchGeminiBlurb(prodName: string): Promise<string> {
  if (!prodName) return "No summary available.";
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = `Answer all for product: "${prodName}". IMPORTANT: Only provide answers to prompts. Common Issues: List common issues with the product
  Warranty: What is the warranty period for the product and any information such as voids and coverage? Repair Sources: List repair sources for the product and include embeded href links to sources, as well as links to self repair documentation and guides`;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt});

  const result = response;

  if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
    return result.candidates[0].content.parts[0].text.trim();
  }

  return "No summary available.";
}
