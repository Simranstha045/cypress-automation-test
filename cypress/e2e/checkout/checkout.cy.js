import LoginPage from '../../support/pageObjects/LoginPage';
import ProductsPage from '../../support/pageObjects/ProductsPage';
import CheckoutPage from '../../support/pageObjects/CheckoutPage';
import CartPage from '../../support/pageObjects/CartPage';

describe('CheckoutE2EFlow', () => {
    let checkoutPage;
    let productsPage;
    let cartPage;

    beforeEach(() => {
        checkoutPage = new CheckoutPage();
        productsPage = new ProductsPage();
        cartPage = new CartPage();
        cy.loginStandardUser();
    });

    it('should be able to order succesfully', () => {
        checkoutPage.addProductsAndNavigateToCheckout();

        cy.fixture('checkoutData').then((data) => cy.fillAndCompleteCheckout(data[0]));

        checkoutPage.verifyOrderIsComplete();
    });

    it('should not allow to order with empty cart', () => {
        cy.get(productsPage.shoppingCartLink).click();
        cy.url().should('include', '/cart');

        cy.get(cartPage.cartItems).should('not.exist');
        cy.get(cartPage.checkoutButton).should('not.exist');
        cy.get(cartPage.continueShoppingButton).should('be.visible');
    });
    
    it('should show error for whitespace postal code', () => {
        checkoutPage.addProductsAndNavigateToCheckout();

        cy.fixture('checkoutData').then((data) => {
            checkoutPage.fillCheckoutForm(data[1].firstName, data[1].lastName, data[1].postalCode);
            checkoutPage.clickContinue();
            checkoutPage.getErrorMessage().should('be.visible').and('contain', 'Postal Code is required');
        });
    });
});