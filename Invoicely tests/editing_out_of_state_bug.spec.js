describe('Test case #11 - Editing invoice when out of "edit" state', () => {
    it('Simulates the Editing from a different tab', () => {
        cy.visit('https://invoicely.com/')
        cy.get('.login').click()

        cy.url().should('include', '/login') //URL Check
        cy.get('#email_address').click().type('nikolakoja@yahoo.com')
        cy.get('#password').click().type('kojajako93')
        cy.get("button[form='login']").click()
        cy.get('a[href*="https://testingpurpose.invoicely.com"]').click() //My account link

        cy.get('.headline_main_button').click() //Click dropdown menu
        cy.get('.i_new_invoice').click() //Select invoice option
        cy.get("input[value='Invoice']").clear().type("TestInvoice1").should('have.value', 'TestInvoice1')

        //Had to access this way to have it load the data and allow me to select the field
        let parents = cy.get('.address.relative') // Client field
        let children = parents.last().children() //Get second child
        children.first().click() //Select the field
        cy.get('.connection_autocomplete').children() //Get all the options
        children.first().click() //Select the first option
        cy.get('.main_button').click()
        cy.get("button[data-submit-statement-action='save']").click()
        cy.visit('https://testingpurpose.invoicely.com/settings/emails/edit/statement_footer') //Cypress does not work with multiple tabs unfotunatelly
        cy.get('#editor_text').clear().type('some change for testing purpose') //change footer text
        cy.get("button[data-form-id='editor']").click()
        cy.visit('https://testingpurpose.invoicely.com/invoices/list/draft/client:/profile:/search:/page:')
        cy.get('.headline_main_button').click() //Click dropdown menu
        cy.get('.i_new_invoice').click() //Select invoice option
        cy.get('footer').children().first().should('be.text', 'some change for testing purpose') //check if footer text is changed


        
    })
})