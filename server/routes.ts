import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { handleChatRequest } from "./openai";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // OpenAI chat endpoint
  app.post("/api/chat", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to use the chat." });
    }
    handleChatRequest(req, res);
  });

  // Additional API routes could be added here
  // Example: app.get("/api/study-materials", ...)

  const httpServer = createServer(app);

  return httpServer;
}
