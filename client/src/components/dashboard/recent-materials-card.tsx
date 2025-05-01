import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FileText, Video, BookOpen } from "lucide-react";

const recentMaterials = [
  {
    id: 1,
    title: "Advanced Calculus Notes",
    accessedTime: "2 hours ago",
    icon: FileText,
  },
  {
    id: 2,
    title: "Physics Lecture 5",
    accessedTime: "yesterday",
    icon: Video,
  },
  {
    id: 3,
    title: "Chemistry Study Guide",
    accessedTime: "3 days ago",
    icon: BookOpen,
  },
];

export default function RecentMaterialsCard() {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Recent Materials</h3>
          <BookOpen className="h-5 w-5 text-neutral-500" />
        </div>
        <ul className="divide-y divide-neutral-200">
          {recentMaterials.map((material) => (
            <li key={material.id} className="py-3 flex items-center">
              <material.icon className="h-5 w-5 text-neutral-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-neutral-800">{material.title}</p>
                <p className="text-xs text-neutral-500">Accessed {material.accessedTime}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="bg-neutral-50 px-5 py-3 border-t border-neutral-200">
        <a href="#materials" className="text-sm font-medium text-primary hover:text-primary-dark flex items-center">
          View all materials
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
