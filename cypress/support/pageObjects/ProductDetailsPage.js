class ProductDetailsPage {
  // Selectors
  productDetailImage = '[data-test^="item-sauce-labs-"]';

  // Methods
  getProductDetailImage() {
    return cy.get(this.productDetailImage);
  }

  verifyImageIsDifferentFrom(expectedSrc) {
    return this.getProductDetailImage()
      .invoke('attr', 'src')
      .then((detailSrcValue) => {
        expect(expectedSrc).to.not.equal(detailSrcValue);
      });
  }
}

export default ProductDetailsPage;
