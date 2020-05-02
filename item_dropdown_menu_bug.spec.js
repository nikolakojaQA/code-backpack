describe('Test case #10 - Item dropdown menu bug', () => {
    it('Does a negative check on the element visability', () => {
        cy.visit('https://invoicely.com/')
        cy.get('.login').click()

        cy.url().should('include', '/login') //URL Check
        cy.get('#email_address').click().type('nikolakoja@yahoo.com')
        cy.get('#password').click().type('kojajako93')
        cy.get("button[form='login']").click()
        cy.get('a[href*="https://testingpurpose.invoicely.com"]').click() //My account link

        cy.get('.headline_main_button').click() //Click dropdown menu
        cy.get('.i_new_invoice').click() //Select invoice option
        cy.scrollTo('center')
        cy.get("select[class='with_addon']").select('custom').should('have.value', 'custom') //Select the custom option from the dropdown
        cy.get('.select_arrows').get('style').should('be.hidden') //confirm the arrow is hidden
        console.log('Dropdown arrow is hidden!')
        })
    })