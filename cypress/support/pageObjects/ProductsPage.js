class ProductsPage {
  // Selectors
  productElements = '.inventory_item';
  shoppingCartLink = '[data-test="shopping-cart-link"]';
  productName = '.inventory_item_name';
  productImage = '[data-test^="inventory-item-"][data-test$="-img"]';

  // Methods
  getProductName(index) {
    return cy.get(this.productElements).eq(index).find(this.productName);
  }

  getProductImage(index) {
    return cy.get(this.productElements).eq(index).find(this.productImage);
  }

  verifyProductsPageIsVisible() {
    return cy.get(this.productElements).should('have.length.greaterThan', 0);
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
