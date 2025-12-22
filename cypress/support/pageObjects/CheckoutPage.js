class CheckoutPage {
  // Selectors
  firstNameInput = '[data-test="firstName"]';
  lastNameInput = '[data-test="lastName"]';
  postalCodeInput = '[data-test="postalCode"]';
  continueButton = '[data-test="continue"]';
  finishButton = '[data-test="finish"]';
  errorMessage = '[data-test="error"]';
  orderComplete = '.complete-header';
  checkoutButton = '[data-test="checkout"]';
  productSortContainer = '[data-test="product-sort-container"]';
  inventoryItem = '.inventory_item';
  shoppingCartBadge = '.shopping_cart_badge';
  shoppingCartLink = '[data-test="shopping-cart-link"]';
  addToCartBoltTshirt = '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]';
  removeBoltTshirt = '[data-test="remove-sauce-labs-bolt-t-shirt"]';
  removeSauceLabsSelector = '[data-test*="remove-sauce-labs-"]';

  // Methods
  addProductsAndNavigateToCheckout() {
    this.prepareCartWithSelectedProducts();
    this.navigateFromCartToCheckout();
  }

  prepareCartWithSelectedProducts() {
    cy.get(this.productSortContainer).select('hilo');
    cy.get(this.inventoryItem).first().find('[data-test^="add-to-cart"]').click();
    cy.get(this.shoppingCartBadge).should(($badge) => {
      expect($badge.text()).to.equal('1');
    });

    cy.get(this.productSortContainer).select('lohi');
    cy.get(this.inventoryItem).first().find('[data-test^="add-to-cart"]').click();
    cy.get(this.shoppingCartBadge).should(($badge) => {
      expect($badge.text()).to.equal('2');
    });

    cy.get(this.addToCartBoltTshirt).click();
    cy.get(this.shoppingCartBadge).should(($badge) => {
      expect($badge.text()).to.equal('3');
    });

    cy.get(this.removeSauceLabsSelector).eq(0).click();
    cy.get(this.shoppingCartBadge).should(($badge) => {
      expect($badge.text()).to.equal('2');
    });

    cy.get(this.removeBoltTshirt).click();
    cy.get(this.shoppingCartBadge).should(($badge) => {
      expect($badge.text()).to.equal('1');
    });
  }

  navigateFromCartToCheckout() {
    cy.get(this.shoppingCartLink).click();
    cy.url().should('include', '/cart');
    cy.get(this.checkoutButton).click();
    cy.url().should('include', '/checkout-step-one');
  }

  clickContinue() {
    cy.get(this.continueButton).click();
  }

  clickFinish() {
    cy.get(this.finishButton).click();
  }

  getErrorMessage() {
    return cy.get(this.errorMessage);
  }

  verifyOrderIsComplete() {
    cy.get(this.orderComplete).should('contain', 'Thank you for your order!');
  }

  fillCheckoutForm(firstName, lastName, postalCode) {
    if (firstName) {
      cy.get(this.firstNameInput).clear().type(firstName);
    }
    if (lastName) {
      cy.get(this.lastNameInput).clear().type(lastName);
    }
    if (postalCode) {
      cy.get(this.postalCodeInput).clear().type(postalCode);
    } else {
      cy.get(this.postalCodeInput).clear();
    }
  }
}

export default CheckoutPage;
