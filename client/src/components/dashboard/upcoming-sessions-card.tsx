import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarDays, Clock } from "lucide-react";

const upcomingSessions = [
  {
    id: 1,
    subject: "Advanced Math",
    topic: "Chapter 4 Review",
    time: "2:30 PM",
    day: "Today",
    duration: "45 min"
  },
  {
    id: 2,
    subject: "Physics Lab",
    topic: "Experiment Preparation",
    time: "4:00 PM",
    day: "Today",
    duration: "60 min"
  }
];

export default function UpcomingSessionsCard() {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Upcoming Sessions</h3>
          <CalendarDays className="h-5 w-5 text-neutral-500" />
        </div>
        <div className="space-y-3">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex">
              <div className="flex-shrink-0 rounded-md bg-primary-light bg-opacity-20 p-2 text-center w-14">
                <span className="text-xs text-primary-dark font-medium">{session.day}</span>
                <span className="block text-lg font-semibold text-primary">{session.time.split(' ')[0]}</span>
                <span className="text-xs text-primary-dark">{session.time.split(' ')[1]}</span>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-semibold text-neutral-800">{session.subject}</h4>
                <p className="text-xs text-neutral-500 mt-1">{session.topic}</p>
                <div className="mt-2 flex items-center">
                  <Clock className="h-3 w-3 text-neutral-400 mr-1" />
                  <span className="text-xs text-neutral-500">{session.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-neutral-50 px-5 py-3 border-t border-neutral-200">
        <a href="#schedule" className="text-sm font-medium text-primary hover:text-primary-dark flex items-center">
          View full schedule
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
