import HomePage from '../support/page-objects/HomePage.js'


describe('Verify Search Selection Test Cases', () => {
  const successMsg = 'Seats available! Call 0800 MARSAIR to book!';
  const invalidScheduleMsg = 'Unfortunately, this schedule is not possible. Please try again.';
  const noSeatsMsg = 'Sorry, there are no more seats available.';
    beforeEach(() => {
      HomePage.visit();
    })

  it('TC001: Should search for a valid date range', () => {
    HomePage.selectDepartingMonth('0'); // July
    HomePage.selectReturningMonth('2'); // July (next year)
    HomePage.clickSearch();
    cy.get('#content').should(($content) => {
      const text = $content.text();
      expect(text.includes(successMsg) || text.includes(noSeatsMsg)).to.be.true;
    });
    HomePage.goToHomePage();
  });

  it('TC002: Should search for a valid date range', () => {
    HomePage.selectDepartingMonth('3'); // December (next year)
    HomePage.selectReturningMonth('5'); // December (two years from now)
    HomePage.clickSearch();
    cy.get('#content').should(($content) => {
      const text = $content.text();
      expect(text.includes(successMsg) || text.includes(noSeatsMsg)).to.be.true;
    });
    HomePage.goToHomePage();
  });

  it('TC003: Should display error for return date < 1 year after departure (July to Dec)', () => {
    HomePage.selectDepartingMonth('0'); // July
    HomePage.selectReturningMonth('1'); // December
    HomePage.clickSearch();
    HomePage.verifyMessage(invalidScheduleMsg);
    HomePage.clickBack();
  });

  it('TC004: Should display error for return date < 1 year after departure (July two to Dec two)', () => {
    HomePage.selectDepartingMonth('4'); // July (two years from now)
    HomePage.selectReturningMonth('5'); // December (two years from now)
    HomePage.clickSearch();
    HomePage.verifyMessage(invalidScheduleMsg);
  });

  it('TC005: Should display error for same departure and return month (July)', () => {
    HomePage.selectDepartingMonth('0'); // July
    HomePage.selectReturningMonth('0'); // July
    HomePage.clickSearch();
    HomePage.verifyMessage(invalidScheduleMsg);
    cy.log('Expected Behavior: Should display a message: Unfortunately, this schedule is not possible. Please try again.'); // bug found 
  });

  it('TC006: Should display error for same departure and return month (December)', () => {
    HomePage.selectDepartingMonth('5'); // December (two years from now)
    HomePage.selectReturningMonth('5'); // December (two years from now)
    HomePage.clickSearch();
    HomePage.verifyMessage(invalidScheduleMsg);
    cy.log('Expected Behavior: Should display a message: Unfortunately, this schedule is not possible. Please try again.'); // bug found 
  });

  it('TC007: Should display error for return date before departure date', () => {
    HomePage.selectDepartingMonth('5'); // December (two years from now)
    HomePage.selectReturningMonth('3'); // December (next year)
    HomePage.clickSearch();
    HomePage.verifyMessage(invalidScheduleMsg);
    cy.log('Expected Behavior: Should display a message: Unfortunately, this schedule is not possible. Please try again.'); // bug found  
  });

  it('TC008: Should display error when departure date is not selected', () => {
    HomePage.selectReturningMonth('2'); // July (next year)
    HomePage.clickSearch();
    HomePage.verifyMessage(invalidScheduleMsg); 
    cy.log('Expected Behavior: Should display a message: Unfortunately, this schedule is not possible. Please try again.'); // bug found  
  });

  it('TC009: should display error when return date is not selected', () => {
    HomePage.selectDepartingMonth('0'); // July
    HomePage.clickSearch();
    HomePage.verifyMessage(invalidScheduleMsg); 
    cy.log('Expected Behavior: Should display a message: Unfortunately, this schedule is not possible. Please try again.'); // bug found 
  });
  it('TC010: Should display show error when both departing and returning date is not selected', () => {
    HomePage.clickSearch();
    HomePage.verifyMessage(invalidScheduleMsg); 
    cy.log('Expected Behavior: Should display a message: Unfortunately, this schedule is not possible. Please try again.'); // bug found 
  });
})