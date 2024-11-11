import React from 'react';
import ChatList from '../../components/ChatList';
import ChatInterface from '../../components/ChatInterface';

export default function Conversations() {
  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <ChatList />
        <ChatInterface />
      </div>
    </div>
  );
}