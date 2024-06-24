describe('Moviemingle Test', () => {
  it('should go through Login and This or That until a winner is determined', () => {

    cy.viewport(550, 800);

    cy.exec('docker-compose up -d');

    cy.exec('docker-compose ps -q | find /c /v ""').then(result => {
      expect(result.stdout.trim()).to.not.be.empty;
    }).then(() => {

      // Wait for the server to become available
      cy.visit('http://localhost:5173/', {
        retryOnStatusCodeFailure: true,
        timeout: 30000, 
      });

      // Change to login 
      cy.get('a[href="/login"]').click(); 

      cy.url().should('eq', 'http://localhost:5173/login', {
        timeout: 30000, 
      });

      // Fill out the login form
      cy.get('input[name=username]').type('testuser');
      cy.get('input[name=password]').type('testpassword');

      cy.get('button[type="submit"]').click();

      cy.url().should('eq', 'http://localhost:5173/home', {
        timeout: 30000, 
      });
      
      // Click on the "Find your match now!" button
      cy.get('button.buttonStart').click();

      cy.url().should('eq', 'http://localhost:5173/select', {
        timeout: 30000, 
    });

    // Click on the genre checkboxes
    cy.get('input[type="checkbox"][value="28"]').click(); // Action/Adventure
    cy.get('input[type="checkbox"][value="10751"]').click(); // Family
    cy.get('input[type="checkbox"][value="80"]').click(); // Crime
    cy.get('input[type="checkbox"][value="18"]').click(); // Drama
    cy.get('input[type="checkbox"][value="35"]').click(); // Comedy
    cy.get('input[type="checkbox"][value="12"]').click(); // Fantasy

    // Verify the checkbox is checked
    cy.get('input[type="checkbox"][value="28"]').should('be.checked');
    cy.get('input[type="checkbox"][value="10751"]').should('be.checked');
    cy.get('input[type="checkbox"][value="80"]').should('be.checked');
    cy.get('input[type="checkbox"][value="18"]').should('be.checked');
    cy.get('input[type="checkbox"][value="35"]').should('be.checked');
    cy.get('input[type="checkbox"][value="12"]').should('be.checked');

    // Check if the language is set to "English"
    cy.get('select[name="lanuage"]').should('have.value', 'en');
    
    // Verify the slider values are correctly set
    cy.get('input[type="range"]').invoke('val').should('eq', '1990');

    // Select the option for 12 movies
    cy.get('input[type="radio"][value="12"]').click({ force: true });
    cy.get('input[type="radio"][value="12"]').should('be.checked');

     // Click on the "Start" button
     cy.get('button:contains("Start")').click();

     cy.url().should('eq', 'http://localhost:5173/this-or-that', {
       timeout: 30000, 
     });

   // Function to simulate clicking on This or That until a winner is determined
   const clickThisOrThatUntilWinner = () => {
    cy.get('.text-center').then(($roundInfo) => {
      const roundInfo = $roundInfo.text();
      if (!roundInfo.includes('Round')) {
        cy.visit('http://localhost:5173/winner'); 
        return;
      }
      cy.get('button:contains("This")').then(($thisButton) => {
        cy.get('button:contains("That")').then(($thatButton) => {
          if ($thisButton.length === 1 && $thatButton.length === 1) {
            const randomNumber = Math.random();
            if (randomNumber < 0.5) {
              cy.get('button:contains("This")').click();
            } else {
              cy.get('button:contains("That")').click();
            }
            cy.wait(1000);
            setTimeout(clickThisOrThatUntilWinner, 1000);
          }
        });
      });
    });
  };

clickThisOrThatUntilWinner();

  cy.url().should('eq', 'http://localhost:5173/winner', {
    timeout: 30000, 
  });

    // Click on the "Add to watchlist" button
    cy.contains('Add to watchlist').click();

    // Click on the sidebar link to navigate to the watchlist
    cy.get('.burger-menu').click(); 
    cy.get('li:contains("Watch List")').click();

    cy.url().should('eq', 'http://localhost:5173/watchlist', {
      timeout: 30000, 
    });
  
    });
  });
});
