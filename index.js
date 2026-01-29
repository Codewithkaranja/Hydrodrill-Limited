document.addEventListener("DOMContentLoaded", function () {

  // ======================================
  // Initialize Swiper
  // ======================================
  const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    speed: 1000,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // ======================================
  // Counter Animation for Trust Indicators
  // Premium slow count (≈ 2.8s)
  // ======================================
  const counters = document.querySelectorAll(".indicator-number");
  const DURATION = 2800; // premium feel (2.5–3s)

  const runCounter = (counter) => {
    const target = +counter.getAttribute("data-count");
    const suffix = counter.getAttribute("data-suffix") || "";
    let startTime = null;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / DURATION, 1);

      // Ease-out cubic for luxury feel
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(easedProgress * target);
      counter.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target + suffix;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target); // run once
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach(counter => observer.observe(counter));

  // ======================================
  // Set current year and date
  // ======================================
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
// =========================================================
// WHY CHOOSE US – SWIPER INIT
// (Add this alongside your other Swiper init)
// =========================================================
const whySwiper = new Swiper(".why-swiper", {
  loop: true,
  spaceBetween: 18,
  speed: 900,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".why-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".why-next",
    prevEl: ".why-prev",
  },
  breakpoints: {
    0: { slidesPerView: 1.1 },
    520: { slidesPerView: 1.4 },
    768: { slidesPerView: 2.2 },
    1024: { slidesPerView: 3 },
  },
});

  // ======================================
  // Mobile Menu Toggle
  // ======================================
  
    const navMenu = document.getElementById('navMenu');
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navMenu').classList.remove('active');
      document.getElementById('navToggle').classList.remove('active');
    });
  });


