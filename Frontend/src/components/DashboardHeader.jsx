import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hook/authHook";

export function DashboardHeader() {
  const { logoutMutation } = useAuth();

  return (
    <div className="flex items-center justify-between p-4 bg-white w-full">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">HD</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <Button
        onClick={() => logoutMutation.mutate()}
        className="text-white cursor-pointer bg-sky-600 hover:bg-sky-700 text-sm font-medium"
      >
        Sign out
      </Button>
    </div>
  );
}
