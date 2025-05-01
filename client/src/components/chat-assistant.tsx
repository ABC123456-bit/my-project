import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChatMessage, sendChatMessage } from "@/lib/openai";

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatAssistant({ isOpen, onClose }: ChatAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I'm your Smart Study Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (data) => {
      setMessages((prev) => [...prev, data.message]);
    },
    onError: (error: Error) => {
      // Handle errors from the API
      setMessages((prev) => [
        ...prev, 
        { 
          role: "assistant", 
          content: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later." 
        }
      ]);
      console.error("Chat API Error:", error);
    },
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "" || chatMutation.isPending) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    chatMutation.mutate([...messages, userMessage]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md p-0 flex flex-col h-full">
        <SheetHeader className="bg-primary p-4 text-white">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-white flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Study Assistant
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-primary-dark hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex items-start ${message.role === "user" ? "justify-end" : ""}`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 bg-primary rounded-full h-8 w-8 flex items-center justify-center text-white mr-2">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                
                <div 
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user" 
                      ? "bg-primary bg-opacity-10 text-neutral-800 rounded-tr-none mr-2" 
                      : "bg-neutral-100 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                
                {message.role === "user" && (
                  <div className="flex-shrink-0 bg-neutral-200 rounded-full h-8 w-8 flex items-center justify-center">
                    <User className="h-4 w-4 text-neutral-600" />
                  </div>
                )}
              </div>
            ))}
            
            {chatMutation.isPending && (
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary rounded-full h-8 w-8 flex items-center justify-center text-white mr-2">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-neutral-100 rounded-lg rounded-tl-none px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-neutral-600" />
                    <p className="text-sm text-neutral-600">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="border-t border-neutral-200 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
              disabled={chatMutation.isPending}
            />
            <Button 
              type="submit" 
              disabled={input.trim() === "" || chatMutation.isPending}
              className="ml-2"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
