describe('Register and Login Flow', () => {
    it('should register a new user and redirect to home', () => {
      cy.visit('http://localhost:3000/register');
  
      // Fill out the registration form
      cy.get('input[placeholder="E-Mail or Username"]').type('testuser');
      cy.get('input[placeholder="Password"]').type('testpassword');
      cy.get('input[placeholder="Verify Password"]').type('testpassword');
  
      // Submit the registration form
      cy.get('button').contains('Register').click();
  
      // Wait for the registration request to complete
      cy.intercept('POST', 'http://localhost:8082/authenticate/register').as('registerRequest');
      cy.wait('@registerRequest');
  
      // Verify the cookie is set
      cy.getCookie('TOKEN').should('exist');
  
      // Verify redirection to home page
      cy.url().should('eq', 'http://localhost:3000/home');
    });
  
    it('should log out the user and redirect to login', () => {
      // Ensure the user is logged in by setting the cookie
      cy.setCookie('TOKEN', 'fakeToken');
  
      // Visit the home page
      cy.visit('http://localhost:3000/home');
  
      // Click the logout button (assuming there's a logout button in the navbar or elsewhere)
      cy.get('button').contains('Logout').click();
  
      // Verify the cookie is removed
      cy.getCookie('TOKEN').should('not.exist');
  
      // Verify redirection to login page
      cy.url().should('eq', 'http://localhost:3000/login');
    });
  });
  