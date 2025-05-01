import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare } from "lucide-react";

interface StudyAssistantCardProps {
  onOpenChat: () => void;
}

export default function StudyAssistantCard({ onOpenChat }: StudyAssistantCardProps) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Study Assistant</h3>
          <Bot className="h-5 w-5 text-neutral-500" />
        </div>
        <div className="bg-neutral-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-neutral-600">
            Ask your AI study assistant for help with your courses, materials, or to create study plans.
          </p>
        </div>
        <Button 
          className="w-full flex items-center justify-center"
          onClick={onOpenChat}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Start a conversation
        </Button>
      </CardContent>
      <CardFooter className="bg-neutral-50 px-5 py-3 border-t border-neutral-200">
        <a href="#assistant-help" className="text-sm font-medium text-primary hover:text-primary-dark flex items-center">
          Learn what assistant can do
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 ml-1"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </CardFooter>
    </Card>
  );
}
