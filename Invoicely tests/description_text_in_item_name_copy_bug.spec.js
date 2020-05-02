describe('Test case #13 - Inapropriate field text copy', () => {
    it('Does a check on the field data', () => {
        cy.visit('https://invoicely.com/')
        cy.get('.login').click()

        cy.url().should('include', '/login') //URL Check
        cy.get('#email_address').click().type('nikolakoja@yahoo.com')
        cy.get('#password').click().type('kojajako93')
        cy.get("button[form='login']").click()
        cy.get('a[href*="https://testingpurpose.invoicely.com"]').click() //My account link

        cy.get('.headline_main_button').click() //Click dropdown menu
        cy.get('.i_new_invoice').click() //Select invoice option

        cy.get("textarea[class='item_textarea']").type('This is not an item name') //Fill some text in the item description field
        cy.get("a[class='button dropdown-toggle']").click() //toggle dropdown to for the save item menu
        cy.get("a[data-popup-id='new_saved_item']").click()
        cy.get("textarea[name='create_edit_category[description]']").should('have.text', '') //Check desciption area for text
        console.log('The description textarea is empty, the item field has the value')
    })
})