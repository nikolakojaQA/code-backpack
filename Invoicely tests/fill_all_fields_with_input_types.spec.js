describe('Test case #3 - Fill all fields with various input types and save', () => {
    it('Does a check field type support', () => {
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

        cy.get("input[name='statement[custom_title]'").type('TestingTitle') //Title change
        cy.get("textarea[name='statement[description]'").type('2020, This is a testing description') //Description Change
        cy.get("input[name='statement_po_number'").click().type('text-124578<>') //Statment number change
        .should('have.value', 'text-124578<>')
        cy.get("textarea[class='item_textarea']").type('mix of text and numbers, 555666 !@# and symbols') //Item Description
        cy.get("input[name='statement[item_quantity]'").type('4asd') //item quantity
        cy.get("input[name='statement[item_rate]'").type('somerate11') //item rate
        cy.get("textarea[name='statement[notes]'").type('Filling out some note with numbers and symbols too 78435:}:"?><<:"') //Notes area

        cy.get('.main_button').click()
        cy.get("button[data-submit-statement-action='save']").click() //save the invoice
    })
})