export interface Ticket {
  id: string;
  subject: string;
  description: string;
  customer: {
    name: string;
    email: string;
    company?: string;
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'open' | 'pending' | 'resolved' | 'closed';
  type: 'technical' | 'billing' | 'general' | 'feature_request' | 'bug_report';
  sentiment: 'positive' | 'neutral' | 'negative';
  assignedTeam?: string;
  assignedAgent?: string;
  createdAt: Date;
  updatedAt: Date;
  slaDeadline: Date;
  tags: string[];
  aiClassification: {
    confidence: number;
    suggestedResponse?: string;
    autoReplyGenerated: boolean;
  };
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: Agent[];
  specialization: string[];
  currentWorkload: number;
  maxCapacity: number;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'busy' | 'offline';
  currentTickets: number;
  resolvedToday: number;
  avgResponseTime: number;
}

export interface Analytics {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  avgResolutionTime: number;
  customerSatisfaction: number;
  slaCompliance: number;
  ticketsByPriority: Record<string, number>;
  ticketsByType: Record<string, number>;
  sentimentDistribution: Record<string, number>;
  responseTimeByTeam: Record<string, number>;
}