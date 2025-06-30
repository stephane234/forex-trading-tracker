import React, { useState } from 'react';
import { Save, Target, DollarSign, Settings as SettingsIcon } from 'lucide-react';

const Settings = ({ settings, goals, onUpdateSettings, onUpdateGoals }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [localGoals, setLocalGoals] = useState(goals);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'NZD', name: 'New Zealand Dollar' }
  ];

  const handleSettingsChange = (field, value) => {
    setLocalSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalsChange = (field, value) => {
    setLocalGoals(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
    onUpdateGoals(localGoals);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const hasChanges = () => {
    return JSON.stringify(localSettings) !== JSON.stringify(settings) ||
           JSON.stringify(localGoals) !== JSON.stringify(goals);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Configure your trading preferences and goals</p>
        </div>
        <button
          onClick={handleSave}
          disabled={!hasChanges()}
          className={`btn-primary flex items-center gap-2 ${
            !hasChanges() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Save Message */}
      {showSaveMessage && (
        <div className="bg-success-50 border border-success-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Save className="w-5 h-5 text-success-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-success-800">
                Settings saved successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* App Settings */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <SettingsIcon className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">App Settings</h3>
          </div>
          
          <div className="space-y-6">
            {/* Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Currency
              </label>
              <select
                value={localSettings.currency || 'USD'}
                onChange={(e) => handleSettingsChange('currency', e.target.value)}
                className="input-field"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Currency used for displaying P&L and goals
              </p>
            </div>

            {/* Default Lot Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Lot Size
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={localSettings.defaultLotSize || 0.1}
                onChange={(e) => handleSettingsChange('defaultLotSize', parseFloat(e.target.value) || 0.1)}
                className="input-field"
              />
              <p className="mt-1 text-sm text-gray-500">
                Default lot size for new trades
              </p>
            </div>

            {/* Notifications */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.showNotifications || false}
                  onChange={(e) => handleSettingsChange('showNotifications', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Show notifications
                </span>
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Enable browser notifications for trade updates
              </p>
            </div>
          </div>
        </div>

        {/* P&L Goals */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">P&L Goals</h3>
          </div>
          
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              Set your profit targets for different time periods. These will be used to track your progress on the dashboard.
            </p>

            {/* Daily Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Goal
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={localGoals.daily || 0}
                  onChange={(e) => handleGoalsChange('daily', e.target.value)}
                  placeholder="0.00"
                  className="input-field pl-10"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Target profit for each trading day
              </p>
            </div>

            {/* Weekly Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Goal
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={localGoals.weekly || 0}
                  onChange={(e) => handleGoalsChange('weekly', e.target.value)}
                  placeholder="0.00"
                  className="input-field pl-10"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Target profit for each trading week
              </p>
            </div>

            {/* Monthly Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Goal
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={localGoals.monthly || 0}
                  onChange={(e) => handleGoalsChange('monthly', e.target.value)}
                  placeholder="0.00"
                  className="input-field pl-10"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Target profit for each trading month
              </p>
            </div>

            {/* Yearly Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yearly Goal
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={localGoals.yearly || 0}
                  onChange={(e) => handleGoalsChange('yearly', e.target.value)}
                  placeholder="0.00"
                  className="input-field pl-10"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Target profit for the trading year
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Export Data</p>
              <p className="text-sm text-gray-600">Download your trading data as JSON</p>
            </div>
            <button
              onClick={() => {
                const data = {
                  trades: JSON.parse(localStorage.getItem('forex_trades') || '[]'),
                  settings: localSettings,
                  goals: localGoals,
                  exportDate: new Date().toISOString()
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `forex-trading-data-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="btn-secondary"
            >
              Export
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Clear All Data</p>
              <p className="text-sm text-gray-600">Permanently delete all trades and settings</p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="bg-danger-600 hover:bg-danger-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Clear Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 