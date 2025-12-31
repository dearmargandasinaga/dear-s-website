// Resolution Center functionality

let resolutions = [];

// Load resolutions from localStorage on page load
function loadResolutions() {
  const saved = localStorage.getItem('resolutions');
  resolutions = saved ? JSON.parse(saved) : [];
  renderResolutions();
}

// Save resolutions to localStorage
function saveResolutions() {
  localStorage.setItem('resolutions', JSON.stringify(resolutions));
}

// Add new resolution
function addResolution(text) {
  if (text.trim()) {
    resolutions.push({
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toLocaleDateString(currentLanguage)
    });
    saveResolutions();
    renderResolutions();
  }
}

// Toggle resolution completion
function toggleResolution(id) {
  const resolution = resolutions.find(r => r.id === id);
  if (resolution) {
    resolution.completed = !resolution.completed;
    saveResolutions();
    renderResolutions();
  }
}

// Delete resolution
function deleteResolution(id) {
  resolutions = resolutions.filter(r => r.id !== id);
  saveResolutions();
  renderResolutions();
}

// Render resolutions to DOM
function renderResolutions() {
  const container = document.getElementById('resolutions-container');
  if (!container) return;

  container.innerHTML = '';

  if (resolutions.length === 0) {
    container.innerHTML = `<div class="card"><div class="card-content"><p>${translations[currentLanguage].noResolutions}</p></div></div>`;
    return;
  }

  resolutions.forEach(resolution => {
    const cardClass = resolution.completed ? 'card completed' : 'card';
    const cardHTML = `
      <div class="${cardClass}">
        <div class="card-content">
          <div class="resolution-card">
            <div class="resolution-text ${resolution.completed ? 'completed' : ''}">
              <p>${resolution.text}</p>
              <span class="resolution-status">${resolution.createdAt}</span>
            </div>
            <div class="resolution-actions">
              <button class="resolution-toggle" onclick="toggleResolution(${resolution.id})" title="Toggle completion">
                ${resolution.completed ? '✓' : '○'}
              </button>
              <button class="button secondary" onclick="deleteResolution(${resolution.id})" style="padding: 0.5rem 0.75rem; font-size: 0.75rem;">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

// Initialize resolutions page
document.addEventListener('DOMContentLoaded', () => {
  loadResolutions();

  const addBtn = document.getElementById('add-resolution-btn');
  const textarea = document.getElementById('new-resolution');

  if (addBtn && textarea) {
    addBtn.addEventListener('click', () => {
      addResolution(textarea.value);
      textarea.value = '';
      textarea.focus();
    });

    textarea.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        addResolution(textarea.value);
        textarea.value = '';
      }
    });
  }
});
