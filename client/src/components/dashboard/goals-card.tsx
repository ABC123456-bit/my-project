import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Flag, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: number;
  text: string;
  dueDate: string;
  completed: boolean;
}

export default function GoalsCard() {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      text: "Complete Physics Problem Set",
      dueDate: "Yesterday",
      completed: true
    },
    {
      id: 2,
      text: "Review Calculus Chapter 5",
      dueDate: "Today",
      completed: false
    },
    {
      id: 3,
      text: "Prepare Chemistry Lab Report",
      dueDate: "Tomorrow",
      completed: false
    }
  ]);

  const toggleGoalStatus = (id: number) => {
    setGoals(
      goals.map(goal => 
        goal.id === id
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  };

  const handleAddGoal = () => {
    toast({
      title: "Coming soon",
      description: "Goal creation feature will be available soon",
    });
  };

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Study Goals</h3>
          <Flag className="h-5 w-5 text-neutral-500" />
        </div>
        <ul className="space-y-3">
          {goals.map((goal) => (
            <li key={goal.id} className="flex items-start">
              <Checkbox
                id={`goal-${goal.id}`}
                checked={goal.completed}
                onCheckedChange={() => toggleGoalStatus(goal.id)}
                className="mt-1"
              />
              <label
                htmlFor={`goal-${goal.id}`}
                className="ml-3 block"
              >
                <span className={`text-sm font-medium text-neutral-700 ${goal.completed ? 'line-through' : ''}`}>
                  {goal.text}
                </span>
                <span className="block text-xs text-neutral-500">Due: {goal.dueDate}</span>
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="bg-neutral-50 px-5 py-3 border-t border-neutral-200 flex justify-between items-center">
        <a href="#goals" className="text-sm font-medium text-primary hover:text-primary-dark flex items-center">
          View all goals
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
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full text-neutral-500 hover:text-primary hover:bg-neutral-100"
          onClick={handleAddGoal}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
