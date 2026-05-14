document.addEventListener('DOMContentLoaded', () => {
  // Dashboard Specific Scripts
  
  // Sidebar Toggle for Mobile
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const mainContent = document.querySelector('.dashboard-main');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  if(sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  // Navigation Logic
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-section');
      
      // Update Active Link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Update Active Section
      sections.forEach(section => {
        section.style.display = 'none';
        if(section.id === targetId) {
          section.style.display = 'block';
        }
      });

      // Update Topbar Title (Optional but professional)
      const pageTitle = document.querySelector('.dashboard-topbar h2');
      if(pageTitle) {
        pageTitle.innerText = link.innerText.trim() + " Overview";
      }

      // Close sidebar on mobile
      if(window.innerWidth <= 1024) {
        sidebar.classList.remove('active');
      }
    });
  });

  // Simulate Real-time Metrics Update
  const metricValues = document.querySelectorAll('.metric-value');
  
  setInterval(() => {
    metricValues.forEach(val => {
      if(val.classList.contains('simulate-cpu')) {
        const current = parseFloat(val.innerText);
        const newCpu = Math.max(10, Math.min(95, current + (Math.random() * 10 - 5))).toFixed(1);
        val.innerText = newCpu + '%';
        
        if(newCpu > 80) val.style.color = '#ef4444'; // Red
        else if (newCpu > 60) val.style.color = '#f59e0b'; // Yellow
        else val.style.color = '#10b981'; // Green
      }
    });
  }, 3000);
});
