import React from 'react';
import { 
  Ticket, 
  Clock, 
  TrendingUp, 
  Users,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Star,
  Plus
} from 'lucide-react';
import { mockAnalytics, mockTickets } from '../data/mockData';

interface DashboardProps {
  onCreateTicket?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onCreateTicket }) => {
  const stats = [
    {
      label: 'Total Tickets',
      value: mockAnalytics.totalTickets.toString(),
      icon: Ticket,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      label: 'Open Tickets',
      value: mockAnalytics.openTickets.toString(),
      icon: AlertCircle,
      color: 'bg-orange-500',
      change: '-8%'
    },
    {
      label: 'Avg Resolution Time',
      value: `${mockAnalytics.avgResolutionTime}h`,
      icon: Clock,
      color: 'bg-green-500',
      change: '-15%'
    },
    {
      label: 'Customer Satisfaction',
      value: mockAnalytics.customerSatisfaction.toString(),
      icon: Star,
      color: 'bg-purple-500',
      change: '+5%'
    }
  ];

  const recentTickets = mockTickets.slice(0, 5);
  const urgentTickets = mockTickets.filter(t => t.priority === 'urgent' || t.priority === 'high');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your support overview.</p>
        {onCreateTicket && (
          <button
            onClick={onCreateTicket}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Ticket
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') && stat.label === 'Open Tickets' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last week
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tickets */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Tickets</h2>
          </div>
          <div className="p-0">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                      <span className={`text-xs ${getSentimentColor(ticket.sentiment)}`}>
                        {ticket.sentiment}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{ticket.subject}</h3>
                    <p className="text-sm text-gray-600 mb-2">{ticket.customer.name} • {ticket.customer.company}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(ticket.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="ml-4">
                    {ticket.aiClassification.autoReplyGenerated && (
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        AI Replied
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority & AI Insights */}
        <div className="space-y-6">
          {/* Urgent Tickets */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                Urgent Attention
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {urgentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{ticket.id}</p>
                      <p className="text-xs text-gray-600">{ticket.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">AI Performance</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Classification Accuracy</span>
                  <span className="text-sm font-semibold text-green-600">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Auto-Replies Sent</span>
                  <span className="text-sm font-semibold text-blue-600">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Successful Routing</span>
                  <span className="text-sm font-semibold text-green-600">98.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Escalations Today</span>
                  <span className="text-sm font-semibold text-orange-600">7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;