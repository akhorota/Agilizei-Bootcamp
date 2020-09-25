/// <reference types="cypress" />

let Chance =  require('chance');
let chance =  new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        // rotas
        cy.server();
        cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**' ).as('postNewtable');
        cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**' ).as('postUsertable');
        cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**' ).as('getNewtable');

        // baseUrl + Register.html
        cy.visit('Register.html');

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

        // click
        cy.get('button#submitbtn').click();

        cy.wait('@postNewtable').then((resNewTable) => {
           // chai
           expect(resNewTable.status).to.eq(200);
        });

        cy.wait('@postUsertable').then((resUserTable) => {
            // chai
            expect(resUserTable.status).to.eq(200);
         });

         cy.wait('@getNewtable').then((resNewTable) => {
            // chai
            expect(resNewTable.status).to.eq(200);
         });

         cy.url().should('contain', 'WebTable');

    });
});

// elementos
// input[placeholder="First Name"]
// input[ng-model^=Last]
// input[ng-model^=Email]
// input[ng-model^=Phone]
// input[value=FeMale]
// input[type=checkbox]
// select#Skills
// select#countries
// select#country
// select#yearbox
// select[ng-model^=month]
// select#daybox
// input#firstpassword
// input#secondpassword