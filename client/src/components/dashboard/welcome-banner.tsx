import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

interface WelcomeBannerProps {
  firstName: string;
  scheduledSessions: number;
}

export default function WelcomeBanner({ firstName, scheduledSessions }: WelcomeBannerProps) {
  return (
    <div className="bg-primary rounded-lg shadow-md overflow-hidden mb-6">
      <div className="md:flex">
        <div className="p-6 md:w-2/3">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
            Welcome back, {firstName}!
          </h1>
          <p className="text-primary-light mb-4">
            You have <span className="font-semibold">{scheduledSessions} study sessions</span> scheduled for today.
          </p>
          <Button className="bg-white text-primary hover:bg-primary-light hover:text-white transition-colors">
            <CalendarDays className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
        </div>
        <div className="md:w-1/3 hidden md:block">
          <svg viewBox="0 0 500 300" className="h-full w-full">
            <rect width="100%" height="100%" fill="#2563EB" />
            <circle cx="400" cy="50" r="80" fill="#3B82F6" />
            <circle cx="100" cy="250" r="60" fill="#1D4ED8" />
            <path d="M0,150 Q150,50 300,150 T600,150" stroke="#93C5FD" strokeWidth="8" fill="none" />
            <path d="M0,200 Q150,100 300,200 T600,200" stroke="#93C5FD" strokeWidth="4" fill="none" />
            <g transform="translate(300, 150)">
              <g transform="scale(0.8)">
                <rect x="-40" y="-60" width="80" height="120" rx="10" fill="#FFF" />
                <line x1="-25" y1="-30" x2="25" y2="-30" stroke="#DDD" strokeWidth="4" />
                <line x1="-25" y1="-15" x2="25" y2="-15" stroke="#DDD" strokeWidth="4" />
                <line x1="-25" y1="0" x2="15" y2="0" stroke="#DDD" strokeWidth="4" />
                <circle cx="0" cy="30" r="15" fill="#3B82F6" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
