import React, { useState } from 'react';
import { X, DollarSign, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TradeForm = ({ onSubmit, onCancel, settings }) => {
  const [formData, setFormData] = useState({
    pair: '',
    direction: 'buy',
    entryPrice: '',
    exitPrice: '',
    lotSize: settings.defaultLotSize || 0.1,
    profitLoss: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const currencyPairs = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'USD/CAD',
    'NZD/USD', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY', 'CHF/JPY', 'EUR/CHF',
    'AUD/JPY', 'CAD/JPY', 'NZD/JPY', 'GBP/CHF', 'AUD/CHF', 'CAD/CHF',
    'NZD/CHF', 'AUD/CAD', 'NZD/CAD', 'AUD/NZD', 'EUR/AUD', 'GBP/AUD',
    'EUR/CAD', 'GBP/CAD', 'EUR/NZD', 'GBP/NZD'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.pair) {
      newErrors.pair = 'Currency pair is required';
    }

    if (!formData.entryPrice || parseFloat(formData.entryPrice) <= 0) {
      newErrors.entryPrice = 'Valid entry price is required';
    }

    if (!formData.exitPrice || parseFloat(formData.exitPrice) <= 0) {
      newErrors.exitPrice = 'Valid exit price is required';
    }

    if (!formData.lotSize || parseFloat(formData.lotSize) <= 0) {
      newErrors.lotSize = 'Valid lot size is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const tradeData = {
        ...formData,
        entryPrice: parseFloat(formData.entryPrice),
        exitPrice: parseFloat(formData.exitPrice),
        lotSize: parseFloat(formData.lotSize),
        profitLoss: parseFloat(formData.profitLoss) || 0
      };
      
      onSubmit(tradeData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const calculatePnL = () => {
    const entry = parseFloat(formData.entryPrice);
    const exit = parseFloat(formData.exitPrice);
    const lotSize = parseFloat(formData.lotSize);
    
    if (entry && exit && lotSize) {
      let pnl = 0;
      if (formData.direction === 'buy') {
        pnl = (exit - entry) * lotSize * 100000; // Standard lot calculation
      } else {
        pnl = (entry - exit) * lotSize * 100000;
      }
      return pnl.toFixed(2);
    }
    return '';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Add New Trade</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Currency Pair */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency Pair *
          </label>
          <select
            value={formData.pair}
            onChange={(e) => handleInputChange('pair', e.target.value)}
            className={`input-field ${errors.pair ? 'border-danger-500' : ''}`}
          >
            <option value="">Select a currency pair</option>
            {currencyPairs.map(pair => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
          {errors.pair && (
            <p className="mt-1 text-sm text-danger-600">{errors.pair}</p>
          )}
        </div>

        {/* Direction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Direction *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="direction"
                value="buy"
                checked={formData.direction === 'buy'}
                onChange={(e) => handleInputChange('direction', e.target.value)}
                className="mr-2"
              />
              <ArrowUpRight className="w-4 h-4 text-success-600 mr-1" />
              Buy
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="direction"
                value="sell"
                checked={formData.direction === 'sell'}
                onChange={(e) => handleInputChange('direction', e.target.value)}
                className="mr-2"
              />
              <ArrowDownRight className="w-4 h-4 text-danger-600 mr-1" />
              Sell
            </label>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`input-field pl-10 ${errors.date ? 'border-danger-500' : ''}`}
            />
          </div>
          {errors.date && (
            <p className="mt-1 text-sm text-danger-600">{errors.date}</p>
          )}
        </div>

        {/* Entry and Exit Prices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entry Price *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                step="0.00001"
                value={formData.entryPrice}
                onChange={(e) => handleInputChange('entryPrice', e.target.value)}
                placeholder="1.23456"
                className={`input-field pl-10 ${errors.entryPrice ? 'border-danger-500' : ''}`}
              />
            </div>
            {errors.entryPrice && (
              <p className="mt-1 text-sm text-danger-600">{errors.entryPrice}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exit Price *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                step="0.00001"
                value={formData.exitPrice}
                onChange={(e) => handleInputChange('exitPrice', e.target.value)}
                placeholder="1.23456"
                className={`input-field pl-10 ${errors.exitPrice ? 'border-danger-500' : ''}`}
              />
            </div>
            {errors.exitPrice && (
              <p className="mt-1 text-sm text-danger-600">{errors.exitPrice}</p>
            )}
          </div>
        </div>

        {/* Lot Size and P&L */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lot Size *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.lotSize}
              onChange={(e) => handleInputChange('lotSize', e.target.value)}
              placeholder="0.1"
              className={`input-field ${errors.lotSize ? 'border-danger-500' : ''}`}
            />
            {errors.lotSize && (
              <p className="mt-1 text-sm text-danger-600">{errors.lotSize}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              P&L (Optional)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                step="0.01"
                value={formData.profitLoss}
                onChange={(e) => handleInputChange('profitLoss', e.target.value)}
                placeholder={calculatePnL() || "Auto-calculated"}
                className="input-field pl-10"
              />
            </div>
            {calculatePnL() && (
              <p className="mt-1 text-xs text-gray-500">
                Calculated: {calculatePnL()}
              </p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Add any notes about this trade..."
            rows="3"
            className="input-field resize-none"
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
          >
            Add Trade
          </button>
        </div>
      </form>
    </div>
  );
};

export default TradeForm; 