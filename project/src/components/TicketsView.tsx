import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  ArrowRight,
  Bot,
  MessageCircle,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { mockTickets } from '../data/mockData';
import { Ticket } from '../types';
import CreateTicketModal from './CreateTicketModal';

const TicketsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'slaDeadline' | 'aiClassification'>) => {
    const now = new Date();
    const slaHours = ticketData.priority === 'urgent' ? 1 : 
                     ticketData.priority === 'high' ? 4 : 
                     ticketData.priority === 'medium' ? 8 : 24;
    
    const newTicket: Ticket = {
      ...ticketData,
      id: `TK-${String(tickets.length + 1).padStart(3, '0')}`,
      createdAt: now,
      updatedAt: now,
      slaDeadline: new Date(now.getTime() + slaHours * 60 * 60 * 1000),
      aiClassification: {
        confidence: 0.85 + Math.random() * 0.1,
        suggestedResponse: generateSuggestedResponse(ticketData.type),
        autoReplyGenerated: Math.random() > 0.3
      }
    };

    setTickets(prev => [newTicket, ...prev]);
    setSelectedTicket(newTicket);
  };

  const generateSuggestedResponse = (type: string): string => {
    const responses = {
      technical: 'Technical troubleshooting steps and system diagnostics',
      billing: 'Account review and billing inquiry resolution',
      general: 'General support and information assistance',
      feature_request: 'Feature evaluation and product roadmap consideration',
      bug_report: 'Bug investigation and development team escalation'
    };
    return responses[type as keyof typeof responses] || 'Standard support response';
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😟';
      case 'neutral': return '😐';
      default: return '😐';
    }
  };

  const getTimeUntilSLA = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diff < 0) {
      return { text: 'Overdue', color: 'text-red-600' };
    } else if (hours < 1) {
      return { text: `${minutes}m`, color: 'text-red-600' };
    } else if (hours < 4) {
      return { text: `${hours}h ${minutes}m`, color: 'text-orange-600' };
    } else {
      return { text: `${hours}h ${minutes}m`, color: 'text-green-600' };
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
        <p className="text-gray-600 mt-2">Manage and track customer support tickets</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </button>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tickets List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Tickets ({filteredTickets.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredTickets.map((ticket) => {
              const slaTime = getTimeUntilSLA(ticket.slaDeadline);
              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedTicket?.id === ticket.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className="text-sm">{getSentimentIcon(ticket.sentiment)}</span>
                        {ticket.aiClassification.autoReplyGenerated && (
                          <Bot className="w-4 h-4 text-blue-500" title="AI Auto-reply sent" />
                        )}
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-1">{ticket.subject}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {ticket.customer.name} • {ticket.customer.company}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Created {new Date(ticket.createdAt).toLocaleString()}
                        </div>
                        {ticket.assignedAgent && (
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {ticket.assignedAgent}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4 text-right">
                      <div className={`text-sm font-medium ${slaTime.color}`}>
                        {slaTime.text}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">SLA</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ticket Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {selectedTicket ? (
            <div>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Ticket Details</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-mono text-gray-500">{selectedTicket.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedTicket.subject}</h3>
                  <p className="text-gray-600 text-sm">{selectedTicket.description}</p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">Name:</span> {selectedTicket.customer.name}</div>
                    <div><span className="text-gray-500">Email:</span> {selectedTicket.customer.email}</div>
                    {selectedTicket.customer.company && (
                      <div><span className="text-gray-500">Company:</span> {selectedTicket.customer.company}</div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">AI Classification</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="capitalize">{selectedTicket.type.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sentiment:</span>
                      <span className="capitalize flex items-center">
                        {getSentimentIcon(selectedTicket.sentiment)} {selectedTicket.sentiment}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Confidence:</span>
                      <span>{(selectedTicket.aiClassification.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {selectedTicket.aiClassification.suggestedResponse && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">AI Suggestion</h4>
                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-gray-700">
                      {selectedTicket.aiClassification.suggestedResponse}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Assignment</h4>
                  <div className="space-y-2 text-sm">
                    {selectedTicket.assignedTeam && (
                      <div><span className="text-gray-500">Team:</span> {selectedTicket.assignedTeam}</div>
                    )}
                    {selectedTicket.assignedAgent && (
                      <div><span className="text-gray-500">Agent:</span> {selectedTicket.assignedAgent}</div>
                    )}
                  </div>
                </div>

                {selectedTicket.tags.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTicket.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a ticket to view details</p>
            </div>
          )}
        </div>
      </div>

      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
};

export default TicketsView;