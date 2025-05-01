import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Users, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function GroupStudyCard() {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Group Study</h3>
          <Users className="h-5 w-5 text-neutral-500" />
        </div>
        <div className="mb-4 h-32 bg-gradient-to-r from-blue-100 to-blue-200 rounded-md flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16 text-primary" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <h4 className="font-medium text-neutral-800 mb-2">Chemistry Group Project</h4>
        <div className="flex items-center mb-3">
          <CalendarDays className="h-3 w-3 text-neutral-400 mr-1" />
          <span className="text-xs text-neutral-500">Tomorrow, 3:00 PM</span>
        </div>
        <div className="flex -space-x-2 overflow-hidden">
          <Avatar className="h-6 w-6 border-2 border-white">
            <AvatarFallback className="bg-primary-light text-primary-dark">A</AvatarFallback>
          </Avatar>
          <Avatar className="h-6 w-6 border-2 border-white">
            <AvatarFallback className="bg-primary-light text-primary-dark">B</AvatarFallback>
          </Avatar>
          <Avatar className="h-6 w-6 border-2 border-white">
            <AvatarFallback className="bg-primary-light text-primary-dark">C</AvatarFallback>
          </Avatar>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-neutral-500 ring-2 ring-white">
            <span className="text-xs font-medium">+2</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-neutral-50 px-5 py-3 border-t border-neutral-200">
        <a href="#group-study" className="text-sm font-medium text-primary hover:text-primary-dark flex items-center">
          Manage group sessions
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
