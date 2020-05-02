describe('Test case #1 - Fill in required fields and save invoice', () => {
    it('Does a check on save invoice feature', () => {
        cy.visit('https://invoicely.com/')
        cy.get('.login').click()

        cy.url().should('include', '/login') //URL Check
        cy.get('#email_address').click().type('nikolakoja@yahoo.com')
        cy.get('#password').click().type('kojajako93')
        cy.get("button[form='login']").click()
        cy.get('a[href*="https://testingpurpose.invoicely.com"]').click() //My account link

        cy.get('.headline_main_button').click() //Click dropdown menu
        cy.get('.i_new_invoice').click() //Select invoice option

        let parents = cy.get('.address.relative') // Client field
        let children = parents.last().children() //Get second child
        children.first().click() //Select the field
        cy.get('.connection_autocomplete').children() //Get all the options
        children.first().click() //Select the first option
        cy.get('.main_button').click()
        cy.get("button[data-submit-statement-action='save']").click()

        cy.get("p[class='alert success dynamic']").should('have.text', 'Invoice added.') //Check if Invoice was added successfully
    })
})