import { Helpers } from "cypress/helpers/helper";

describe('F1 seasons switch test', () => {

    before(() => {
        cy.visit('/');
    });

    afterEach(() => {
        cy.wait(500);
    });

    it('Opens details of selected season', () => {
        let cardElement = cy.get('mat-card.card-element');
        cardElement.eq(Helpers.getRandomNumber(0, 16)).click();
        cy.url().should('include', '/races');
    });

    it('Contains a seasons list options', () => {
        // let header = cy.get('f1-menu-header');
        // header.first().invoke('attr', 'withMenu').should('eq', true);

    });

    it('Rerenders data when changing season', () => {
        cy.get('mat-select[formControlName=selectedSection]').click().get('mat-option').eq(3).click();
        cy.wait(500);
        cy.get('mat-select[formControlName=selectedSection]').click().get('mat-option').eq(7).click();
        cy.wait(500);
        cy.get('mat-select[formControlName=selectedSection]').click().get('mat-option').eq(11).click();
    });

    it('Should go back to the landing page', () => {
        cy.get('mat-icon.back-btn').first().click();
        cy.url().should('include', '/landing/f1');
    });
})
