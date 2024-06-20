describe('Register and Login Flow', () => {
  it('should register a new user and redirect to home, then log in', () => {

    cy.exec('docker-compose up -d');

    cy.exec('docker-compose ps -q | find /c /v ""').then(result => {
      expect(result.stdout.trim()).to.not.be.empty;
    }).then(() => {

      // Wait for the server to become available
      cy.visit('http://localhost:5173/', {
        retryOnStatusCodeFailure: true,
        timeout: 30000, 
      });

      cy.get('a[href="/login"]').click(); 

      cy.url().should('eq', 'http://localhost:5173/login', {
        timeout: 30000, 
      });

      // Fill out the login form
      cy.get('input[name=username]').type('testuser');
      cy.get('input[name=password]').type('testpassword');

      // Submit the login form
      cy.get('button[type="submit"]').click();

      // Wait for the URL to change
      cy.url().should('eq', 'http://localhost:5173/home', {
        timeout: 30000, 
      });
    });
  });
});