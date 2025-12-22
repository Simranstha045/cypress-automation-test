# Cypress E2E Testing Project

Automated end-to-end testing for [Saucedemo.com](https://www.saucedemo.com) using Cypress.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

## Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

## Configuration

### 1. Environment Variables

The project uses `cypress.env.json` for environment-specific configuration:

```json
{
  "username": "standard_user",
  "password": "secret_sauce",
  "baseUrl": "https://www.saucedemo.com"
}
```

**Already configured** - no changes needed unless testing with different credentials.

### 2. Cypress Configuration

Base URL is set in `cypress.config.js`:
- **Base URL**: `https://www.saucedemo.com`
- **Test mode**: Continues running tests even if one fails

## Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npx cypress open
```
Then select **E2E Testing** and choose a browser.

### Run Tests in Headless Mode
```bash
npx cypress run
```

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/auth/login.cy.js"
```

## Project Structure

```
cypress/
├── e2e/                    # Test files
│   ├── auth/
│   │   ├── login.cy.js    # All authentication scenarios (ATH-01 to ATH-05)
│   └── checkout/
│       └── checkout.cy.js # Checkout flow tests
│
├── fixtures/               # Test data
│   ├── users.json         # User credentials for different test scenarios
│   ├── errorsMessages.json# Expected error messages
│   └── checkoutData.json  # Checkout form data
│
└── support/
    ├── commands.js         # Custom Cypress commands
    ├── e2e.js             # Global configuration
    └── pageObjects/        # Page Object Model classes
        ├── LoginPage.js
        ├── ProductsPage.js
        ├── ProductDetailsPage.js
        ├── CheckoutPage.js
        └── CartPage.js
```

## Test Scenarios

### Authentication Tests (`login.cy.js`)

| Test ID | Scenario | User |
|---------|----------|------|
| ATH-01 | Successful login | standard_user |
| ATH-02 | Locked out user error | locked_out_user |
| ATH-03 | Problem user with image validation | problem_user |
| ATH-04 | Performance delay validation | performance_glitch_user |
| ATH-05 | Invalid credentials error | error_user (wrong password) |

### Checkout Tests (`checkout.cy.js`)

Complete purchase flow from login to order confirmation.

## Test Data

### Users (`cypress/fixtures/users.json`)
Contains credentials for different test scenarios (ATH-02 to ATH-05).

### Error Messages (`cypress/fixtures/errorsMessages.json`)
```json
{
  "lockedOut": "Sorry, this user has been locked out.",
  "invalidCredentials": "Username and password do not match any user in this service"
}
```

### Checkout Data (`cypress/fixtures/checkoutData.json`)
Sample data for filling checkout forms.

## Custom Commands

Reusable commands defined in `cypress/support/commands.js`:

- `cy.verifyUrl(path)` - Verifies current URL contains the specified path
- `cy.loginStandardUser()` - Logs in with standard_user credentials
- `cy.fillAndCompleteCheckout()` - Fills and submits checkout form
- `cy.verifyOrderComplete()` - Verifies order completion message

## Page Object Model

The project uses Page Object pattern for better maintainability:

- **LoginPage**: Login form interactions
- **ProductsPage**: Product listing page interactions
- **ProductDetailsPage**: Individual product detail page
- **CheckoutPage**: Checkout form and process
- **CartPage**: Shopping cart interactions

## Troubleshooting

### Cypress won't open
```bash
# Clear Cypress cache and reinstall
npx cypress cache clear
npm install cypress --save-dev
```

### Tests fail with network errors
- Check internet connection
- Verify `https://www.saucedemo.com` is accessible

### Environment variables not working
- Ensure `cypress.env.json` exists in the project root
- Verify JSON syntax is valid

## Additional Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Saucedemo Test Site](https://www.saucedemo.com)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)

---


