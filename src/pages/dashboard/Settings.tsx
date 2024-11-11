import React from 'react';
import WidgetSetup from '../../components/dashboard/WidgetSetup';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <WidgetSetup />
    </div>
  );
}