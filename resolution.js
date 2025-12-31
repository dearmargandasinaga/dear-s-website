// Resolution for You - Projects functionality

const projects = [
  {
    id: 1,
    title: "Website Portofolio Personal",
    category: "web",
    description: "Membuat website portofolio pribadi menggunakan HTML, CSS, dan JavaScript dengan desain responsif dan modern.",
    longDescription: "Proyek ini merupakan website portofolio pribadi yang menampilkan profil, portfolio, dan pencapaian saya. Dibangun dengan teknologi modern untuk memberikan pengalaman pengguna yang optimal di semua perangkat.",
    image: "project-1.jpg",
    status: "Selesai",
    tools: ["HTML", "CSS", "JavaScript"],
    year: 2024
  },
  {
    id: 2,
    title: "Edit Video Acara Sekolah",
    category: "multimedia",
    description: "Mengedit video dokumentasi acara sekolah dengan efek visual dan transisi yang menarik menggunakan software profesional.",
    longDescription: "Produksi video berkualitas untuk acara-acara sekolah dengan editing profesional, color grading, dan sound design yang tepat.",
    image: "project-2.jpg",
    status: "Selesai",
    tools: ["Adobe Premiere Pro", "After Effects"],
    year: 2024
  },
  {
    id: 3,
    title: "Desain Grafis Poster",
    category: "design",
    description: "Merancang poster untuk berbagai acara dengan elemen visual yang menarik dan typography yang profesional.",
    longDescription: "Desain poster berkualitas tinggi untuk promosi acara sekolah dengan komposisi yang menarik dan pesan yang jelas.",
    image: "project-3.jpg",
    status: "Selesai",
    tools: ["Adobe Photoshop", "Canva"],
    year: 2024
  },
  {
    id: 4,
    title: "Pembuatan Konten Media Sosial",
    category: "multimedia",
    description: "Membuat dan mengedit konten media sosial dengan berbagai format seperti video pendek, carousel, dan poster digital.",
    longDescription: "Produksi konten visual untuk media sosial yang engaging dan sesuai dengan tren terkini untuk meningkatkan engagement.",
    image: "project-4.jpg",
    status: "Sedang Berlangsung",
    tools: ["Adobe Premiere Pro", "Photoshop", "Canva"],
    year: 2024
  },
  {
    id: 5,
    title: "Dokumentasi Acara Video",
    category: "multimedia",
    description: "Merekam dan mendokumentasikan acara-acara penting dengan kualitas video profesional dan audio yang jernih.",
    longDescription: "Layanan dokumentasi video profesional untuk berbagai acara dengan peralatan berkualitas dan editing berkualitas tinggi.",
    image: "project-5.jpg",
    status: "Selesai",
    tools: ["Kamera DSLR", "Microphone", "Adobe Premiere Pro"],
    year: 2023
  },
  {
    id: 6,
    title: "Website E-Learning Sederhana",
    category: "web",
    description: "Mengembangkan website e-learning sederhana dengan fitur quiz dan materi pembelajaran interaktif.",
    longDescription: "Platform e-learning yang user-friendly dengan fitur pembelajaran interaktif, kuis, dan tracking progress pengguna.",
    image: "project-6.jpg",
    status: "Sedang Berlangsung",
    tools: ["HTML", "CSS", "JavaScript", "PHP"],
    year: 2024
  },
  {
    id: 7,
    title: "Desain UI Mobile App",
    category: "design",
    description: "Merancang user interface untuk aplikasi mobile dengan prinsip UX yang baik dan design system yang konsisten.",
    longDescription: "Desain UI/UX yang modern dan intuitif untuk aplikasi mobile dengan prototyping dan user testing.",
    image: "project-7.jpg",
    status: "Sedang Berlangsung",
    tools: ["Figma", "Adobe XD"],
    year: 2024
  },
  {
    id: 8,
    title: "Editing Podcast Episode",
    category: "multimedia",
    description: "Mengedit audio podcast dengan mixing, mastering, dan penambahan musik latar untuk kualitas profesional.",
    longDescription: "Produksi podcast berkualitas tinggi dengan audio editing profesional dan sound design yang menarik.",
    image: "project-8.jpg",
    status: "Selesai",
    tools: ["Audacity", "Adobe Audition"],
    year: 2023
  },
  {
    id: 9,
    title: "Branding dan Logo Design",
    category: "design",
    description: "Merancang identitas visual brand termasuk logo, color palette, dan brand guidelines yang konsisten.",
    longDescription: "Pengembangan identitas brand lengkap dengan logo design dan panduan pengguna untuk konsistensi visual.",
    image: "project-9.jpg",
    status: "Selesai",
    tools: ["Adobe Illustrator", "Photoshop"],
    year: 2023
  },
  {
    id: 10,
    title: "Photography dan Retouching",
    category: "multimedia",
    description: "Fotografi dan retouching profesional untuk berbagai keperluan dengan editing color grading yang sempurna.",
    longDescription: "Layanan fotografi profesional dengan post-processing dan retouching untuk hasil yang memukau.",
    image: "project-10.jpg",
    status: "Selesai",
    tools: ["DSLR Camera", "Adobe Lightroom", "Photoshop"],
    year: 2023
  }
];

// Render projects
function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-container');
  const emptyState = document.getElementById('empty-state');

  let filteredProjects = projects;
  if (filter !== 'all') {
    filteredProjects = projects.filter(p => p.category === filter);
  }

  if (filteredProjects.length === 0) {
    container.style.display = 'none';
    emptyState.style.display = 'flex';
    return;
  }

  container.style.display = 'grid';
  emptyState.style.display = 'none';

  container.innerHTML = filteredProjects.map(project => `
    <div class="project-card" data-category="${project.category}">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
        <div class="project-overlay">
          <button class="view-project-btn" onclick="openProjectModal(${project.id})">👁️ Lihat Detail</button>
        </div>
      </div>
      <div class="project-content">
        <div class="project-header">
          <h3 class="project-title">${project.title}</h3>
          <span class="project-status ${project.status === 'Selesai' ? 'completed' : 'ongoing'}">${project.status}</span>
        </div>
        <p class="project-category">${getCategoryLabel(project.category)}</p>
        <p class="project-description">${project.description}</p>
        <div class="project-tools">
          ${project.tools.map(tool => `<span class="tool-badge">${tool}</span>`).join('')}
        </div>
        <div class="project-footer">
          <span class="project-year">📅 ${project.year}</span>
          <button class="project-detail-btn" onclick="openProjectModal(${project.id})">Selengkapnya →</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Get category label
function getCategoryLabel(category) {
  const labels = {
    'multimedia': '🎬 Multimedia',
    'web': '🌐 Web Development',
    'design': '🎨 Design',
    'other': '📌 Lainnya'
  };
  return labels[category] || category;
}

// Open project modal
function openProjectModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-dialog">
      <button class="modal-close">&times;</button>
      <div class="modal-image">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="modal-content">
        <h2 class="modal-title">${project.title}</h2>
        <div class="modal-meta">
          <span class="badge status ${project.status === 'Selesai' ? 'completed' : 'ongoing'}">${project.status}</span>
          <span class="badge category">${getCategoryLabel(project.category)}</span>
          <span class="badge year">📅 ${project.year}</span>
        </div>
        <p class="modal-description">${project.longDescription}</p>
        <div class="modal-tools">
          <h3>Teknologi yang Digunakan:</h3>
          <div class="tools-list">
            ${project.tools.map(tool => `<span class="tool">${tool}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');

  const closeModal = () => {
    modal.classList.add('closing');
    setTimeout(() => modal.remove(), 300);
  };

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// Filter functionality
document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });
});
