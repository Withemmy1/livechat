import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

export default function WidgetSetup() {
  const [settings, setSettings] = useState({
    apiKey: '',
    widgetSettings: {
      theme: 'light',
      position: 'right',
      primaryColor: '#0066FF',
      greeting: 'Hi there! How can we help you today?',
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/widget/settings', {
        credentials: 'include',
      });
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const updateSettings = async () => {
    try {
      await fetch('http://localhost:5000/api/widget/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(settings.widgetSettings),
      });
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const regenerateApiKey = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/widget/regenerate-key', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      setSettings({ ...settings, apiKey: data.apiKey });
    } catch (error) {
      console.error('Error regenerating API key:', error);
    }
  };

  const getEmbedCode = () => {
    return `
<!-- ChatFlow Widget -->
<script>
window.ChatflowConfig = {
  key: '${settings.apiKey}',
  options: ${JSON.stringify(settings.widgetSettings)}
};
</script>
<script 
  src="https://widget.chatflow.com/loader.js"
  async
></script>`;
  };

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(getEmbedCode());
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Widget Setup</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">API Key</h3>
          <div className="flex items-center space-x-4">
            <code className="bg-gray-50 px-4 py-2 rounded flex-1 font-mono">
              {settings.apiKey}
            </code>
            <button
              onClick={regenerateApiKey}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Regenerate
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Widget Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Theme</label>
              <select
                value={settings.widgetSettings.theme}
                onChange={(e) => setSettings({
                  ...settings,
                  widgetSettings: { ...settings.widgetSettings, theme: e.target.value }
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <select
                value={settings.widgetSettings.position}
                onChange={(e) => setSettings({
                  ...settings,
                  widgetSettings: { ...settings.widgetSettings, position: e.target.value }
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Primary Color</label>
              <input
                type="color"
                value={settings.widgetSettings.primaryColor}
                onChange={(e) => setSettings({
                  ...settings,
                  widgetSettings: { ...settings.widgetSettings, primaryColor: e.target.value }
                })}
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Greeting Message</label>
              <input
                type="text"
                value={settings.widgetSettings.greeting}
                onChange={(e) => setSettings({
                  ...settings,
                  widgetSettings: { ...settings.widgetSettings, greeting: e.target.value }
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              />
            </div>
          </div>

          <button
            onClick={updateSettings}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Embed Code</h3>
          <div className="relative">
            <pre className="bg-gray-50 p-4 rounded overflow-x-auto">
              <code>{getEmbedCode()}</code>
            </pre>
            <button
              onClick={copyEmbedCode}
              className="absolute top-2 right-2 p-2 bg-white rounded-md shadow-sm hover:bg-gray-50"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}