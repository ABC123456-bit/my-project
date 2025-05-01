import { HelpCircle, Settings, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-neutral-500">
            <HelpCircle className="h-5 w-5 mr-1" />
            <span className="sr-only sm:not-sr-only">Help Center</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-neutral-500">
            <Settings className="h-5 w-5 mr-1" />
            <span className="sr-only sm:not-sr-only">Settings</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-neutral-500">
            <MessageSquare className="h-5 w-5 mr-1" />
            <span className="sr-only sm:not-sr-only">Feedback</span>
          </Button>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} Smart Study Companion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
