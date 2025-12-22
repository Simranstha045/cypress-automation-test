import LoginPage from "../../support/pageObjects/LoginPage";
import ProductsPage from "../../support/pageObjects/ProductsPage";
import ProductDetailsPage from "../../support/pageObjects/ProductDetailsPage";
const users = require('../../fixtures/users.json');
const errorMessages = require('../../fixtures/errorsMessages.json');
import { INVENTORY_URL } from '../../support/commands';

describe('Authentication Tests - Separate IT Blocks', () => {
  let loginPage;
  let productsPage;
  let productDetailsPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    productsPage = new ProductsPage();
    productDetailsPage = new ProductDetailsPage();
  });

it('ATH-01: Should login with standard_user', () => {
  // cy.intercept('POST', '**/events.backtrace.io/**').as('backtracAPI');

  loginPage.visit();
  loginPage.verifyIsVisible();

  cy.loginStandardUser();

  // cy.wait('@backtracAPI').its('response.statusCode').should('eq', 200);
  cy.verifyUrl(INVENTORY_URL);
  productsPage.verifyProductsPageIsVisible();
});

it('ATH-02: Should handle locked_out_user error', () => {
  loginPage.visit();
  loginPage.verifyIsVisible();

  const { username, password } = users.find(u => u.testID === 'ATH-02');
  loginPage.login(username, password);

  loginPage.getErrorMessage()
    .should('be.visible')
    .and('contain', errorMessages.lockedOut);
});

it('ATH-03: Should login with problem_user', () => {
  loginPage.visit();
  loginPage.verifyIsVisible();

  const { username, password } = users.find(u => u.testID === 'ATH-03');
  loginPage.login(username, password);

  cy.verifyUrl(INVENTORY_URL);
  productsPage.verifyProductsPageIsVisible();

  productsPage.verifyDetailImageIsDifferentFromListing(0, productDetailsPage);
});

it('ATH-04: Should handle performance_glitch_user login delay', () => {
  loginPage.visit();
  loginPage.verifyIsVisible();
  const { username, password } = users.find(u => u.testID === 'ATH-04');
  const startTime = Date.now();
  loginPage.login(username, password);

  cy.verifyUrl(INVENTORY_URL);
  productsPage.verifyProductsPageIsVisible().then(() => {
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    cy.log(`Time taken to load products page: ${timeTaken} ms`);
    expect(timeTaken).to.be.greaterThan(1000);
  });
});

it('ATH-05: Should handle invalid credentials', () => {
  loginPage.visit();
  loginPage.verifyIsVisible();
  const { username, password } = users.find(u => u.testID === 'ATH-05');
  loginPage.login(username, password);
  loginPage.getErrorMessage()
    .should('be.visible')
    .and('contain', errorMessages.invalidCredentials);
});
});