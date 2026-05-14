document.addEventListener('DOMContentLoaded', () => {
  // Custom Cursor
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const hoverElements = document.querySelectorAll('a, button, .card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Theme Toggle (Dark/Light)
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme == "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.documentElement.setAttribute("data-theme", "dark");
    if(themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    if(themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  if(themeToggle) {
    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  }

  // RTL Toggle
  const rtlToggle = document.getElementById('rtlToggle');
  const currentDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', currentDir);
  
  if(rtlToggle) {
    // Initialize icon based on current direction
    rtlToggle.innerHTML = currentDir === 'rtl' ? '<i class="fas fa-arrow-left-long"></i>' : '<i class="fas fa-arrow-right-long"></i>';

    rtlToggle.addEventListener('click', () => {
      let dir = document.documentElement.getAttribute('dir');
      if(dir === 'ltr') {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
        rtlToggle.innerHTML = '<i class="fas fa-arrow-left-long"></i>';
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
        rtlToggle.innerHTML = '<i class="fas fa-arrow-right-long"></i>';
      }
    });
  }

  // Navbar Scroll & Progress
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if(navbar) navbar.classList.add('scrolled');
      if(backToTop) backToTop.classList.add('active');
    } else {
      if(navbar) navbar.classList.remove('scrolled');
      if(backToTop) backToTop.classList.remove('active');
    }

    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if(scrollProgress) scrollProgress.style.width = scrolled + "%";
  });

  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if(hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // trigger on load

  // 3D Tilt Effect for Cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // Accordion Logic
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(acc => {
    acc.addEventListener('click', function() {
      this.parentElement.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Animated Counters
  const counters = document.querySelectorAll('.counter-num');
  const runCounter = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 200;
      const updateCount = () => {
        const count = +counter.innerText.replace('+', '');
        const inc = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + inc) + '+';
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target + '+';
        }
      };
      
      const rect = counter.getBoundingClientRect();
      if(rect.top < window.innerHeight && counter.innerText == "0") {
        updateCount();
      }
    });
  };
  window.addEventListener('scroll', runCounter);
  runCounter();
});
