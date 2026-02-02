document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle (supports both ID sets)
  const navToggle =
    document.getElementById("navToggle") || document.getElementById("mobileMenuBtn");
  const navMenu =
    document.getElementById("navMenu") || document.getElementById("mainNav");

  if (navToggle && navMenu) {
    let isMenuOpen = false;

    const toggleMenu = (open) => {
      if (open === undefined) {
        open = !isMenuOpen;
      }
      
      isMenuOpen = open;
      navToggle.classList.toggle("active", open);
      navMenu.classList.toggle("active", open);
      
      // Change icon if it's a button with an <i>
      const icon = navToggle.querySelector("i");
      if (icon) {
        icon.className = open ? "fas fa-times" : "fas fa-bars";
      }

      // Prevent body scroll when menu is open
      document.body.style.overflow = open ? "hidden" : "";
      document.documentElement.style.overflow = open ? "hidden" : "";
      
      // Add/remove event listener for escape key
      if (open) {
        document.addEventListener("keydown", handleEscapeKey);
      } else {
        document.removeEventListener("keydown", handleEscapeKey);
      }
    };

    const closeMenu = () => toggleMenu(false);
    const openMenu = () => toggleMenu(true);

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    // Toggle menu on button click
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      toggleMenu();
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      const isClickInsideMenu = navMenu.contains(event.target);
      const isClickOnToggle = navToggle.contains(event.target);

      if (!isClickInsideMenu && !isClickOnToggle && isMenuOpen) {
        closeMenu();
      }
    });

    // Handle window resize - close menu on mobile when switching to desktop
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && isMenuOpen) {
          closeMenu();
        }
      }, 250);
    });
  }

  // Technology Swiper - Enhanced with better mobile settings
  const techEl = document.querySelector(".tech-slider");
  if (techEl) {
    // Wait for Swiper to be available
    const initSwiper = () => {
      if (typeof Swiper === "undefined") {
        console.warn("Swiper not loaded. Check Swiper CDN script order.");
        return;
      }

      try {
        const techSwiper = new Swiper(".tech-slider", {
          loop: true,
          slidesPerView: 1,
          spaceBetween: 15, // Reduced for mobile
          autoplay: { 
            delay: 5000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          },
          speed: 600,
          grabCursor: true,
          navigation: {
            nextEl: ".tech-slider .swiper-button-next",
            prevEl: ".tech-slider .swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
          },
          breakpoints: {
            480: { 
              slidesPerView: 1.2,
              spaceBetween: 20 
            },
            640: { 
              slidesPerView: 1.5,
              spaceBetween: 20 
            },
            768: { 
              slidesPerView: 2,
              spaceBetween: 25 
            },
            1024: { 
              slidesPerView: 3,
              spaceBetween: 30 
            },
            1200: { 
              slidesPerView: 3,
              spaceBetween: 35 
            }
          },
          // Mobile-specific optimizations
          touchRatio: 1,
          touchAngle: 45,
          simulateTouch: true,
          shortSwipes: true,
          longSwipes: false,
          touchMoveStopPropagation: true,
          iOSEdgeSwipeDetection: true,
          iOSEdgeSwipeThreshold: 20,
        });

        // Pause autoplay when user interacts
        techSwiper.el.addEventListener("mouseenter", () => {
          techSwiper.autoplay.stop();
        });

        techSwiper.el.addEventListener("mouseleave", () => {
          techSwiper.autoplay.start();
        });

        // Reset on window resize
        let resizeTimer;
        window.addEventListener("resize", () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            techSwiper.update();
          }, 250);
        });

      } catch (error) {
        console.error("Swiper initialization error:", error);
      }
    };

    // Initialize Swiper when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initSwiper);
    } else {
      initSwiper();
    }
  }

  // Sticky Header with throttling for performance
  const header = document.querySelector(".header");
  if (header) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          header.classList.toggle("sticky", window.scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Set current year and date
  const yearEl = document.getElementById("currentYear");
  const dateEl = document.getElementById("currentDate");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Consultation Form with improved validation
  const consultationForm = document.getElementById("premiumConsultationForm");
  if (consultationForm) {
    consultationForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      
      // Basic form validation
      const requiredFields = this.querySelectorAll("[required]");
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = "#ff3860";
          isValid = false;
        } else {
          field.style.borderColor = "";
        }
      });
      
      if (!isValid) {
        alert("Please fill in all required fields.");
        return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalText = submitBtn.innerHTML;
      const originalState = submitBtn.disabled;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
      submitBtn.disabled = true;

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        alert("Thank you! Our premium consultation team will contact you within 1 hour.");
        consultationForm.reset();
        
      } catch (error) {
        console.error("Form submission error:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = originalState;
      }
    });
  }

  // Smooth scrolling (mobile-friendly)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();
      
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains("active")) {
        closeMenu();
      }
      
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });

  // Counter Animation for Stats with Intersection Observer
  function animateStats() {
    const stats = document.querySelectorAll(".stat-number");
    if (!stats.length) return;

    stats.forEach((stat) => {
      const raw = stat.textContent;
      const target = parseInt(raw.replace(/[^0-9]/g, ''), 10);
      if (Number.isNaN(target)) return;

      const suffix = raw.match(/%|\+/g)?.[0] || "";
      let current = 0;
      const increment = Math.max(1, target / 60); // Slower animation for mobile
      const duration = 2000; // 2 seconds total
      const steps = duration / 60; // 60fps

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + suffix;
        }
      }, steps);
    });
  }

  // Use Intersection Observer for stats animation
  const heroSection = document.querySelector(".luxury-hero");
  if (heroSection) {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px"
    };

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          heroObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    heroObserver.observe(heroSection);
  }

  // Parallax effect - optimized for mobile
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const hero = document.querySelector(".luxury-hero");
        if (!hero) return;
        
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.15;
        
        // Only apply parallax on desktop
        if (window.innerWidth > 768) {
          hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
      });
      ticking = true;
    }
  });

  // Add touch event support for mobile
  document.addEventListener("touchstart", function() {}, {passive: true});
});