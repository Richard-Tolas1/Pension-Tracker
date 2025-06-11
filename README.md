Pension Tracker Application

🚀 Overview

The Pension Tracker is a user-friendly web application designed to help individuals visualize their projected pension pot. Users can input key financial details, including desired retirement income, employer and personal contributions, and retirement age. The application then calculates and displays a visual projection of their pension fund's growth during accumulation and its subsequent decrease during retirement, providing a clear overview of their financial future.

✨ Features
Customizable Retirement Income: Users can specify their desired annual income in retirement.

Contribution Tracking: Input fields for both employer and personal monthly pension contributions.

Age-Based Projections: Define current age and desired retirement age to see projections tailored to individual timelines.

Interactive Visualizations: A dynamic line chart provides a clear visual representation of:

Projected pension pot growth (accumulation phase).

Projected pension pot decrease (decumulation phase).

Desired lump sum needed at retirement to achieve the target income.

"Calculate Pension" Button: Explicitly triggers the calculation and chart update, providing control over when projections are refreshed.

📈 Stretch Goals Implemented
Annual Interest Rate: The pension pot benefits from an assumed annual interest rate of 4.9%.

Existing Pension Pots: Users can add multiple current pension pots, which are factored into the initial balance and overall projection.

Contribution Visualization: The total contribution from existing pots is displayed in the summary, highlighting their impact.

⚙️ Assumptions
Life Expectancy: The application assumes the user will live to 81 years old.

Job Duration: For simplification, it's assumed the user maintains their current job (and contributions) from their currentAge until their chosen retirementAge.

Fixed Interest Rate: The 4.9% annual interest rate is constant throughout the projection period and does not account for market fluctuations.

No Inflation/Taxation: The projections do not account for inflation or tax implications on contributions, growth, or withdrawals.

🛠️ Technologies Used
React (v18+): A JavaScript library for building user interfaces.

TypeScript: A typed superset of JavaScript that compiles to plain JavaScript, providing type safety and improved developer experience.

Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.

Recharts: A composable charting library built with React and D3, used for interactive data visualizations.

Vitest: A blazing fast unit test framework powered by Vite, used for testing the application's components and logic.

@testing-library/react: A set of utilities for testing React components in a way that simulates user interactions.

@testing-library/jest-dom: Provides custom Jest matchers to extend expect for more declarative DOM assertions.

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Make sure you have Node.js (version 14 or higher recommended) and npm (or yarn) installed on your machine.

Node.js: https://nodejs.org/

npm: Comes with Node.js

yarn: npm install -g yarn (Optional)

Installation
Clone the repository:

git clone https://github.com/Richard-Tolas1/Pension-Tracker.git
cd pension-tracker

Install dependencies:

npm install
# or
yarn install

Running the Application
To start the development server and view the application in your browser:

npm run dev
# or
yarn dev

The application should open in your default browser, typically at http://localhost:5173/ (or a similar port).

🧪 Running Tests
The project includes unit and integration tests written with Vitest and React Testing Library.

Test Setup
src/setupTests.ts: Configures the testing environment, including jest-dom matchers and a mock for ResizeObserver (necessary for recharts in JSDOM).

vitest.config.ts: Defines Vitest's configuration, pointing to jsdom environment and global utilities.

Executing Tests
To run all tests:

npm test
# or
yarn test

Test Files
src/Test/App.test.tsx: Contains integration tests that cover the full application flow, ensuring all components work together.

src/Test/InputForm.test.tsx: Unit tests for the InputForm component, verifying input rendering and state updates.

src/Test/ExistingPots.test.tsx: Unit tests for the ExistingPots component, covering adding, changing, and removing pension pots.

src/Test/Charts.test.tsx: Unit tests for the Charts component, ensuring correct data display and chart rendering (with recharts components mocked).
