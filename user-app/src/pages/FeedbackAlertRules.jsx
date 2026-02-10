import React, { useState } from 'react';
import { Bell, AlertTriangle, MessageCircle, Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const FeedbackAlertRules = () => {
  const [alertRules, setAlertRules] = useState([
    {
      id: 1,
      name: 'New Investment Match',
      description: 'Notify when AI finds a new investor match above 80% compatibility',
      type: 'match',
      enabled: true,
      channels: ['email', 'push'],
    },
    {
      id: 2,
      name: 'Connection Request',
      description: 'Alert when someone requests to connect with you',
      type: 'connection',
      enabled: true,
      channels: ['email', 'push'],
    },
    {
      id: 3,
      name: 'Message Received',
      description: 'Notify when you receive a new message',
      type: 'message',
      enabled: false,
      channels: ['push'],
    },
    {
      id: 4,
      name: 'Profile Views',
      description: 'Weekly summary of profile views and engagement',
      type: 'analytics',
      enabled: true,
      channels: ['email'],
    },
    {
      id: 5,
      name: 'Security Alert',
      description: 'Important security notifications and login alerts',
      type: 'security',
      enabled: true,
      channels: ['email', 'push', 'sms'],
    },
  ]);

  const [feedbackSettings, setFeedbackSettings] = useState({
    allowAnonymous: true,
    collectRatings: true,
    requireComments: false,
    autoResponse: true,
  });

  const toggleRule = (id) => {
    setAlertRules(alertRules.map(rule =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'match': return { icon: Bell, color: 'text-purple-500 bg-purple-100' };
      case 'connection': return { icon: MessageCircle, color: 'text-blue-500 bg-blue-100' };
      case 'message': return { icon: MessageCircle, color: 'text-green-500 bg-green-100' };
      case 'analytics': return { icon: Bell, color: 'text-orange-500 bg-orange-100' };
      case 'security': return { icon: AlertTriangle, color: 'text-red-500 bg-red-100' };
      default: return { icon: Bell, color: 'text-gray-500 bg-gray-100' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Feedback & Alert Rules</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your notification preferences and feedback settings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#2d3748] text-white rounded-lg font-medium hover:bg-[#1a202c] transition">
          <Plus className="w-4 h-4" />
          Add Rule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Alert Rules - Left Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg border-2 border-blue-400 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Alert Rules</h2>
              <p className="text-sm text-gray-500">Configure when and how you receive notifications</p>
            </div>

            <div className="divide-y divide-gray-100">
              {alertRules.map((rule) => {
                const { icon: Icon, color } = getTypeIcon(rule.type);
                return (
                  <div key={rule.id} className="p-5 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">{rule.name}</h3>
                        <div className="flex items-center gap-3">
                          <button className="p-1.5 text-gray-400 hover:text-gray-600 transition">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-500 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleRule(rule.id)}
                            className={`transition ${rule.enabled ? 'text-green-500' : 'text-gray-300'}`}
                          >
                            {rule.enabled ? (
                              <ToggleRight className="w-8 h-8" />
                            ) : (
                              <ToggleLeft className="w-8 h-8" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{rule.description}</p>
                      <div className="flex gap-2 mt-3">
                        {rule.channels.map((channel) => (
                          <span
                            key={channel}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize"
                          >
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feedback Settings - Right Column */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border-2 border-blue-400 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Feedback Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Allow Anonymous Feedback</h3>
                  <p className="text-xs text-gray-500">Let users submit feedback anonymously</p>
                </div>
                <button
                  onClick={() => setFeedbackSettings({...feedbackSettings, allowAnonymous: !feedbackSettings.allowAnonymous})}
                  className={`transition ${feedbackSettings.allowAnonymous ? 'text-green-500' : 'text-gray-300'}`}
                >
                  {feedbackSettings.allowAnonymous ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Collect Ratings</h3>
                  <p className="text-xs text-gray-500">Ask users to rate their experience</p>
                </div>
                <button
                  onClick={() => setFeedbackSettings({...feedbackSettings, collectRatings: !feedbackSettings.collectRatings})}
                  className={`transition ${feedbackSettings.collectRatings ? 'text-green-500' : 'text-gray-300'}`}
                >
                  {feedbackSettings.collectRatings ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Require Comments</h3>
                  <p className="text-xs text-gray-500">Make comment field mandatory</p>
                </div>
                <button
                  onClick={() => setFeedbackSettings({...feedbackSettings, requireComments: !feedbackSettings.requireComments})}
                  className={`transition ${feedbackSettings.requireComments ? 'text-green-500' : 'text-gray-300'}`}
                >
                  {feedbackSettings.requireComments ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Auto Response</h3>
                  <p className="text-xs text-gray-500">Send automatic thank you message</p>
                </div>
                <button
                  onClick={() => setFeedbackSettings({...feedbackSettings, autoResponse: !feedbackSettings.autoResponse})}
                  className={`transition ${feedbackSettings.autoResponse ? 'text-green-500' : 'text-gray-300'}`}
                >
                  {feedbackSettings.autoResponse ? (
                    <ToggleRight className="w-8 h-8" />
                  ) : (
                    <ToggleLeft className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Rules</span>
                <span className="font-semibold text-gray-800">{alertRules.filter(r => r.enabled).length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Rules</span>
                <span className="font-semibold text-gray-800">{alertRules.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Feedback Received</span>
                <span className="font-semibold text-gray-800">48</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg. Rating</span>
                <span className="font-semibold text-green-600">4.5 ★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAlertRules;
