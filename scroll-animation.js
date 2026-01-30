// Scroll-triggered animation that shows cards only when centered on screen
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  const cardStates = new Map();
  
  // Initialize card states
  cards.forEach(card => {
    cardStates.set(card, { isVisible: false });
  });
  
  function checkCardsInCenter() {
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      
      // Check if card center is within 150px of viewport center
      const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
      const isCentered = distanceFromCenter < 150;
      const wasVisible = cardStates.get(card).isVisible;
      
      if (isCentered && !wasVisible) {
        // Card entering center - animate in
        card.style.opacity = '0';
        card.style.transform = 'translateX(-100px)';
        card.style.animation = `slideInCard 0.8s ease-out forwards`;
        cardStates.get(card).isVisible = true;
        
        // Add hover effect
        addHoverEffect(card);
      } else if (!isCentered && wasVisible) {
        // Card leaving center - fade out and slide left
        card.style.animation = 'slideOutCard 0.6s ease-in forwards';
        cardStates.get(card).isVisible = false;
      }
    });
  }
  
  function addHoverEffect(card) {
    // Remove old listeners to avoid duplicates
    card.removeEventListener('mouseenter', hoverIn);
    card.removeEventListener('mouseleave', hoverOut);
    
    card.addEventListener('mouseenter', hoverIn);
    card.addEventListener('mouseleave', hoverOut);
  }
  
  function hoverIn() {
    this.style.transform = 'translateY(-8px)';
    this.style.boxShadow = '0 12px 32px rgba(16,24,40,.15)';
    this.style.transition = 'all 0.3s ease';
  }
  
  function hoverOut() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 6px 18px rgba(16,24,40,.06)';
    this.style.transition = 'all 0.3s ease';
  }
  
  // Check on scroll
  window.addEventListener('scroll', checkCardsInCenter, { passive: true });
  
  // Check on load
  checkCardsInCenter();
});


