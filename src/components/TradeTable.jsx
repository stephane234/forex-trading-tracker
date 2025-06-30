import React, { useState, useMemo } from 'react';
import { Trash2, ArrowUpRight, ArrowDownRight, Search, Filter } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

const TradeTable = ({ trades, onDeleteTrade }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterDirection, setFilterDirection] = useState('all');

  const filteredAndSortedTrades = useMemo(() => {
    let filtered = trades.filter(trade => {
      const matchesSearch = trade.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trade.notes.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDirection = filterDirection === 'all' || trade.direction === filterDirection;
      return matchesSearch && matchesDirection;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [trades, searchTerm, sortField, sortDirection, filterDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const totalPnL = filteredAndSortedTrades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const winRate = filteredAndSortedTrades.length > 0 
    ? (filteredAndSortedTrades.filter(t => t.profitLoss > 0).length / filteredAndSortedTrades.length) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-sm font-medium text-gray-600">Total Trades</p>
          <p className="text-2xl font-bold text-gray-900">{filteredAndSortedTrades.length}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-gray-600">Total P&L</p>
          <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
            {formatCurrency(totalPnL)}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-gray-600">Win Rate</p>
          <p className="text-2xl font-bold text-gray-900">{winRate.toFixed(1)}%</p>
        </div>
        <div className="stat-card">
          <p className="text-sm font-medium text-gray-600">Average P&L</p>
          <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
            {filteredAndSortedTrades.length > 0 ? formatCurrency(totalPnL / filteredAndSortedTrades.length) : '$0.00'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by pair or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterDirection}
              onChange={(e) => setFilterDirection(e.target.value)}
              className="input-field"
            >
              <option value="all">All Directions</option>
              <option value="buy">Buy Only</option>
              <option value="sell">Sell Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('date')}
                >
                  Date {getSortIcon('date')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('pair')}
                >
                  Pair {getSortIcon('pair')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('direction')}
                >
                  Direction {getSortIcon('direction')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entry Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lot Size
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('profitLoss')}
                >
                  P&L {getSortIcon('profitLoss')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedTrades.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <Filter className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No trades found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(trade.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {trade.pair}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {trade.direction === 'buy' ? (
                          <ArrowUpRight className="w-4 h-4 text-success-600 mr-2" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-danger-600 mr-2" />
                        )}
                        <span className={`text-sm font-medium capitalize ${
                          trade.direction === 'buy' ? 'text-success-600' : 'text-danger-600'
                        }`}>
                          {trade.direction}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {trade.entryPrice.toFixed(5)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {trade.exitPrice.toFixed(5)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {trade.lotSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        trade.profitLoss >= 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        {formatCurrency(trade.profitLoss)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {trade.notes || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => onDeleteTrade(trade.id)}
                        className="text-danger-600 hover:text-danger-900 transition-colors"
                        title="Delete trade"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradeTable; 