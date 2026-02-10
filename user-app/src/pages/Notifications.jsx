import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, TrendingUp, Users, Star, AlertCircle, CheckCircle } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'connection',
      icon: Users,
      title: 'New Connection Request',
      message: 'John Smith from TechVentures wants to connect with you.',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'message',
      icon: MessageSquare,
      title: 'New Message',
      message: 'Sarah Chen sent you a message about your startup pitch.',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'trending',
      icon: TrendingUp,
      title: 'Your Startup is Trending',
      message: 'Your startup has received 50+ views in the last 24 hours.',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'rating',
      icon: Star,
      title: 'New Rating Received',
      message: 'An investor gave your pitch a 5-star rating.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 5,
      type: 'alert',
      icon: AlertCircle,
      title: 'Profile Verification Pending',
      message: 'Complete your profile verification to unlock all features.',
      time: '2 days ago',
      read: true,
    },
    {
      id: 6,
      type: 'success',
      icon: CheckCircle,
      title: 'Investment Match Found',
      message: 'AI found 3 new investors matching your criteria.',
      time: '3 days ago',
      read: true,
    },
  ]);

  const [filter, setFilter] = useState('all');

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'connection': return 'text-blue-500 bg-blue-100';
      case 'message': return 'text-purple-500 bg-purple-100';
      case 'trending': return 'text-green-500 bg-green-100';
      case 'rating': return 'text-yellow-500 bg-yellow-100';
      case 'alert': return 'text-orange-500 bg-orange-100';
      case 'success': return 'text-emerald-500 bg-emerald-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-gray-800 text-xl font-semibold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <button
          onClick={markAllAsRead}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Mark all as read
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'unread', 'read'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === f
                ? 'bg-[#2d3748] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3 max-w-3xl">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No notifications to show</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition hover:shadow-md ${
                  notification.read ? 'border-gray-200' : 'border-blue-400'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(notification.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Notification Settings Link */}
      <div className="mt-8 max-w-3xl">
        <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Email Notification Settings</h3>
                <p className="text-sm text-gray-500">Manage your email preferences</p>
              </div>
            </div>
            <a
              href="/settings"
              className="px-4 py-2 bg-[#2d3748] text-white rounded-md text-sm font-medium hover:bg-[#1a202c] transition"
            >
              Go to Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
