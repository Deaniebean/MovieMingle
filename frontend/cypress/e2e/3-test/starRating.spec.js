// cypress/integration/starRating.spec.js

describe('StarRating Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
    });
  
    const starRatingSelector = 'div.text-2xl'; 
      
    it('should set and submit a rating', () => {
      cy.get(starRatingSelector).as('starRating');
  
      // Click on the third star (index 2, because it's zero-based)
      cy.get('@starRating').find('span').eq(2).click();
  
      // Verify that the third star is active (selected)
      cy.get('@starRating').find('span').eq(2).find('svg').should('have.class', 'MuiSvgIcon-root');
  
      // Verify that the rating is submitted correctly
      cy.get('@starRating').then(($starRating) => {
        const selectedRating = $starRating.find('span').eq(2).text();
        cy.wrap(selectedRating).should('equal', '3'); 
      });
    });
  
    it('should display correct rating when hovering over stars', () => {
      cy.get(starRatingSelector).as('starRating');
  
      // Hover over the fourth star (index 3)
      cy.get('@starRating').find('span').eq(3).trigger('mouseover');
  
      // Verify that the first four stars are active (hovered)
      cy.get('@starRating').find('span').each(($star, index) => {
        if (index < 4) {
          cy.wrap($star).find('svg').should('have.class', 'MuiSvgIcon-root');
        } else {
          cy.wrap($star).find('svg').should('not.have.class', 'MuiSvgIcon-root');
        }
      });
    });
  
    it('should render correct number of stars', () => {
      cy.get(starRatingSelector).as('starRating');
  
      // verify that exactly 5 stars are rendered
      cy.get('@starRating').find('span').should('have.length', 5);
    });
    
  });
  