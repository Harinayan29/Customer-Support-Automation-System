import React from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  TrendingUp,
  Activity,
  Target
} from 'lucide-react';
import { mockTeams, mockAgents } from '../data/mockData';

const TeamsView: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getWorkloadColor = (workload: number, capacity: number) => {
    const percentage = (workload / capacity) * 100;
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Teams & Agents</h1>
        <p className="text-gray-600 mt-2">Monitor team performance and agent workload</p>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {mockTeams.map((team) => {
          const workloadPercentage = (team.currentWorkload / team.maxCapacity) * 100;
          return (
            <div key={team.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                <Users className="w-5 h-5 text-gray-500" />
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{team.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Team Members</span>
                  <span className="text-sm font-semibold">{team.members.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Current Workload</span>
                  <span className={`text-sm font-semibold px-2 py-1 rounded ${getWorkloadColor(team.currentWorkload, team.maxCapacity)}`}>
                    {team.currentWorkload}/{team.maxCapacity}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${workloadPercentage >= 90 ? 'bg-red-500' : workloadPercentage >= 70 ? 'bg-orange-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(workloadPercentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="pt-2">
                  <span className="text-xs text-gray-500">Specializations:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {team.specialization.map((spec, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {spec.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agents Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Agent Performance</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockAgents.map((agent) => (
              <div key={agent.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-500">{agent.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
                    <span className="text-sm capitalize text-gray-600">{agent.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{agent.currentTickets}</div>
                    <div className="text-xs text-gray-500">Active Tickets</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{agent.resolvedToday}</div>
                    <div className="text-xs text-gray-500">Resolved Today</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-4 h-4 text-blue-500 mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{agent.avgResponseTime}h</div>
                    <div className="text-xs text-gray-500">Avg Response</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Performance Score</span>
                    <span className="font-semibold text-green-600">
                      {Math.floor(85 + Math.random() * 10)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${85 + Math.random() * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Agents</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{mockAgents.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Online Agents</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {mockAgents.filter(a => a.status === 'online').length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {(mockAgents.reduce((acc, agent) => acc + agent.avgResponseTime, 0) / mockAgents.length).toFixed(1)}h
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Resolved Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {mockAgents.reduce((acc, agent) => acc + agent.resolvedToday, 0)}
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsView;