/// <reference types="cypress" />

let Chance =  require('chance');
let chance =  new Chance();

Given(/^que acesso o site$/, () => {
    // rotas
    cy.server();
    cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**' ).as('postNewtable');
    cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**' ).as('postUsertable');
    cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**' ).as('getNewtable');
    
    // baseUrl + Register.html
    cy.visit('Register.html');
});

When(/^informar meus dados$/, () => {
    // type
    cy.get('input[placeholder="First Name"]').type(chance.first());
    cy.get('input[ng-model^=Last]').type(chance.last());
    cy.get('input[ng-model^=Email]').type(chance.email());
    cy.get('input[ng-model^=Phone]').type(chance.phone({formatted:false}));

    // check
    cy.get('input[value=FeMale]').check();
    cy.get('input[type=checkbox]').check('Cricket');
    cy.get('input[type=checkbox]').check('Hockey');

    // select
    cy.get('select#Skills').select('APIs');
    cy.get('select#countries').select('Brazil');
    cy.get('select#country').select('Japan', {force: true});
    cy.get('select#yearbox').select('1991');
    cy.get('select[ng-model^=month]').select('August');
    cy.get('select#daybox').select('19');
    cy.get('input#firstpassword').type('Ah*12345');
    cy.get('input#secondpassword').type('Ah*12345');

    // attachFile
    cy.get('input#imagesrc').attachFile('imagem.png');
});

When(/^salvar$/, () => {
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@postNewtable').then((resNewTable) => {
        expect(resNewTable.status).to.eq(200);
     });

     cy.wait('@postUsertable').then((resUserTable) => {
         expect(resUserTable.status).to.eq(200);
      });

      cy.wait('@getNewtable').then((resNewTable) => {
         expect(resNewTable.status).to.eq(200);
      });

      cy.url().should('contain', 'WebTable');
});

