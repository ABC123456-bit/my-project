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
  const response = await apiRequest("POST", "/api/chat", { messages });
  return response.json();
};
