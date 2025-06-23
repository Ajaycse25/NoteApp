
import { Home, Search, Plus, Bell, User } from "lucide-react"

export function BottomNavigation() {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Search", active: false },
    { icon: Plus, label: "Add", active: false },
    { icon: Bell, label: "Notifications", active: false },
    { icon: User, label: "Profile", active: false },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                item.active ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}