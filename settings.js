// Settings page functionality

document.addEventListener('DOMContentLoaded', () => {
  // Language settings
  const languageOptions = document.querySelectorAll('input[name="language"]');
  const savedLanguage = localStorage.getItem('language') || 'id';
  
  // Set the saved language radio button
  document.getElementById(`lang-${savedLanguage}`).checked = true;
  
  languageOptions.forEach(option => {
    option.addEventListener('change', (e) => {
      currentLanguage = e.target.value;
      localStorage.setItem('language', currentLanguage);
      document.documentElement.lang = currentLanguage;
      applyTranslations();
    });
  });

  // Theme settings
  const themeOptions = document.querySelectorAll('input[name="theme"]');
  const savedTheme = localStorage.getItem('theme') || 'system';
  
  // Set the saved theme radio button
  document.getElementById(`theme-${savedTheme}`).checked = true;
  
  themeOptions.forEach(option => {
    option.addEventListener('change', (e) => {
      currentTheme = e.target.value;
      localStorage.setItem('theme', currentTheme);
      applyTheme(currentTheme);
      updateThemeIcon();
    });
  });
});
