# Tic-tac-toe Game

A modern implementation of the classic Tic-tac-toe game built with React Native and Expo.

## Features

- Clean and intuitive user interface
- Smooth animations using React Native Reanimated and Lottie
- High-performance graphics with Shopify's React Native Skia
- Cross-platform support (iOS, Android, and Web)
- Fully tested with Jest and React Testing Library
- TypeScript for type safety

## Prerequisites

Before running the game, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/vitorlsouza/rn-tic-tac-toe.git
cd tic-tac-toe
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Running the Game

The following commands are available to run the game:

- Start the development server:

```bash
npm start
# or
yarn start
```

- Run on iOS simulator:

```bash
npm run ios
# or
yarn ios
```

- Run on Android emulator:

```bash
npm run android
# or
yarn android
```

- Run on web browser:

```bash
npm run web
# or
yarn web
```

## Development

### Available Scripts

- `npm start` - Starts the Expo development server
- `npm run ios` - Runs the app on iOS simulator
- `npm run android` - Runs the app on Android emulator
- `npm run web` - Runs the app in your web browser
- `npm run lint` - Runs ESLint to check code quality
- `npm test` - Runs Jest tests
- `npm run test:coverage` - Runs Jest tests with coverage report

### Tech Stack

- **React Native**: Core framework for building the mobile application
- **Expo**: Development platform and tools
- **TypeScript**: Programming language for type-safe code
- **React Native Reanimated**: Library for fluid animations
- **React Native Skia**: High-performance 2D graphics
- **Lottie**: For complex animations
- **Jest & React Testing Library**: Testing framework and utilities
- **ESLint & Prettier**: Code quality and formatting tools

### Project Structure

```
tic-tac-toe/
├── src/              # Source code
├── assets/           # Static assets
├── App.tsx          # Main application component
├── babel.config.js   # Babel configuration
├── tsconfig.json    # TypeScript configuration
├── jest.config.json # Jest configuration
└── package.json     # Project dependencies and scripts
```

## Testing

The project includes a comprehensive test suite using Jest and React Testing Library. To run the
tests:

```bash
npm test
# or
yarn test
```

To view test coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
```

## Code Quality

The project uses ESLint and Prettier for code quality and formatting. Configuration files are
included in the repository:

- `.eslintrc.js`
- `.prettierrc`

To check code quality:

```bash
npm run lint
# or
yarn lint
```
