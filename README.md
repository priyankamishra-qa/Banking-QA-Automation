
# Banking QA Automation Framework

A banking test automation project built with **JavaScript and Playwright Test**, covering UI workflows, REST API validation, negative scenarios, and cross-browser testing against the ParaBank demo application.

## Project Overview

This project demonstrates practical QA automation skills through reusable Page Object Model (POM) classes, API testing utilities, test data separation, and automated assertions.

**Application under test:** [ParaBank Demo](https://parabank.parasoft.com/parabank/index.htm)

## Tech Stack

- JavaScript
- Playwright Test
- Node.js and npm
- REST API testing
- Page Object Model (POM)
- Git and GitHub
- Chromium, Firefox, and WebKit

## Test Coverage

### UI Testing

- Login with valid credentials
- Negative login scenarios
- Accounts Overview page validation
- Successful funds transfer
- Negative transfer scenarios:
  - Empty amount
  - Zero amount
  - Negative amount
  - Invalid text amount

### API Testing

- Valid customer login
- Invalid login credentials
- Customer account retrieval
- Account transaction retrieval
- Nonexistent customer or account scenarios
- HTTP response and response-data validation

## Latest Test Results

The full Playwright test suite completed with **54 passing test executions** across the configured Chromium, Firefox, and WebKit browser projects.

| Test area | Coverage |
|---|---|
| UI automation | Login, accounts, and funds transfer |
| API automation | Authentication, accounts, and transactions |
| Negative testing | Invalid login and transfer inputs |
| Cross-browser testing | Chromium, Firefox, and WebKit |
| Latest full-suite result | 54 passed |

*Test counts reflect the last successful local run and may change as the suite evolves.*

## Project Structure

```text
Banking-QA-Automation/
├── .github/
├── api/
│   └── BankApi.js
├── database/
├── pages/
│   ├── AccountsPage.js
│   ├── LoginPage.js
│   └── TransferPage.js
├── test-data/
│   └── users.json
├── tests/
│   ├── accounts.spec.js
│   ├── api.spec.js
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

- Node.js and npm
- Git
- Visual Studio Code (recommended)

## Setup

Clone the repository:

```bash
git clone https://github.com/priyankamishra-qa/Banking-QA-Automation.git
cd Banking-QA-Automation
```

Install dependencies and browser binaries:

```bash
npm install
npx playwright install
```

## Run Tests

Run the complete suite across configured browsers:

```bash
npx playwright test --workers=1
```

Run all tests in Chromium:

```bash
npx playwright test --project=chromium --workers=1
```

Run the API tests in Chromium:

```bash
npx playwright test tests/api.spec.js --project=chromium
```

Run the transfer tests in Chromium:

```bash
npx playwright test tests/transfer.spec.js --project=chromium --workers=1
```

View the HTML report:

```bash
npx playwright show-report
```

## Framework Design

- **Page Object Model:** Reusable page classes encapsulate locators and UI actions.
- **API helper:** `api/BankApi.js` centralizes API request functionality.
- **Test data separation:** Login credentials are maintained outside the test files.
- **Assertions:** Playwright assertions validate page states, API responses, and transfer results.
- **Negative testing:** Invalid inputs are tested to check that unsuccessful operations are not reported as successful.
- **Cross-browser testing:** Tests run against Chromium, Firefox, and WebKit.
- **Git version control:** Source code and test changes are tracked in GitHub.

## Limitations

- ParaBank is a public demo application. Its availability and backend behavior may be intermittent.
- Tests depend on the demo application's current data and service behavior.
- The `database/` folder does not mean that direct database integration tests are implemented. Direct database validation is not currently included in the reported test results.
- The reported 54 passing executions are from the latest successful local run; they are not a guarantee that the public demo will always produce the same results.

## Disclaimer

This project uses the publicly available ParaBank demo application for learning and portfolio demonstration. It is intended for educational and authorized testing purposes.
