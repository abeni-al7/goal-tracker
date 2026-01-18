# Goal Tracker

A modern, responsive goal tracking web application built with React.js and Vite.

## Features

- **Goal Management**: Add, track, and delete personal goals across different life categories
- **Four Categories**: Health 💪, Finance 💰, Relationships ❤️, and Bucket List 🌟
- **Daily Actions**: Define specific actions you'll take every day to achieve each goal
- **Streak Tracking**: Build consistency with visual streak counters that show your progress
- **Local Storage**: All data is saved in your browser's localStorage for persistence
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abeni-al7/goal-tracker.git
cd goal-tracker
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

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Add a Goal**: Fill in the goal form with your goal name, select a category, and define your daily action
2. **Complete Daily Actions**: Click the "Complete Today" button when you complete your daily action
3. **Track Streaks**: Watch your streak counter increase as you maintain consistency
4. **Delete Goals**: Click the × button on any goal card to remove it

## Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **localStorage** - Client-side data persistence
- **CSS3** - Modern styling with gradients and animations

## License

MIT

