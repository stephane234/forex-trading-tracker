import React, { useState, useEffect } from 'react';
import { BarChart3, Plus, Settings as SettingsIcon, TrendingUp } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TradeForm from './components/TradeForm';
import TradeTable from './components/TradeTable';
import SettingsComponent from './components/Settings';
import { loadTrades, saveTrades, loadSettings, saveSettings, loadGoals, saveGoals } from './utils/storage';

// Forex Trading Tracker App - Main Component
function App() {
  const [trades, setTrades] = useState([]);
  const [settings, setSettings] = useState({});
  const [goals, setGoals] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTradeForm, setShowTradeForm] = useState(false);

  useEffect(() => {
    // Load data from localStorage on app start
    const savedTrades = loadTrades();
    const savedSettings = loadSettings();
    const savedGoals = loadGoals();
    
    setTrades(savedTrades);
    setSettings(savedSettings);
    setGoals(savedGoals);
  }, []);

  const addTrade = (newTrade) => {
    const tradeWithId = {
      ...newTrade,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    const updatedTrades = [...trades, tradeWithId];
    setTrades(updatedTrades);
    saveTrades(updatedTrades);
    setShowTradeForm(false);
  };

  const deleteTrade = (tradeId) => {
    const updatedTrades = trades.filter(trade => trade.id !== tradeId);
    setTrades(updatedTrades);
    saveTrades(updatedTrades);
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const updateGoals = (newGoals) => {
    setGoals(newGoals);
    saveGoals(newGoals);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'trades', label: 'Trades', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Forex Trading Tracker</h1>
            </div>
            <button
              onClick={() => setShowTradeForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Trade
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            trades={trades} 
            settings={settings} 
            goals={goals}
          />
        )}
        {activeTab === 'trades' && (
          <TradeTable 
            trades={trades} 
            onDeleteTrade={deleteTrade}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsComponent 
            settings={settings} 
            goals={goals}
            onUpdateSettings={updateSettings}
            onUpdateGoals={updateGoals}
          />
        )}
      </main>

      {/* Trade Form Modal */}
      {showTradeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <TradeForm 
              onSubmit={addTrade}
              onCancel={() => setShowTradeForm(false)}
              settings={settings}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 