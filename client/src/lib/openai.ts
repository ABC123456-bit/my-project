import { apiRequest } from "./queryClient";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  message: ChatMessage;
}

export const sendChatMessage = async (messages: ChatMessage[]): Promise<ChatResponse> => {
  try {
    const response = await apiRequest("POST", "/api/chat", { messages });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || "Failed to get response from the assistant.";
      
      if (response.status === 503) {
        // Service unavailable - likely API key quota issue
        throw new Error("The AI assistant is currently unavailable. Please try again later.");
      }
      
      throw new Error(errorMessage);
    }
    
    return response.json();
  } catch (error) {
    // Return a graceful error as a chat message
    return {
      message: {
        role: "assistant",
        content: error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later."
      }
    };
  }
};
