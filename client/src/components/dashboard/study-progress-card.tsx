import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LineChart, PieChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StudyProgressCardProps {
  progress: number;
  completedModules: number;
  totalModules: number;
}

export default function StudyProgressCard({ 
  progress, 
  completedModules, 
  totalModules 
}: StudyProgressCardProps) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Study Progress</h3>
          <LineChart className="h-5 w-5 text-neutral-500" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <Progress value={progress} className="h-2.5 flex-grow" />
            <span className="ml-2 text-sm font-medium text-neutral-600">{progress}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">
              {completedModules} of {totalModules} modules completed
            </span>
            <span className="text-primary font-medium">On track</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-neutral-50 px-5 py-3 border-t border-neutral-200">
        <a href="#course-progress" className="text-sm font-medium text-primary hover:text-primary-dark flex items-center">
          View detailed progress
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
