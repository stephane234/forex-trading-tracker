const STORAGE_KEYS = {
  TRADES: 'forex_trades',
  SETTINGS: 'forex_settings',
  GOALS: 'forex_goals'
};

export const saveTrades = (trades) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TRADES, JSON.stringify(trades));
  } catch (error) {
    console.error('Error saving trades to localStorage:', error);
  }
};

export const loadTrades = () => {
  try {
    const trades = localStorage.getItem(STORAGE_KEYS.TRADES);
    return trades ? JSON.parse(trades) : [];
  } catch (error) {
    console.error('Error loading trades from localStorage:', error);
    return [];
  }
};

export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to localStorage:', error);
  }
};

export const loadSettings = () => {
  try {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : {
      currency: 'USD',
      defaultLotSize: 0.1,
      showNotifications: true
    };
  } catch (error) {
    console.error('Error loading settings from localStorage:', error);
    return {
      currency: 'USD',
      defaultLotSize: 0.1,
      showNotifications: true
    };
  }
};

export const saveGoals = (goals) => {
  try {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  } catch (error) {
    console.error('Error saving goals to localStorage:', error);
  }
};

export const loadGoals = () => {
  try {
    const goals = localStorage.getItem(STORAGE_KEYS.GOALS);
    return goals ? JSON.parse(goals) : {
      daily: 0,
      weekly: 0,
      monthly: 0,
      yearly: 0
    };
  } catch (error) {
    console.error('Error loading goals from localStorage:', error);
    return {
      daily: 0,
      weekly: 0,
      monthly: 0,
      yearly: 0
    };
  }
}; 