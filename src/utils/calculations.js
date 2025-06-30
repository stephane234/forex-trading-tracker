import { format, startOfDay, startOfWeek, startOfMonth, startOfYear, isWithinInterval } from 'date-fns';

export const calculateWinRate = (trades) => {
  if (trades.length === 0) return 0;
  const winningTrades = trades.filter(trade => trade.profitLoss > 0);
  return (winningTrades.length / trades.length) * 100;
};

export const calculateTotalPnL = (trades) => {
  return trades.reduce((total, trade) => total + trade.profitLoss, 0);
};

export const calculateAverageWin = (trades) => {
  const winningTrades = trades.filter(trade => trade.profitLoss > 0);
  if (winningTrades.length === 0) return 0;
  return winningTrades.reduce((total, trade) => total + trade.profitLoss, 0) / winningTrades.length;
};

export const calculateAverageLoss = (trades) => {
  const losingTrades = trades.filter(trade => trade.profitLoss < 0);
  if (losingTrades.length === 0) return 0;
  return losingTrades.reduce((total, trade) => total + trade.profitLoss, 0) / losingTrades.length;
};

export const calculateProfitFactor = (trades) => {
  const winningTrades = trades.filter(trade => trade.profitLoss > 0);
  const losingTrades = trades.filter(trade => trade.profitLoss < 0);
  
  const totalWins = winningTrades.reduce((total, trade) => total + trade.profitLoss, 0);
  const totalLosses = Math.abs(losingTrades.reduce((total, trade) => total + trade.profitLoss, 0));
  
  return totalLosses === 0 ? totalWins : totalWins / totalLosses;
};

export const calculateMaxDrawdown = (trades) => {
  if (trades.length === 0) return 0;
  
  let peak = 0;
  let maxDrawdown = 0;
  let runningTotal = 0;
  
  trades.forEach(trade => {
    runningTotal += trade.profitLoss;
    if (runningTotal > peak) {
      peak = runningTotal;
    }
    const drawdown = peak - runningTotal;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });
  
  return maxDrawdown;
};

export const getTradesByPeriod = (trades, period, date) => {
  const startDate = new Date(date);
  let periodStart;
  
  switch (period) {
    case 'daily':
      periodStart = startOfDay(startDate);
      break;
    case 'weekly':
      periodStart = startOfWeek(startDate, { weekStartsOn: 1 });
      break;
    case 'monthly':
      periodStart = startOfMonth(startDate);
      break;
    case 'yearly':
      periodStart = startOfYear(startDate);
      break;
    default:
      return trades;
  }
  
  return trades.filter(trade => {
    const tradeDate = new Date(trade.date);
    return isWithinInterval(tradeDate, { start: periodStart, end: startDate });
  });
};

export const generateEquityCurve = (trades) => {
  if (trades.length === 0) return [];
  
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date));
  const equityCurve = [];
  let runningTotal = 0;
  
  sortedTrades.forEach(trade => {
    runningTotal += trade.profitLoss;
    equityCurve.push({
      date: format(new Date(trade.date), 'MMM dd'),
      equity: runningTotal
    });
  });
  
  return equityCurve;
};

export const getWinLossData = (trades) => {
  const winningTrades = trades.filter(trade => trade.profitLoss > 0);
  const losingTrades = trades.filter(trade => trade.profitLoss < 0);
  const breakevenTrades = trades.filter(trade => trade.profitLoss === 0);
  
  return [
    { label: 'Wins', value: winningTrades.length, color: '#22c55e' },
    { label: 'Losses', value: losingTrades.length, color: '#ef4444' },
    { label: 'Breakeven', value: breakevenTrades.length, color: '#6b7280' }
  ].filter(item => item.value > 0);
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatPercentage = (value) => {
  return `${value.toFixed(2)}%`;
}; 