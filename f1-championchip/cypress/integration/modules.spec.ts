import { Helpers } from "cypress/helpers/helper";

describe('F1 modules for specific season test', () => {

    before(() => {
        cy.visit('/');
    })

    afterEach(() => {
        cy.wait(1000);
    })

    it('Opens details of selected season', () => {
        let cardElement = cy.get('mat-card.card-element');
        cardElement.eq(Helpers.getRandomNumber(0, 16)).click();
        cy.url().should('include', '/races');
    })

    it('Should show list of races', () => {
        let tableRow = cy.get('div.record-data-row');
        tableRow.should('have.length.above', 0);
    })

    it('Should open drivers list', () => {
        let menuItems = cy.get('a.tab_item');
        menuItems.eq(1).click();
        cy.url().should('include', '/drivers');
        cy.get('div.main-title').contains('Drivers');
        let tableRow = cy.get('div.record-data-row');
        tableRow.should('have.length.above', 0);
    })

    it('Should open constructors list', () => {
        let menuItems = cy.get('a.tab_item');
        menuItems.eq(2).click();
        cy.url().should('include', '/constructors');
        cy.get('div.main-title').contains('Constructors');
        let tableRow = cy.get('div.record-data-row');
        tableRow.should('have.length.above', 0);
    })

    it('Should open circuits list', () => {
        let menuItems = cy.get('a.tab_item');
        menuItems.eq(3).click();
        cy.url().should('include', '/circuits');
        cy.get('div.main-title').contains('Circuits');
        let tableRow = cy.get('div.record-data-row');
        tableRow.should('have.length.above', 0);
    })

    it('Should open wiki link', () => {
        let linkCells = cy.get('mat-icon.linkicon');
        linkCells.first().click();
    })
})
