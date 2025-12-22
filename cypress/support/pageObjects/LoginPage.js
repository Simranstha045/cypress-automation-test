class LoginPage {
  // Selectors
  usernameInput = '#user-name';
  passwordInput = '#password';
  loginButton = '#login-button';
  errorMessage = '[data-test="error"]';
  appLogo = '.login_logo';

  // Methods
  visit() {
    cy.visit('/');
  }

  enterUsername(username) {
    cy.get(this.usernameInput).type(username);
  }
  
  enterPassword(password) {
    cy.get(this.passwordInput).type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  getErrorMessage() {
    return cy.get(this.errorMessage);
  }

  verifyIsVisible() {
    cy.get(this.appLogo).should('be.visible');
    cy.get(this.usernameInput).should('be.visible');
    cy.get(this.passwordInput).should('be.visible');
    cy.get(this.loginButton).should('be.visible');
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  loginByTestId(testID) {
    const users = require('../../fixtures/users.json');
    const user = users.find((u) => u.testID === testID);
    
    if (!user) {
      throw new Error(`User with testID "${testID}" not found in fixtures`);
    }
    
    cy.log(`${testID}: Logging in with username: ${user.username}`);
    this.login(user.username, user.password);
  }
}

export default LoginPage;
