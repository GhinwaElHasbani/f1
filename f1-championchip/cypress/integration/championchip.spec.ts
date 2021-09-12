describe('F1 championchip test', () => {

  before(() => {
    cy.visit('/');
  })

  afterEach(() => {
    cy.wait(500);
  })

  it('Visits the initial project page', () => {
    cy.contains('Seasons');
  })

  it('Renders the list of seasons list', () => {
    // cy.rou .requestsCountByUrl('http://theUrl.com').should('eq', 1);
    let cardElement = cy.get('mat-card.card-element');
    cardElement.should('have.length', 17);
    cy.get('mat-card.card-element').last().scrollIntoView();
    cardElement.last().click();
  })

  it('Redirect the details of last season', () => {
    let cardElement = cy.get('mat-card.card-element');
    cardElement.last().click();
    cy.url().should('include', '/f1/2005/races');
  })

  it('Should show 10 races', () => {
    let tableRow = cy.get('div.record-data-row');
    tableRow.should('have.length', 10);
  })

  it('Should have a more button', () => {
    let moreBtnEl = cy.get('button.more-btn');
    moreBtnEl.first().should('be.visible');
  })

  it('Should load 10 more records', () => {
    let moreBtnEl = cy.get('button.more-btn');
    moreBtnEl.first().click();
    let tableRow = cy.get('div.record-data-row');
    tableRow.should('have.length.above', 10);
  })

  it('Should highlight the records with pos 1 the champion', () => {
    let tableRow = cy.get('div.record-data-row.highlighted');
    tableRow.should('have.length', 7);
  })

  it('Should expand a race row to show results', () => {
    let tableRow = cy.get('div.record-data-row');
    tableRow.should('have.class', 'pointer');
    tableRow.first().click();
    let cardElement = cy.get('mat-card.card-element');
    cardElement.should('have.length', 20);
    cy.get('mat-card.card-element').last().scrollIntoView();
  })
})
