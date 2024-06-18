describe('Register and Login Flow', () => {
  it('should register a new user and redirect to home', () => {
    cy.visit('http://localhost:5173/register', { wait: 5000 });

    // Fill out the registration form
    cy.wait(5000);
    cy.get('input[name="username"]').should('exist').wait(10000);
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('testpassword');
    cy.get('input[name="verifyPassword"]').type('testpassword');

    // Submit the registration form
    cy.get('button[type="submit"]').click();

    // Wait for the registration request to complete
    cy.wait('@registerRequest');

    // Verify the cookie is set
    cy.getCookie('TOKEN').should('exist');

    // Verify redirection to home page
    cy.url().should('eq', 'http://localhost:5173/home');
  });

  /* it('should log out the user and redirect to login', () => {
    // Ensure the user is logged in by setting the cookie
    cy.setCookie('TOKEN', 'fakeToken');

    // Visit the home page
    cy.visit('http://localhost:5173/home');

   // Click the logout button
    cy.wait(5000);
    cy.contains('Logout').should('exist').wait(10000);
    cy.contains('Logout').click();

    // Verify the cookie is removed
    cy.getCookie('TOKEN').should('not.exist');

    // Verify redirection to login page
    cy.url().should('eq', 'http://localhost:5173/login');
  });*/
});