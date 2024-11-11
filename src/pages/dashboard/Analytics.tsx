import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Analytics</h2>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-4" />
            <p>Analytics dashboard coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}