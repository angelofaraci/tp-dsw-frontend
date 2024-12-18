describe('Post and delete a review', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should create an account', () => {
    cy.contains('a', 'Sign Up').click()
    cy.get('#user').type('test')
    cy.get('#email').type('test@test')
    cy.get('#password').type('passwordtest')
    cy.contains('button', 'Confirm Registration').click()
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/home');
    });
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.be.ok
    })
  })
  
  

  it('Should log in to an account', () => {
    //cy.contains('a', 'Sign Out').click()
    cy.contains('a', 'Log In').click();
    cy.get('#email').type('test@test');
    cy.get('#password').type('passwordtest');
    cy.contains('button', 'Sign In').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/home');
    });
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.be.ok;
    });
  });

 
  


  it('Should show the game page', () => {
    cy.contains('a', 'Log In').click();
    cy.get('#email').type('test@test');
    cy.get('#password').type('passwordtest');
    cy.contains('button', 'Sign In').click();
    cy.get('#game-22').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/game/22');
    });
  });

  it('Should post a review', () => {
    cy.contains('a', 'Log In').click();
    cy.get('#email').type('test@test');
    cy.get('#password').type('passwordtest');
    cy.contains('button', 'Sign In').click();
    cy.wait(3000);
    cy.get('.carousel-item').first().click();
    cy.wait(3000);
    cy.get('#createReviewButton').click();
    cy.get('#rating').type('55');
    cy.get('#comment').type('this is a test');
    cy.contains('h3', 'test').should('not.exist');
    cy.get('#submit-review').click();
    cy.wait(3000);
    cy.contains('h3', 'test').should('exist');
  });

  it('Should edit a review', () => {
    cy.contains('a', 'Log In').click();
    cy.get('#email').type('test@test');
    cy.get('#password').type('passwordtest');
    cy.contains('button', 'Sign In').click();
    cy.wait(3000);
    cy.get('.carousel-item').first().click();
    cy.wait(3000);
    cy.get('#editButton').click();
    cy.wait(3000);
    cy.get('#rating').type('55');
    cy.get('#comment').type('this is an edit');
    cy.get('#submit-review').click();
    cy.wait(3000);
    cy.contains('h3', 'test').should('exist');
    cy.contains('p', 'this is an edit').should('exist');
  });

  it('Should delete a review', () => {
    cy.contains('a', 'Log In').click();
    cy.get('#email').type('test@test');
    cy.get('#password').type('passwordtest');
    cy.contains('button', 'Sign In').click();
    cy.wait(3000);
    cy.get('.carousel-item').first().click();
    cy.contains('h3', 'test').should('exist');
    cy.wait(3000);
    cy.get('#deleteButton').click();
    cy.wait(3000);
    cy.contains('h3', 'test').should('not.exist');
  });
});
