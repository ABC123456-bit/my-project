import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WelcomeBanner from "@/components/dashboard/welcome-banner";
import StudyProgressCard from "@/components/dashboard/study-progress-card";
import RecentMaterialsCard from "@/components/dashboard/recent-materials-card";
import StudyAssistantCard from "@/components/dashboard/study-assistant-card";
import UpcomingSessionsCard from "@/components/dashboard/upcoming-sessions-card";
import GroupStudyCard from "@/components/dashboard/group-study-card";
import GoalsCard from "@/components/dashboard/goals-card";
import ChatAssistant from "@/components/chat-assistant";

export default function Dashboard() {
  const { user } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <WelcomeBanner 
              firstName={user?.username ?? ""}
              scheduledSessions={3}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <StudyProgressCard 
                progress={70}
                completedModules={7}
                totalModules={10}
              />
              
              <RecentMaterialsCard />
              
              <StudyAssistantCard onOpenChat={() => setIsChatOpen(true)} />
              
              <UpcomingSessionsCard />
              
              <GroupStudyCard />
              
              <GoalsCard />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Chat Assistant Modal */}
      <ChatAssistant 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
