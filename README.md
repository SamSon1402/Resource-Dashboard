# Resource Management Dashboard

A real-time resource management dashboard built with Next.js, React, TypeScript, and Recharts, featuring interactive visualizations and live data simulation.

## Features

- Real-time data simulation and monitoring
- Interactive charts and visualizations
  - Resource utilization metrics
  - Efficiency tracking
  - Risk assessment
  - Historical trends
- Project-specific performance cards
- Live alerts for unusual patterns
- Data export functionality
- Responsive design

## Tech Stack

- **Framework**: Next.js 14 with React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React

## Prerequisites

- Node.js 18.17 or later
- npm or yarn

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/SamSon1402/resource-dashboard.git
cd resource-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
resource-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── ui/
│   │       ├── ResourceDashboard.tsx
│   │       ├── alert.tsx
│   │       ├── button.tsx
│   │       └── card.tsx
│   ├── types/
│   │   └── dashboard.ts
│   └── lib/
│       └── utils.ts
├── public/
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Features in Detail

### Dashboard Components

1. **Resource Metrics Chart**
   - Bar chart showing utilization and efficiency
   - Line chart displaying risk levels
   - Interactive tooltips

2. **Live Trends**
   - Area charts showing historical data
   - Real-time updates
   - 30-day trending view

3. **Project Cards**
   - Individual project metrics
   - Status indicators
   - Budget tracking
   - Performance metrics

4. **Alert System**
   - Real-time anomaly detection
   - Performance threshold monitoring
   - Visual notifications

### Data Simulation

- Realistic data generation
- Configurable update intervals
- Random variation within constraints
- Trend-based progression

## Usage

### Starting the Simulation

1. Click the "Start Simulation" button to begin real-time updates
2. Watch as the charts and metrics update automatically
3. Click "Stop Simulation" to pause the updates

### Interacting with Charts

- Click on chart elements to view detailed information
- Hover over data points for tooltips
- Use the legend to toggle different metrics

### Exporting Data

Click the "Export" button to download current data in CSV format

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details
