import React, { useState } from 'react';
import { Send, Paperclip, Smile, MoreVertical } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'agent';
  timestamp: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi, I need help with my recent order. It's been 5 days and I haven't received any shipping updates.",
      sender: 'user',
      timestamp: '10:23 AM'
    },
    {
      id: 2,
      content: "Hello Sarah! I'd be happy to help you with that. Could you please provide your order number?",
      sender: 'agent',
      timestamp: '10:24 AM'
    },
    {
      id: 3,
      content: "Sure, it's #ORD-2024-28756",
      sender: 'user',
      timestamp: '10:24 AM'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        content: newMessage,
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Sarah Wilson"
            />
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Sarah Wilson</h2>
              <div className="flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400"></span>
                <span className="ml-2 text-sm text-gray-500">Online</span>
              </div>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender === 'agent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className={`text-xs mt-1 block ${
                message.sender === 'agent' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Smile className="h-5 w-5 text-gray-500" />
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}