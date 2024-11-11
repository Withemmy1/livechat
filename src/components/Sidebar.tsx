import React from 'react';
import { MessageSquare, Users, BarChart3, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">ChatFlow</span>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {[
              { name: 'Conversations', icon: MessageSquare, current: true },
              { name: 'Customers', icon: Users, current: false },
              { name: 'Analytics', icon: BarChart3, current: false },
              { name: 'Settings', icon: Settings, current: false },
            ].map((item) => (
              <a
                key={item.name}
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <a href="#" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div className="inline-block h-9 w-9 rounded-full">
                <img
                  className="h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Tom Cook</p>
                <p className="text-xs font-medium text-gray-500">Support Agent</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}