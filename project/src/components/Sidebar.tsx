import React from 'react';
import { 
  BarChart3, 
  Ticket, 
  Users, 
  Settings, 
  Home,
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'escalations', label: 'Escalations', icon: AlertCircle },
    { id: 'sla', label: 'SLA Tracking', icon: Clock },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">Support AI</h1>
        <p className="text-slate-400 text-sm mt-1">Intelligent Customer Support</p>
      </div>
      
      <nav className="flex-1 mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-600 border-r-4 border-blue-400' 
                  : 'hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-slate-700">
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-2">AI Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-slate-300">All systems online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;