import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { mockAnalytics } from '../data/mockData';

const Analytics: React.FC = () => {
  const { ticketsByPriority, ticketsByType, sentimentDistribution, responseTimeByTeam } = mockAnalytics;

  const priorityData = Object.entries(ticketsByPriority);
  const typeData = Object.entries(ticketsByType);
  const sentimentData = Object.entries(sentimentDistribution);
  const responseData = Object.entries(responseTimeByTeam);

  const getBarWidth = (value: number, max: number) => `${(value / max) * 100}%`;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technical': return 'bg-blue-500';
      case 'billing': return 'bg-purple-500';
      case 'general': return 'bg-green-500';
      case 'feature_request': return 'bg-indigo-500';
      case 'bug_report': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-500';
      case 'negative': return 'bg-red-500';
      case 'neutral': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Detailed insights into your customer support performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">SLA Compliance</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{mockAnalytics.slaCompliance}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${mockAnalytics.slaCompliance}%` }}
                ></div>
              </div>
            </div>
            <Target className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{mockAnalytics.avgResolutionTime}h</p>
              <p className="text-sm text-green-600 mt-1">-15% from last month</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{mockAnalytics.customerSatisfaction}/5</p>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-lg ${i < Math.floor(mockAnalytics.customerSatisfaction) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">94.2%</p>
              <p className="text-sm text-green-600 mt-1">+2.1% improvement</p>
            </div>
            <Activity className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tickets by Priority */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Tickets by Priority</h2>
          </div>
          <div className="space-y-4">
            {priorityData.map(([priority, count]) => {
              const maxValue = Math.max(...priorityData.map(([, v]) => v));
              return (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 w-24">
                    <span className="text-sm font-medium text-gray-900 capitalize">{priority}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${getPriorityColor(priority)}`}
                        style={{ width: getBarWidth(count, maxValue) }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tickets by Type */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <PieChart className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Tickets by Type</h2>
          </div>
          <div className="space-y-4">
            {typeData.map(([type, count]) => {
              const maxValue = Math.max(...typeData.map(([, v]) => v));
              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 w-32">
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${getTypeColor(type)}`}
                        style={{ width: getBarWidth(count, maxValue) }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Customer Sentiment</h2>
          </div>
          <div className="space-y-4">
            {sentimentData.map(([sentiment, count]) => {
              const maxValue = Math.max(...sentimentData.map(([, v]) => v));
              const percentage = ((count / mockAnalytics.totalTickets) * 100).toFixed(1);
              return (
                <div key={sentiment} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 w-20">
                    <span className="text-sm font-medium text-gray-900 capitalize">{sentiment}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${getSentimentColor(sentiment)}`}
                        style={{ width: getBarWidth(count, maxValue) }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                    {count} ({percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Response Time by Team */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Clock className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Avg Response Time by Team</h2>
          </div>
          <div className="space-y-4">
            {responseData.map(([team, time]) => {
              const maxTime = Math.max(...responseData.map(([, v]) => v));
              return (
                <div key={team} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 w-40">
                    <span className="text-sm font-medium text-gray-900">{team}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-blue-500"
                        style={{ width: getBarWidth(time, maxTime) }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{time}h</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">AI Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
            <div className="text-sm text-gray-600">Auto-replies Sent</div>
            <div className="text-xs text-green-600 mt-1">+23% this week</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">89.3%</div>
            <div className="text-sm text-gray-600">Successful Auto-routing</div>
            <div className="text-xs text-green-600 mt-1">+5.2% improvement</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
            <div className="text-sm text-gray-600">Escalated Cases</div>
            <div className="text-xs text-green-600 mt-1">-8% from last week</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;