import React from 'react';
import { Clock, CheckCircle2, MessageSquare } from 'lucide-react';

interface Chat {
  id: number;
  customer: string;
  avatar: string;
  lastMessage: string;
  time: string;
  status: 'active' | 'resolved' | 'waiting';
  unread: boolean;
}

const chats: Chat[] = [
  {
    id: 1,
    customer: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Hi, I need help with my recent order...',
    time: '5m ago',
    status: 'active',
    unread: true,
  },
  {
    id: 2,
    customer: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Thanks for your help!',
    time: '23m ago',
    status: 'resolved',
    unread: false,
  },
  {
    id: 3,
    customer: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'When will my order arrive?',
    time: '1h ago',
    status: 'waiting',
    unread: true,
  },
  {
    id: 4,
    customer: 'James Miller',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Perfect, thank you!',
    time: '2h ago',
    status: 'resolved',
    unread: false,
  },
];

const statusStyles = {
  active: 'bg-green-100 text-green-800',
  resolved: 'bg-gray-100 text-gray-800',
  waiting: 'bg-yellow-100 text-yellow-800',
};

export default function ChatList() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recent Conversations</h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <MessageSquare className="h-4 w-4 mr-1" />
            {chats.length} Active
          </span>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {chats.map((chat) => (
          <li key={chat.id} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
            <a href="#" className="block">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={chat.avatar}
                      alt={chat.customer}
                    />
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {chat.customer}
                        </p>
                        <div className="ml-2 flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[chat.status]}`}>
                            {chat.status.charAt(0).toUpperCase() + chat.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center">
                        <p className={`text-sm truncate ${chat.unread ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {chat.time}
                      </div>
                      {chat.status === 'resolved' && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}