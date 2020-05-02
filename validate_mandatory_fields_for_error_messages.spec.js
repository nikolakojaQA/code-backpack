describe('Test case #2 - Validate mandatory fields for error messages', () => {
    it('Verify if the alarm messags are firing', () => {
        cy.visit('https://invoicely.com/')
        cy.get('.login').click()

        cy.url().should('include', '/login') //URL Check
        cy.get('#email_address').click().type('nikolakoja@yahoo.com')
        cy.get('#password').click().type('kojajako93')
        cy.get("button[form='login']").click()
        cy.get('a[href*="https://testingpurpose.invoicely.com"]').click() //My account link

        cy.get('.headline_main_button').click() //Click dropdown menu
        cy.get('.i_new_invoice').click() //Select invoice option
        cy.wait(2000)
        cy.get('.main_button').click()
        cy.get("button[data-submit-statement-action='save']").click()

        cy.get("p[class='alert error dynamic'").should('have.text', 'Please specify a client/vendor.')

        let parents = cy.get('.address.relative') // Get Client field
        let children = parents.last().children() //Get last child, this is the second one
        children.first().click() //Select the field
        cy.get('.connection_autocomplete').children() //Get all the options
        children.first().click() //Select the first option

       cy.get("input[id='datepicker'").clear().type('124569878') //enter wrong format
       cy.get('.main_button').click()
       cy.get("button[data-submit-statement-action='save']").click() //Run the save again
       cy.get("p[class='alert error dynamic'").should('have.text', 'The Date you entered is invalid.') //Check for error message

       cy.get("div[class='form_row inline hide_on_view']").children().last().then(function($input){ //i get to the value attribute
        $input[0].setAttribute('value', '') //Set it to blank
      })
      .should('have.attr', 'value', '') //Check if its set to blank

       cy.get('.main_button').click()
       cy.get("button[data-submit-statement-action='save']").click() //Run the save again
      // Check the error message
       cy.get("p[class='alert error dynamic'").should('have.text', 'An error occurred. Please try again or contact support. (Error Reference: missing_statement_id)')
    })
})