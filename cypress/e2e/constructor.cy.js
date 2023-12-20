import {setCookie} from "../../src/utils/cookie";

describe('Application', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'}).as('getUser');
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'}).as('postOrder');

    setCookie('accessToken', 'test-accessToken');
    setCookie('refreshToken', 'test-refreshToken');
  });

  // afterEach(() => {
  //   cy.clearCookies();
  // });

  it('Should open constructor page, load ingredients, open and close ingredient modal', () => {
    cy.wait('@getIngredients');
    cy.wait('@getUser');
    cy.get('[data-testid=main-header]').contains('Соберите бургер');

    cy.get('[data-testid=ingredient-643d69a5c3f7b9001cfa093c]').click();
    cy.get('[data-testid=ingredient-details-header]').should('have.text', 'Детали ингредиента');
    cy.get('[data-testid=ingredient-details-name').should('have.text', 'Краторная булка N-200i');

    cy.get('[data-testid=modal-close]').click();
    cy.contains("Детали ингредиента").should("not.exist");

    cy.get('[data-testid=ingredient-643d69a5c3f7b9001cfa093c]').trigger('dragstart');
    cy.get('[data-testid=hoop]').trigger('drop');

    cy.get('[data-testid=create-order-button]').click();
    cy.wait('@postOrder').its('request.body').should('deep.equal', {
      "ingredients": [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093c"
      ]
    });
  });
})
