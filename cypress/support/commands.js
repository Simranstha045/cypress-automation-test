import LoginPage from './pageObjects/LoginPage';
import CheckoutPage from './pageObjects/CheckoutPage';

export const INVENTORY_URL = '/inventory';

Cypress.Commands.add('verifyUrl', (path) => {
  cy.url().should('include', path);
});

Cypress.Commands.add('loginStandardUser', () => {
  const loginPage = new LoginPage();
  cy.visit('/');
  loginPage.login(
    Cypress.env('username'), 
    Cypress.env('password')
  );
});

Cypress.Commands.add('fillAndCompleteCheckout', (checkoutData) => {
  const checkoutPage = new CheckoutPage();
  checkoutPage.fillCheckoutForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
  checkoutPage.clickContinue();
  checkoutPage.clickFinish();
});

