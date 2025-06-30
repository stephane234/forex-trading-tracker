# Forex Trading Tracker

A responsive web application for tracking Forex trading performance, built with React, Chart.js, and Tailwind CSS.

## Features

- 📊 **Dashboard Analytics**: Real-time performance metrics and charts
- 📝 **Trade Management**: Add, edit, and delete trades with auto P&L calculation
- 📈 **Performance Charts**: Equity curve and win/loss distribution visualization
- ⚙️ **Settings & Goals**: Customizable trading goals and preferences
- 💾 **Local Storage**: Data persistence using browser localStorage
- 📱 **Responsive Design**: Mobile-friendly interface
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS

## Live Demo

🌐 **Live Demo**: [https://stephane234.github.io/forex-trading-tracker/](https://stephane234.github.io/forex-trading-tracker/)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/stephane234/forex-trading-tracker.git
cd forex-trading-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Deployment

The app is automatically deployed to GitHub Pages. To deploy manually:

```bash
npm run build
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard with analytics
│   ├── TradeForm.jsx          # Trade entry form
│   ├── TradeTable.jsx         # Trade history table
│   ├── Settings.jsx           # Settings and goals
│   └── charts/
│       ├── EquityCurve.jsx    # Equity curve chart
│       └── WinLossChart.jsx   # Win/loss distribution chart
├── utils/
│   ├── storage.js             # Local storage utilities
│   └── calculations.js        # Trading calculations
├── App.jsx                    # Main app component
└── index.css                  # Global styles
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Chart.js** - Charting library
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

## Features in Detail

### Dashboard
- Total P&L and win rate
- Equity curve visualization
- Win/loss distribution chart
- Recent trades overview
- Performance metrics

### Trade Management
- Add new trades with validation
- Auto-calculate P&L based on entry/exit prices
- Support for different currency pairs
- Trade notes and categorization

### Settings
- Trading goals (monthly/weekly targets)
- Risk management preferences
- UI theme customization
- Data export/import

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub. 