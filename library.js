// JavaScript for the Library page

document.addEventListener('DOMContentLoaded', () => {
  // Get current language from localStorage or default to Indonesian
  const currentLanguage = localStorage.getItem('language') || 'id';

  // Category filtering
  const categoryLinks = document.querySelectorAll('.category-item a');
  const articleCards = document.querySelectorAll('.article-card');

  if (categoryLinks.length > 0) {
    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        categoryLinks.forEach(l => l.parentElement.classList.remove('active'));
        link.parentElement.classList.add('active');
        const category = link.getAttribute('data-category');
        articleCards.forEach(card => {
          card.style.display = (category === 'all' || card.getAttribute('data-category') === category) ? '' : 'none';
        });
      });
    });
  }

  // Share button functionality
  const shareButtons = document.querySelectorAll('.share-button');
  
  if (shareButtons.length > 0) {
    shareButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (navigator.share) {
          navigator.share({
            title: document.title,
            url: window.location.href
          })
          .catch(error => console.log('Error sharing:', error));
        } else {
          // Fallback for browsers that don't support Web Share API
          const dummy = document.createElement('input');
          document.body.appendChild(dummy);
          dummy.value = window.location.href;
          dummy.select();
          document.execCommand('copy');
          document.body.removeChild(dummy);
          
          alert(currentLanguage === 'id' ? 'URL disalin ke clipboard!' : 'URL copied to clipboard!');
        }
      });
    });
  }
});