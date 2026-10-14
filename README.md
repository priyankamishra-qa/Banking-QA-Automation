# Banking QA Automation Project

## Project Overview

This project automates key banking workflows on the ParaBank demo application using Playwright and JavaScript. It demonstrates UI test automation, reusable Page Object Model (POM) classes, and validation of banking operations.

**Application under test:** https://parabank.parasoft.com/parabank/index.htm

## Tech Stack
* JavaScript
* Playwright Test
* Node.js and npm
* Page Object Model (POM)
* Git and GitHub

## Automated Test Scenarios

1. **Login:** Verify that a valid user can log in successfully.
2. **Accounts Overview:** Verify that the Accounts Overview page and account column are displayed.
3. **Funds Transfer:** Transfer $10 between two accounts and verify the confirmation message, amount, and account numbers.

## Project Structure

```text
Banking-QA-Automation/
├── .github/
├── api/
├── database/
├── pages/
│   ├── AccountsPage.js
│   ├── LoginPage.js
│   └── TransferPage.js
├── test-data/
├── tests/
│   ├── accounts.spec.js
│   ├── login.spec.js
│   └── transfer.spec.js
├── utils/
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Prerequisites

* Node.js and npm
* Git
* Visual Studio Code (recommended)

## Setup Instructions

Clone the repository and open its folder in a terminal.

```bash
npm install
npx playwright install
```

## Run Tests

Run all tests across the configured browsers:

```bash
npm test
```

Run tests in a specific browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Open the HTML test report:

```bash
npm run test:report
```

## Test Results

The current test suite contains 3 test cases configured for Chromium, Firefox, and WebKit. The full Playwright run completed successfully with **9 passing test executions** across the three browsers.

## Framework Design

* **Page Object Model:** Page interactions and locators are maintained in reusable page classes.
* **Test data:** Login credentials are stored separately from test logic.
* **Assertions:** Tests verify expected page states and transfer confirmation details.
* **Cross-browser testing:** The framework is configured for Chromium, Firefox, and WebKit.

## Disclaimer

ParaBank is a public demo application used for learning and portfolio demonstration. This project is intended for authorized testing and educational purposes.
