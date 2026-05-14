document.addEventListener('DOMContentLoaded', () => {
  // Dashboard Specific Scripts
  
  // Sidebar Toggle for Mobile
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const mainContent = document.querySelector('.dashboard-main');

  if(sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

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
