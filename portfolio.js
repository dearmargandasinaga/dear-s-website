// Portfolio page functionality

document.addEventListener('DOMContentLoaded', () => {
  // Certificate image modal/lightbox functionality
  const viewButtons = document.querySelectorAll('.view-btn');

  viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const certificateCard = button.closest('.certificate-card');
      const certificateImage = certificateCard.querySelector('.certificate-image img');
      const imageSrc = certificateImage.src;
      const imageAlt = certificateImage.alt;

      // Create modal
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <img src="${imageSrc}" alt="${imageAlt}" class="modal-image">
        </div>
      `;

      document.body.appendChild(modal);

      // Modal styles
      modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
      `;

      const modalContent = modal.querySelector('.modal-content');
      modalContent.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
      `;

      const modalImage = modal.querySelector('.modal-image');
      modalImage.style.cssText = `
        width: 100%;
        height: auto;
        border-radius: 0.5rem;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      `;

      const closeBtn = modal.querySelector('.modal-close');
      closeBtn.style.cssText = `
        position: absolute;
        top: -2.5rem;
        right: 0;
        background: white;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: white;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
      `;

      closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        closeBtn.style.transform = 'scale(1.1)';
      });

      closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'white';
        closeBtn.style.transform = 'scale(1)';
      });

      // Close modal function
      const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
      };

      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      // Keyboard close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });
    });
  });
});

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
