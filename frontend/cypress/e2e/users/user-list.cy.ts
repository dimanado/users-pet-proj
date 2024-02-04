import { environment } from '@env/environment';

describe('UserList', () => {
  beforeEach(() => {
    cy.intercept('GET', `${environment.backendApi}/users`, { fixture: 'users/users.json' });
    cy.intercept('DELETE', `${environment.backendApi}/users/*`, { fixture: 'users/users.json' });
    cy
      .intercept('POST', `${environment.backendApi}/users`, { fixture: 'users/create-user.json' })
      .as('createUser');
    cy
      .intercept('PUT', `${environment.backendApi}/users/*`, { fixture: 'users/update-user.json' })
      .as('updateUser');
    cy.visit(`${environment.frontendApi}/users`);
  });

  it('page should have header', () => {
    cy.get('div[qa-data="header"]').should('exist');
  });

  it('page should have table', () => {
    cy.get('table[qa-data="user-list-table"]').should('exist');
  });

  it('user list should have 7 column', () => {
    cy.get('table[qa-data="user-list-table"]').find('th').should('have.length', 7);
  });

  it('remove button should remove row', () => {
    cy.get('table[qa-data="user-list-table"] tbody')
      .find('tr')
      .its('length')
      .then((length) => {
        cy.get('button[qa-data="remove"]').first().click();

        cy.get('table[qa-data="user-list-table"] tbody tr').should('have.length', length - 1);
      });
  });

  it('open modal for creating new user', () => {
    cy.get('button[qa-data="add-user"]').first().click();
    cy.get('app-dialog-base-header[title="Profile Form"]').should('exist');
  });

  it('create new user', () => {
    cy.get('table[qa-data="user-list-table"] tbody')
      .find('tr')  // Assuming each row represents an item
      .its('length')
      .then((initialLength) => {
        cy.get('button[qa-data="add-user"]').first().click();

        cy.wait(500)
        cy.get('input[formcontrolname="name"]').type('John');
        cy.get('input[formcontrolname="lastName"]').type('Doe');
        cy.get('input[formcontrolname="age"]').type('25');
        cy.get('input[formcontrolname="height"]').type('180');
        cy.get('input[formcontrolname="weight"]').type('75');
        cy.get('button[data-qa="submit"]').click();

        cy.wait('@createUser')
        cy.get('table[qa-data="user-list-table"] tbody tr').should('have.length', initialLength + 1);
      });
  });

  it('update user', () => {
    cy.get('table[qa-data="user-list-table"] tbody')
      .find('tr')
      .its('length')
      .then((length) => {
        cy.get('button[qa-data="edit"]').first().click();

        cy.wait(500);
        cy.get('input[formcontrolname="name"]').clear().type('John');
        cy.get('button[data-qa="submit"]').click();

        cy.wait('@updateUser');
        cy.get('table[qa-data="user-list-table"] tbody td.mat-column-name').first().contains('John');
      });
  });
})
