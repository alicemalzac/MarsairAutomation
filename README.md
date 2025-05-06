# MarsAir Cypress Test Automation Project

This project contains end-to-end (E2E) automated tests for the MarsAir web application, developed using Cypress.

## Application Under Test

*   **Description:** A simple application to simulate searching for fictional flights to Mars, allowing selection of departure/return dates and application of promotional codes.

## Prerequisites

*   [Node.js](https://nodejs.org/)  (LTS version recommended)
*   [npm](https://www.npmjs.com/)  (usually installed with Node.js) or [Yarn](https://yarnpkg.com/) 

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/alicemalzac/MarsairAutomation.git
    cd mairsairautomation
    ```

2.  **Install dependencies (including Cypress):**
    ```bash
    npm install
    # or
    # yarn install
    ```

## Running the Tests

You can run the Cypress tests in two main ways:

1.  **Via Cypress Test Runner (GUI):**
    *   Opens the Cypress interface, allowing you to select and run tests individually or all at once, visualizing the step-by-step execution.
    ```bash
    npx cypress open
    ```

2.  **Via Command Line (Headless):**
    *   Runs all tests found in the `integration` (or `e2e`) directory in headless mode (without opening a visible browser). Useful for continuous integration (CI).
    ```bash
    npx cypress run
    ```
    *   To run a specific file:
    ```bash
    npx cypress run --spec "cypress/integration/validation.spec.js"
    ```

## Implemented Test Suites

*   **`verify.spec.js`:** Verifies the validation rules for selecting departure and return dates (valid dates, invalid dates, unselected dates) and basic navigation works ("Back" link and MarsAir logo from the results page).
*   **`promo_code.spec.js`:** Tests the promotional code functionality, including valid and invalid codes, and verifies known bugs related to message display when no seats are available.

## Page Object Model (POM)

*   **`HomePage.js`:** Encapsulates the selectors and methods for interacting with the MarsAir home page (selecting dates, entering code, clicking search, verifying messages, etc.).

