import HomePage from '../support/page-objects/HomePage.js'

describe('MarsAir Promotional Code Tests', () => {
    const successMsg = 'Seats available! Call 0800 MARSAIR to book!';
    const invalidPromoMsg = 'Sorry, code [..] is not valid"'
    const validPromoMsg_AF3 = 'Promotional code AF3-FJK-418 used: 30% discount!';
    const validPromoMsg_JJ5 = 'Promotional code JJ5-OPQ-320 used: 50% discount!';
    const noSeatsMsg = 'Sorry, there are no more seats available.';
    
   let promoCode = {};
    beforeEach(() => {
        HomePage.visit();
        HomePage.selectDepartingMonth('0'); // July
        HomePage.selectReturningMonth('2'); // July (next year)
        cy.fixture('promoCode').then((data) => {
            promoCode = data;
        });
    });
    it('TC011: Should apply a 30% discount with a valid promo code', () => {
        HomePage.enterPromotionCode(promoCode.validCode30);
        HomePage.clickSearch();
        HomePage.verifyMessage(noSeatsMsg);
        cy.get('#content').should(($content) => {
            const text = $content.text();
            expect(text.includes(successMsg) || text.includes(noSeatsMsg)).to.be.true;
          });
        cy.get('#content').should('contain.text', validPromoMsg_AF3);
        cy.log('Expected Behavior: Should display a message: Promotional code xyz used: x% discount!" are displayed.'); // bug found 
    });

    it('TC012: Should apply a 50% discount with a valid promo code', () => {
        HomePage.enterPromotionCode(promoCode.validCode50);
        HomePage.clickSearch();
        cy.get('#content').should(($content) => {
            const text = $content.text();
            expect(text.includes(successMsg) || text.includes(noSeatsMsg)).to.be.true;
          });
        cy.get('#content').should('contain.text', validPromoMsg_JJ5);
        cy.log('Expected Behavior: Should display a message: Promotional code xyz used: x% discount!" are displayed.'); // bug found 
    });

    it('TC013: Should try to apply an invalid promo code', () => {
        HomePage.enterPromotionCode(promoCode.invalidCodeWord);
        HomePage.clickSearch();
        cy.get('#content').should(($content) => {
            const text = $content.text();
            expect(text.includes(successMsg) || text.includes(noSeatsMsg)).to.be.true;
          });
        cy.get('#content').should('contain.text', invalidPromoMsg);
        cy.log('Expected Behavior: Should display a message: Sorry, code [..] is not valid"'); // bug found 
    });

    it('TC014: Should try to apply an Invalid Format (No Hyphens) promo code', () => {
        HomePage.enterPromotionCode(promoCode.invalidCode);
        HomePage.clickSearch();
        cy.get('#content').should(($content) => {
            const text = $content.text();
            expect(text.includes(successMsg) || text.includes(noSeatsMsg)).to.be.true;
          });
        cy.get('#content').should('contain.text', invalidPromoMsg);
        cy.log('Expected Behavior: Should display a message: Sorry, code [..] is not valid"'); // bug found 
    });

    it('TC015: Should try to apply an Invalid Format (Check Digit Fail) promo code', () => {
        HomePage.enterPromotionCode(promoCode.invalidCodeNumber);
        HomePage.clickSearch();
        cy.get('#content').should(($content) => {
            const text = $content.text();
            expect(text.includes(successMsg) || text.includes(noSeatsMsg)).to.be.true;
          });
        cy.get('#content').should('contain.text', invalidPromoMsg); 
        cy.log('Expected Behavior: Should display a message: Sorry, code [..] is not valid"'); // bug found 
    });

    it('TC016: Should try to apply an  Invalid Format (Additional Character) promo code', () => {
        HomePage.enterPromotionCode(promoCode.invalidCodeDigit);
        HomePage.clickSearch();
        cy.get('#content').should(($content) => {
            const text = $content.text();
            expect(text.includes(successMsg) || text.includes(noSeatsMsg)).to.be.true;
          });
        cy.get('#content').should('contain.text',invalidPromoMsg);
        cy.log('Expected Behavior: Should display a message: Sorry, code [..] is not valid"'); // bug found 
    });
});

