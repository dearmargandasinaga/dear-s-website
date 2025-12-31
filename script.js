// Main JavaScript file for the website

// Get current language from localStorage or default to Indonesian
let currentLanguage = localStorage.getItem('language') || 'id';
document.documentElement.lang = currentLanguage;

// Get current theme from localStorage or default to system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
let currentTheme = localStorage.getItem('theme') || 'system';

// Apply theme based on preference
function applyTheme(theme) {
  if (theme === 'dark' || (theme === 'system' && prefersDarkScheme.matches)) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

// Apply theme on page load
applyTheme(currentTheme);

// Toggle theme function
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon();
}

// Update theme icon
function updateThemeIcon() {
  const isDark = document.body.classList.contains('dark');
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const lightIcon = themeToggle.querySelector('.theme-toggle-icon.light');
    const darkIcon = themeToggle.querySelector('.theme-toggle-icon.dark');
    
    if (lightIcon && darkIcon) {
      lightIcon.style.opacity = isDark ? '0' : '1';
      lightIcon.style.transform = isDark ? 'rotate(-90deg) scale(0)' : 'rotate(0) scale(1)';
      darkIcon.style.opacity = isDark ? '1' : '0';
      darkIcon.style.transform = isDark ? 'rotate(0) scale(1)' : 'rotate(90deg) scale(0)';
    }
  }
}

// Apply translations to the page
function applyTranslations() {
  // Update text content for elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });

  // Update placeholders for elements with data-translate-placeholder attribute
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.placeholder = translations[currentLanguage][key];
    }
  });
}

// Apply translations on page load
applyTranslations();

// Page transition functionality
function handlePageTransition(url) {
  const pageTransition = document.getElementById('page-transition');
  if (pageTransition) {
    // Tampilkan animasi loading
    pageTransition.style.opacity = '1';
    pageTransition.style.visibility = 'visible';
    
    // Pindah ke halaman baru setelah animasi selesai
    setTimeout(() => {
      window.location.href = url;
    }, 300); // Waktu tunggu sebelum pindah halaman
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const pageTransition = document.getElementById('page-transition');
  
  if (pageTransition) {
    // Sembunyikan loading screen setelah halaman dimuat
    window.addEventListener('load', () => {
      pageTransition.style.opacity = '0';
      pageTransition.style.visibility = 'hidden';
    });
  }

  // Handle internal links
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        handlePageTransition(link.href);
      });
    }
  });

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Shortcuts menu
  const shortcutsToggle = document.querySelector('.shortcuts-toggle');
  const shortcutsList = document.querySelector('.shortcuts-list');

  if (shortcutsToggle && shortcutsList) {
    shortcutsToggle.addEventListener('click', () => {
      shortcutsList.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.shortcuts-menu')) {
        shortcutsList.classList.remove('active');
      }
    });
  }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
  if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
    document.body.classList.toggle('dark', e.matches);
    updateThemeIcon();
  }
});