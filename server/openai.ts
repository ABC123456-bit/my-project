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

    // Check if OpenAI API key is properly configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your-api-key-here") {
      return res.status(503).json({
        message: {
          role: "assistant",
          content: "The AI assistant is not properly configured. Please contact the administrator."
        }
      });
    }

    try {
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
        model: "gpt-3.5-turbo", // Fallback to a more economical model
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
    } catch (apiError: any) {
      console.error("OpenAI API Error:", apiError);
      
      // Handle different types of API errors
      if (apiError.code === 'insufficient_quota') {
        return res.status(503).json({
          message: {
            role: "assistant",
            content: "The AI assistant is currently unavailable due to usage limits. Please try again later or contact support for assistance."
          }
        });
      }
      
      // Fallback to a simple response without OpenAI
      return res.json({
        message: {
          role: "assistant",
          content: "I'm a study assistant that can help with your academic questions. How can I help you today?"
        }
      });
    }
  } catch (error: any) {
    console.error("Server Error:", error);
    
    res.status(500).json({
      message: {
        role: "assistant",
        content: "I'm having trouble processing your request right now. Please try again in a moment."
      }
    });
  }
};
