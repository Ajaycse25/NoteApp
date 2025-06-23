import { DashboardHeader } from "./components/DashboardHeader";
import { WelcomeSection } from "./components/WelcomeSection";
import { NotesSection } from "./components/NotesSection";
import { BottomNavigation } from "./components/BottomNavigation";
import { useEffect, useState } from "react";
import { userProfile } from "./services/api";
// Sample data
import { useNote } from "./hook/noteHook";
export default function DashboardPage() {
  const {notes} = useNote();
const [user, setUser] = useState(null);

  useEffect(() => {
    // This effect can be used to fetch user data or notes from an API
    const fetchData = async () => {
      try {
        const userResponse = await userProfile();
        setUser(userResponse.userProfile);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // For now, we are using static data
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Responsive container */}
      <div className=" px-4 sm:px-6 md:px-8 lg:px-16  min-h-screen relative  w-full">
        {/* Header */}
        <DashboardHeader />

        {/* Main content */}
        <div className="pb-28 md:pb-16">
          {/* Welcome section */}
          <WelcomeSection
            userName={user?.name}
            userEmail={user?.email}
          />

          {/* Notes section */}
          <NotesSection notes={notes} />
        </div>

        {/* Optional: Bottom nav only on small screens */}
        <div className="md:hidden fixed bottom-0 left-0 right-0">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
}