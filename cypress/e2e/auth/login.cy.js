import LoginPage from '../../support/pageObjects/LoginPage';
import ProductsPage from '../../support/pageObjects/ProductsPage';
import ProductDetailsPage from '../../support/pageObjects/ProductDetailsPage';
import { INVENTORY_URL } from '../../support/commands';

const users = require('../../fixtures/users.json');
const errorMessages = require('../../fixtures/errorsMessages.json');

describe('Authentication Tests', () => {
  let loginPage;
  let productsPage;
  let productDetailsPage;

  before(() => {
    loginPage = new LoginPage();
    productsPage = new ProductsPage();
    productDetailsPage = new ProductDetailsPage();
  });

  it('login tests for multiple users and scenarios', () => {
    // ATH-01: Standard user login
    cy.log('ATH-01: Standard user login');
    loginPage.visit();
    loginPage.verifyIsVisible();

    cy.loginStandardUser();

    
    cy.verifyUrl(INVENTORY_URL);
    productsPage.verifyProductsPageIsVisible();

    // ATH-02: Locked out user error
    cy.log('ATH-02: Locked out user');
    loginPage.visit();
    loginPage.verifyIsVisible();
    
    loginPage.loginByTestId('ATH-02');
    
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', errorMessages.lockedOut);

    // ATH-03: Problem user login with image validation
    cy.log('ATH-03: Problem user login');
    loginPage.visit();
    loginPage.verifyIsVisible();
    
    loginPage.loginByTestId('ATH-03');
    
    cy.verifyUrl(INVENTORY_URL);
    productsPage.verifyProductsPageIsVisible();
    
    productsPage.getProductImage(0)
      .invoke('attr', 'src')
      .then((srcValue) => {
        productsPage.getProductName(0).click();
        productDetailsPage.verifyImageIsDifferentFrom(srcValue);
      });

    // ATH-04: Performance glitch user login delay
    cy.log('ATH-04: Performance glitch user');
    loginPage.visit();
    loginPage.verifyIsVisible();
    
    const startTime = Date.now();
    
    loginPage.loginByTestId('ATH-04');
    cy.verifyUrl(INVENTORY_URL);
    
    cy.then(() => {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      cy.log(`Page load time: ${timeTaken}ms`);
      expect(timeTaken).to.be.greaterThan(250);
    });
    
    productsPage.verifyProductsPageIsVisible();

    // ATH-05: Invalid credentials error
    cy.log('ATH-05: Invalid credentials');
    loginPage.visit();
    loginPage.verifyIsVisible();
    
    loginPage.loginByTestId('ATH-05');
    
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', errorMessages.invalidCredentials);
  });
});
