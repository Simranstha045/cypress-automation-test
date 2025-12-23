class ProductsPage {
  // Selectors
  productElements = '.inventory_item';
  shoppingCartLink = '[data-test="shopping-cart-link"]';
  productName = '.inventory_item_name';
  productImage = '[data-test^="inventory-item-"][data-test$="-img"]';
  appLogo = '.app_logo';
  pageTitle = '.title';
  sortDropdown = '[data-test="product-sort-container"]';

  // Methods
  getProductName(index) {
    return cy.get(this.productElements).eq(index).find(this.productName);
  }

  getProductImage(index) {
    return cy.get(this.productElements).eq(index).find(this.productImage);
  }

  verifyProductsPageIsVisible() {
    cy.get(this.appLogo).should('be.visible');
    cy.get(this.pageTitle).should('be.visible').and('contain', 'Products');
    cy.get(this.shoppingCartLink).should('be.visible');
    return cy.get(this.sortDropdown).should('be.visible');
  }

  verifyDetailImageIsDifferentFromListing(index, productDetailsPage) {
    return this.getProductImage(index)
      .invoke('attr', 'src')
      .then((listingSrc) => {
        this.getProductName(index).click();
        productDetailsPage.verifyImageIsDifferentFrom(listingSrc);
      });
  }
}

export default ProductsPage;
