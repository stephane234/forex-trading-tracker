import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react';
import EquityCurveChart from './EquityCurveChart';
import WinLossChart from './WinLossChart';
import {
  calculateWinRate,
  calculateTotalPnL,
  calculateAverageWin,
  calculateAverageLoss,
  calculateProfitFactor,
  calculateMaxDrawdown,
  getTradesByPeriod,
  formatCurrency,
  formatPercentage
} from '../utils/calculations';

const Dashboard = ({ trades, settings, goals }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredTrades = selectedPeriod === 'all' 
    ? trades 
    : getTradesByPeriod(trades, selectedPeriod, selectedDate);

  const totalPnL = calculateTotalPnL(filteredTrades);
  const winRate = calculateWinRate(filteredTrades);
  const averageWin = calculateAverageWin(filteredTrades);
  const averageLoss = calculateAverageLoss(filteredTrades);
  const profitFactor = calculateProfitFactor(filteredTrades);
  const maxDrawdown = calculateMaxDrawdown(filteredTrades);

  const periods = [
    { value: 'all', label: 'All Time' },
    { value: 'daily', label: 'Today' },
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
    { value: 'yearly', label: 'This Year' }
  ];

  const getGoalProgress = (period) => {
    const goal = goals[period] || 0;
    if (goal === 0) return { progress: 0, percentage: 0 };
    
    const periodTrades = getTradesByPeriod(trades, period, new Date());
    const periodPnL = calculateTotalPnL(periodTrades);
    const progress = Math.min((periodPnL / goal) * 100, 100);
    
    return { progress: Math.max(progress, 0), percentage: Math.min(progress, 100) };
  };

  const dailyProgress = getGoalProgress('daily');
  const weeklyProgress = getGoalProgress('weekly');
  const monthlyProgress = getGoalProgress('monthly');

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex flex-wrap gap-2">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => setSelectedPeriod(period.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedPeriod === period.value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total P&L</p>
              <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {formatCurrency(totalPnL, settings.currency)}
              </p>
            </div>
            <div className={`p-2 rounded-lg ${totalPnL >= 0 ? 'bg-success-100' : 'bg-danger-100'}`}>
              {totalPnL >= 0 ? (
                <TrendingUp className="w-6 h-6 text-success-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-danger-600" />
              )}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPercentage(winRate)}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-primary-100">
              <Target className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profit Factor</p>
              <p className="text-2xl font-bold text-gray-900">
                {profitFactor.toFixed(2)}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-blue-100">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Max Drawdown</p>
              <p className="text-2xl font-bold text-danger-600">
                {formatCurrency(maxDrawdown, settings.currency)}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-danger-100">
              <TrendingDown className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Goal Progress */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Daily Goal</span>
              <span className="text-sm text-gray-500">
                {formatCurrency(goals.daily || 0, settings.currency)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-success-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${dailyProgress.percentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {dailyProgress.percentage.toFixed(1)}% complete
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Weekly Goal</span>
              <span className="text-sm text-gray-500">
                {formatCurrency(goals.weekly || 0, settings.currency)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${weeklyProgress.percentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {weeklyProgress.percentage.toFixed(1)}% complete
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Monthly Goal</span>
              <span className="text-sm text-gray-500">
                {formatCurrency(goals.monthly || 0, settings.currency)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${monthlyProgress.percentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {monthlyProgress.percentage.toFixed(1)}% complete
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Equity Curve</h3>
          <EquityCurveChart trades={filteredTrades} />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Win/Loss Distribution</h3>
          <WinLossChart trades={filteredTrades} />
        </div>
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Trades</span>
              <span className="font-semibold">{filteredTrades.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Win</span>
              <span className="font-semibold text-success-600">
                {formatCurrency(averageWin, settings.currency)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Loss</span>
              <span className="font-semibold text-danger-600">
                {formatCurrency(averageLoss, settings.currency)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Largest Win</span>
              <span className="font-semibold text-success-600">
                {formatCurrency(Math.max(...filteredTrades.map(t => t.profitLoss).filter(p => p > 0), 0), settings.currency)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Largest Loss</span>
              <span className="font-semibold text-danger-600">
                {formatCurrency(Math.min(...filteredTrades.map(t => t.profitLoss).filter(p => p < 0), 0), settings.currency)}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {filteredTrades.slice(-5).reverse().map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{trade.pair}</p>
                  <p className="text-sm text-gray-500">{trade.direction}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${trade.profitLoss >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                    {formatCurrency(trade.profitLoss, settings.currency)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(trade.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 