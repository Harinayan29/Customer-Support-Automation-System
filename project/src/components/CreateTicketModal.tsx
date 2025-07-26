import React, { useState } from 'react';
import { X, Send, Bot, AlertCircle } from 'lucide-react';
import { Ticket } from '../types';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'slaDeadline' | 'aiClassification'>) => void;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    customerName: '',
    customerEmail: '',
    customerCompany: '',
    priority: 'medium' as const,
    type: 'general' as const
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiPreview, setAiPreview] = useState<{
    classification: string;
    sentiment: string;
    suggestedTeam: string;
    confidence: number;
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Simulate AI classification preview when description changes
    if (field === 'description' && value.length > 20) {
      setTimeout(() => {
        const classifications = {
          'login': { type: 'technical', team: 'Technical Support', sentiment: 'negative' },
          'billing': { type: 'billing', team: 'Billing & Finance', sentiment: 'neutral' },
          'bug': { type: 'bug_report', team: 'Technical Support', sentiment: 'negative' },
          'feature': { type: 'feature_request', team: 'General Support', sentiment: 'positive' },
          'help': { type: 'general', team: 'General Support', sentiment: 'neutral' }
        };

        const lowerDesc = value.toLowerCase();
        let matchedType = 'general';
        let matchedData = classifications['help'];

        for (const [keyword, data] of Object.entries(classifications)) {
          if (lowerDesc.includes(keyword)) {
            matchedType = keyword;
            matchedData = data;
            break;
          }
        }

        setAiPreview({
          classification: matchedData.type,
          sentiment: matchedData.sentiment,
          suggestedTeam: matchedData.team,
          confidence: 0.85 + Math.random() * 0.1
        });
      }, 500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newTicket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'slaDeadline' | 'aiClassification'> = {
      subject: formData.subject,
      description: formData.description,
      customer: {
        name: formData.customerName,
        email: formData.customerEmail,
        company: formData.customerCompany || undefined
      },
      priority: formData.priority,
      status: 'new',
      type: aiPreview?.classification as any || formData.type,
      sentiment: aiPreview?.sentiment as any || 'neutral',
      assignedTeam: aiPreview?.suggestedTeam,
      tags: generateTags(formData.subject, formData.description)
    };

    onSubmit(newTicket);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      subject: '',
      description: '',
      customerName: '',
      customerEmail: '',
      customerCompany: '',
      priority: 'medium',
      type: 'general'
    });
    setAiPreview(null);
    onClose();
  };

  const generateTags = (subject: string, description: string): string[] => {
    const text = `${subject} ${description}`.toLowerCase();
    const tags: string[] = [];
    
    const tagMap = {
      'urgent': ['urgent', 'asap', 'immediately', 'critical'],
      'login': ['login', 'sign in', 'authentication', 'password'],
      'billing': ['billing', 'payment', 'invoice', 'charge'],
      'bug': ['bug', 'error', 'crash', 'broken', 'not working'],
      'feature': ['feature', 'request', 'enhancement', 'improvement'],
      'integration': ['api', 'integration', 'webhook', 'sync']
    };

    for (const [tag, keywords] of Object.entries(tagMap)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        tags.push(tag);
      }
    }

    return tags.length > 0 ? tags : ['general'];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Create New Ticket</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@company.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company (Optional)
              </label>
              <input
                type="text"
                value={formData.customerCompany}
                onChange={(e) => handleInputChange('customerCompany', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Acme Corp"
              />
            </div>
          </div>

          {/* Ticket Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Ticket Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the issue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed description of the issue or request..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="technical">Technical</option>
                  <option value="billing">Billing</option>
                  <option value="feature_request">Feature Request</option>
                  <option value="bug_report">Bug Report</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Classification Preview */}
          {aiPreview && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Bot className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-blue-900">AI Classification Preview</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Detected Type:</span>
                  <span className="ml-2 font-medium capitalize">{aiPreview.classification.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-gray-600">Sentiment:</span>
                  <span className="ml-2 font-medium capitalize">{aiPreview.sentiment}</span>
                </div>
                <div>
                  <span className="text-gray-600">Suggested Team:</span>
                  <span className="ml-2 font-medium">{aiPreview.suggestedTeam}</span>
                </div>
                <div>
                  <span className="text-gray-600">Confidence:</span>
                  <span className="ml-2 font-medium">{(aiPreview.confidence * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Create Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;