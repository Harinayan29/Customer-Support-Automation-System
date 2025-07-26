import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TicketsView from './components/TicketsView';
import Analytics from './components/Analytics';
import TeamsView from './components/TeamsView';
import CreateTicketModal from './components/CreateTicketModal';
import { Wrench } from 'lucide-react';
import { Ticket } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

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
    setActiveTab('tickets'); // Switch to tickets view to see the new ticket
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onCreateTicket={() => setIsCreateModalOpen(true)} />;
      case 'tickets':
        return <TicketsView />;
      case 'analytics':
        return <Analytics />;
      case 'teams':
        return <TeamsView />;
      case 'escalations':
      case 'sla':
      case 'performance':
      case 'settings':
        return (
          <div className="p-8 bg-gray-50 min-h-full flex items-center justify-center">
            <div className="text-center">
              <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600">This feature is currently under development.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {renderContent()}
      </main>
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
}

export default App;