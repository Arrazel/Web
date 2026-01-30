// Scroll-triggered animation that triggers when card is centered on screen
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  const animatedCards = new Set();
  
  function checkCardsInCenter() {
    cards.forEach((card, index) => {
      // Skip if already animated
      if (animatedCards.has(card)) return;
      
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      
      // Check if card center is within 150px of viewport center
      const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
      
      if (distanceFromCenter < 150) {
        // Card is centered - trigger animation
        card.style.animation = `slideInCard 0.8s ease-out ${index * 0.1}s forwards`;
        animatedCards.add(card);
        
        // Add hover effect after animation completes
        setTimeout(() => {
          card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 32px rgba(16,24,40,.15)';
            this.style.transition = 'all 0.3s ease';
          });
          
          card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 6px 18px rgba(16,24,40,.06)';
          });
        }, 100 * index);
      }
    });
  }
  
  // Check on scroll
  window.addEventListener('scroll', checkCardsInCenter, { passive: true });
  
  // Check on load
  checkCardsInCenter();
});

