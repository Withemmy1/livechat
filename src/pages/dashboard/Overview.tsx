import React from 'react';
import { MessageSquare, Users, BarChart3, Settings } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import ChatList from '../../components/ChatList';
import ChatInterface from '../../components/ChatInterface';

export default function Overview() {
  return (
    <div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active Chats"
          value="28"
          icon={<MessageSquare className="h-8 w-8 text-blue-500" />}
          trend="+14%"
        />
        <StatCard
          title="Total Visitors"
          value="1,257"
          icon={<Users className="h-8 w-8 text-green-500" />}
          trend="+21%"
        />
        <StatCard
          title="Response Time"
          value="1.8m"
          icon={<BarChart3 className="h-8 w-8 text-purple-500" />}
          trend="-5%"
        />
        <StatCard
          title="Resolution Rate"
          value="94%"
          icon={<Settings className="h-8 w-8 text-orange-500" />}
          trend="+2%"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChatList />
        <ChatInterface />
      </div>
    </div>
  );
}