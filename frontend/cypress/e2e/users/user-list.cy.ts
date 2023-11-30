describe('UserList', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/users')
  })

  it('page should have header', () => {
    cy.get('div[qa-data="header"]').should('exist');
  })

  it('page should have table', () => {
    cy.get('table[qa-data="user-list-table"]').should('exist');
  })

  it('user list should have 7 column', () => {
    cy.get('table[qa-data="user-list-table"]').find('th').should('have.length', 7);
  })

  it('remove button should remove row', () => {
    cy.get('table[qa-data="user-list-table"] tbody')
      .find('tr')  // Assuming each row represents an item
      .its('length')
      .then((length) => {
        cy.get('button[qa-data="remove"]').first().click();

        cy.get('table[qa-data="user-list-table"] tbody tr').should('have.length', length - 1);
      });
  })
})
