# Forex Trading Tracker

A responsive web application for tracking Forex trading performance with comprehensive analytics and goal tracking.

## 🌐 Live Demo

**[View Live App](https://yourusername.github.io/forex-trading-tracker/)**

## Features

### 📊 Dashboard
- **Real-time Statistics**: Total P&L, win rate, profit factor, and maximum drawdown
- **Period Filtering**: View performance for different time periods (daily, weekly, monthly, yearly)
- **Goal Progress Tracking**: Visual progress bars for daily, weekly, and monthly P&L goals
- **Equity Curve Chart**: Interactive line chart showing cumulative P&L over time
- **Win/Loss Distribution**: Pie chart displaying trade outcome distribution
- **Recent Activity**: Latest trades with quick overview

### 📝 Trade Management
- **Add Trades**: Comprehensive form with all essential trade details
- **Auto-calculation**: Automatic P&L calculation based on entry/exit prices and lot size
- **Currency Pairs**: Support for 28 major currency pairs
- **Trade Notes**: Add detailed notes for each trade
- **Validation**: Form validation to ensure data integrity

### 📋 Trade Table
- **Sortable Columns**: Sort by date, pair, direction, or P&L
- **Search & Filter**: Search by currency pair or notes, filter by trade direction
- **Responsive Design**: Mobile-friendly table with horizontal scrolling
- **Quick Stats**: Summary statistics for filtered trades
- **Delete Trades**: Remove individual trades with confirmation

### ⚙️ Settings & Goals
- **Customizable Goals**: Set daily, weekly, monthly, and yearly P&L targets
- **Currency Settings**: Choose display currency from 8 major currencies
- **Default Lot Size**: Set default lot size for new trades
- **Data Export**: Export all trading data as JSON file
- **Data Management**: Clear all data with confirmation

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices and tablets
- **Clean UI**: Modern, intuitive interface with Tailwind CSS
- **Accessibility**: Keyboard navigation and screen reader support
- **Cross-Browser**: Works on all modern browsers

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Storage**: Local Storage (no backend required)

## Installation

1. **Clone or download** the project files to your local machine

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## Deployment

### GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

1. **Fork or clone** this repository to your GitHub account

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

3. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. **Monitor deployment**:
   - Check the "Actions" tab in your repository
   - The app will be deployed to `https://yourusername.github.io/forex-trading-tracker/`

### Manual Deployment

To deploy manually:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Usage

### Getting Started
1. **Add Your First Trade**: Click the "Add Trade" button in the header
2. **Fill in Trade Details**: Enter currency pair, direction, prices, and lot size
3. **Set Goals**: Go to Settings to configure your P&L targets
4. **Track Progress**: Monitor your performance on the Dashboard

### Adding a Trade
1. Click "Add Trade" button
2. Select currency pair from dropdown
3. Choose trade direction (Buy/Sell)
4. Enter entry and exit prices
5. Set lot size (default is 0.1)
6. Add optional notes
7. Click "Add Trade" to save

### Understanding the Dashboard
- **Total P&L**: Cumulative profit/loss for selected period
- **Win Rate**: Percentage of profitable trades
- **Profit Factor**: Ratio of gross profit to gross loss
- **Max Drawdown**: Largest peak-to-trough decline
- **Equity Curve**: Visual representation of account growth
- **Goal Progress**: Progress bars showing goal achievement

### Managing Settings
- **Currency**: Change display currency for all monetary values
- **Default Lot Size**: Set default lot size for new trades
- **Goals**: Configure daily, weekly, monthly, and yearly targets
- **Data Export**: Download backup of all trading data
- **Data Clear**: Remove all data (use with caution)

## Data Storage

All data is stored locally in your browser's localStorage:
- **Trades**: Complete trade history with all details
- **Settings**: App preferences and configuration
- **Goals**: P&L targets for different time periods

**Note**: Data is stored locally and will persist between browser sessions. Clear browser data to reset the application.

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Project Structure
```
src/
├── components/          # React components
│   ├── Dashboard.jsx    # Main dashboard with charts
│   ├── TradeForm.jsx    # Add/edit trade form
│   ├── TradeTable.jsx   # Trades list with filtering
│   ├── Settings.jsx     # App settings and goals
│   ├── EquityCurveChart.jsx  # Line chart component
│   └── WinLossChart.jsx      # Pie chart component
├── utils/               # Utility functions
│   ├── storage.js       # Local storage operations
│   └── calculations.js  # Trading statistics calculations
├── App.jsx              # Main app component
├── main.jsx             # App entry point
└── index.css            # Global styles
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the browser console for errors
2. Ensure you're using a supported browser
3. Try clearing browser cache and localStorage
4. Create an issue with detailed description

---

**Happy Trading! 📈** 