import { Ticket, Team, Agent, Analytics } from '../types';

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    status: 'online',
    currentTickets: 8,
    resolvedToday: 12,
    avgResponseTime: 1.2
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@company.com',
    status: 'busy',
    currentTickets: 15,
    resolvedToday: 8,
    avgResponseTime: 2.1
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@company.com',
    status: 'online',
    currentTickets: 6,
    resolvedToday: 15,
    avgResponseTime: 0.9
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james@company.com',
    status: 'offline',
    currentTickets: 0,
    resolvedToday: 18,
    avgResponseTime: 1.5
  }
];

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Technical Support',
    description: 'Handles technical issues, bugs, and integration problems',
    members: [mockAgents[0], mockAgents[1]],
    specialization: ['technical', 'bug_report'],
    currentWorkload: 23,
    maxCapacity: 50
  },
  {
    id: '2',
    name: 'Billing & Finance',
    description: 'Manages billing inquiries, payments, and account issues',
    members: [mockAgents[2]],
    specialization: ['billing'],
    currentWorkload: 6,
    maxCapacity: 25
  },
  {
    id: '3',
    name: 'General Support',
    description: 'Handles general inquiries and feature requests',
    members: [mockAgents[3]],
    specialization: ['general', 'feature_request'],
    currentWorkload: 0,
    maxCapacity: 30
  }
];

export const mockTickets: Ticket[] = [
  {
    id: 'TK-001',
    subject: 'Unable to login to account',
    description: 'I\'ve been trying to log in for the past hour but keep getting an error message. This is urgent as I need to access my data for a client presentation.',
    customer: {
      name: 'John Smith',
      email: 'john.smith@acme.com',
      company: 'Acme Corp'
    },
    priority: 'high',
    status: 'open',
    type: 'technical',
    sentiment: 'negative',
    assignedTeam: 'Technical Support',
    assignedAgent: 'Sarah Johnson',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    slaDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
    tags: ['login', 'urgent', 'authentication'],
    aiClassification: {
      confidence: 0.95,
      suggestedResponse: 'Password reset instructions and account recovery steps',
      autoReplyGenerated: true
    }
  },
  {
    id: 'TK-002',
    subject: 'Question about pricing plans',
    description: 'Hi, I\'m interested in upgrading my plan. Could you help me understand the differences between the Pro and Enterprise plans?',
    customer: {
      name: 'Lisa Wong',
      email: 'lisa@techstartup.io',
      company: 'Tech Startup'
    },
    priority: 'medium',
    status: 'new',
    type: 'general',
    sentiment: 'positive',
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000),
    slaDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000),
    tags: ['pricing', 'upgrade', 'plans'],
    aiClassification: {
      confidence: 0.88,
      suggestedResponse: 'Pricing comparison chart and upgrade benefits',
      autoReplyGenerated: false
    }
  },
  {
    id: 'TK-003',
    subject: 'Billing discrepancy in latest invoice',
    description: 'There seems to be an error in my latest invoice. I was charged twice for the same service. Please investigate and refund the duplicate charge.',
    customer: {
      name: 'Robert Taylor',
      email: 'robert@manufacturing.com',
      company: 'Manufacturing Inc'
    },
    priority: 'high',
    status: 'pending',
    type: 'billing',
    sentiment: 'negative',
    assignedTeam: 'Billing & Finance',
    assignedAgent: 'Emma Davis',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    slaDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
    tags: ['billing', 'refund', 'duplicate-charge'],
    aiClassification: {
      confidence: 0.92,
      suggestedResponse: 'Invoice review and refund process initiation',
      autoReplyGenerated: true
    }
  },
  {
    id: 'TK-004',
    subject: 'Feature request: Dark mode',
    description: 'Would love to see a dark mode option in the application. Many users have been requesting this feature.',
    customer: {
      name: 'Alex Rodriguez',
      email: 'alex@designagency.com',
      company: 'Design Agency'
    },
    priority: 'low',
    status: 'open',
    type: 'feature_request',
    sentiment: 'positive',
    assignedTeam: 'General Support',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    slaDeadline: new Date(Date.now() + 20 * 60 * 60 * 1000),
    tags: ['feature-request', 'ui', 'dark-mode'],
    aiClassification: {
      confidence: 0.85,
      suggestedResponse: 'Acknowledge request and add to product roadmap',
      autoReplyGenerated: false
    }
  },
  {
    id: 'TK-005',
    subject: 'Application crashes when uploading files',
    description: 'Every time I try to upload a file larger than 10MB, the application crashes. This is preventing me from completing my work.',
    customer: {
      name: 'Maria Garcia',
      email: 'maria@consulting.com',
      company: 'Consulting Group'
    },
    priority: 'urgent',
    status: 'new',
    type: 'bug_report',
    sentiment: 'negative',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 60 * 1000),
    slaDeadline: new Date(Date.now() + 1 * 60 * 60 * 1000),
    tags: ['bug', 'crash', 'file-upload', 'urgent'],
    aiClassification: {
      confidence: 0.97,
      suggestedResponse: 'Escalate to technical team for immediate investigation',
      autoReplyGenerated: true
    }
  }
];

export const mockAnalytics: Analytics = {
  totalTickets: 247,
  openTickets: 23,
  resolvedTickets: 224,
  avgResolutionTime: 4.2,
  customerSatisfaction: 4.6,
  slaCompliance: 94.2,
  ticketsByPriority: {
    low: 45,
    medium: 120,
    high: 67,
    urgent: 15
  },
  ticketsByType: {
    technical: 89,
    billing: 56,
    general: 78,
    feature_request: 15,
    bug_report: 9
  },
  sentimentDistribution: {
    positive: 134,
    neutral: 89,
    negative: 24
  },
  responseTimeByTeam: {
    'Technical Support': 2.1,
    'Billing & Finance': 1.8,
    'General Support': 3.2
  }
};