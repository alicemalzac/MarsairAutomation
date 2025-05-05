class HomePage {
    visit(){
        cy.visit('https://marsair.recruiting.thoughtworks.net/AliceMalzac');
    }
    selectDepartingMonth(value) {
        cy.get('#departing').select(value)
    }

    selectReturningMonth(value) {
        cy.get('#returning').select(value)
    }

    enterPromotionCode(promocode){
        cy.get('#promotional_code').type(promocode);
    }

    clickSearch() {
        cy.get(':nth-child(5) > dd > input')
          .should('be.visible')
          .click()
    }

    verifyMessage(message){
        cy.get('h2')
          .should('contain.text', 'Search Results')
    
        cy.get('#content')
          .should('contain.text', message)
        
        cy.contains('a', 'Back')
          .should('be.visible')
    }

    clickBack(){
        cy.contains('a', 'Back').click()
        cy.get('#departing').should('be.visible');
        cy.url().should('eq', 'https://marsair.recruiting.thoughtworks.net/AliceMalzac');
    }

    goToHomePage() {
        cy.get('a[href="/AliceMalzac"]').click()
        cy.get('#departing').should('be.visible');
        cy.url().should('eq', 'https://marsair.recruiting.thoughtworks.net/AliceMalzac');
    }
}
export default new HomePage();