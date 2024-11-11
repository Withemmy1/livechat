import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
  const trendIsPositive = trend.startsWith('+');
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-700">{value}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-full">{icon}</div>
      </div>
      <div className="mt-4">
        <span className={`text-sm font-medium ${trendIsPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
        <span className="text-sm text-gray-600"> from last week</span>
      </div>
    </div>
  );
}