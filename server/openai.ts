import OpenAI from "openai";
import type { Request, Response } from "express";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "your-api-key-here"
});

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const handleChatRequest = async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "Invalid request. Messages array is required." });
    }
    
    const lastUserMessage = messages.filter(m => m.role === "user").pop();
    
    if (!lastUserMessage) {
      return res.status(400).json({ message: "No user message found." });
    }

    // Map our app's message format to OpenAI's format
    const openaiMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add a system message for context
    openaiMessages.unshift({
      role: "system",
      content: "You are a helpful AI study assistant for the Smart Study Companion app. You help students with their academic questions, create study plans, explain concepts, and provide learning resources. Be concise, accurate, and educational in your responses."
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: openaiMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = response.choices[0].message;

    res.json({
      message: {
        role: "assistant",
        content: assistantMessage.content || "I'm sorry, I couldn't process that request."
      }
    });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    
    res.status(500).json({
      message: {
        role: "assistant",
        content: "I'm having trouble connecting to my knowledge base right now. Please try again in a moment."
      }
    });
  }
};
