/* =========================================
   main.js (ENHANCED MENU TOGGLE)
   - Swiper only initializes if .hero-swiper exists
   - Enhanced mobile menu with focus management
   - Year/date guarded (won't crash if ids missing)
   - Sticky header + smooth scroll included
   - Better accessibility and keyboard navigation
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Swiper (guarded) ---------- */
  const heroSwiperEl = document.querySelector(".hero-swiper");
  if (heroSwiperEl && typeof Swiper !== "undefined") {
    new Swiper(".hero-swiper", {
      loop: true,
      autoplay: { delay: 6000, disableOnInteraction: false },
      speed: 1000,
      effect: "fade",
      fadeEffect: { crossFade: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  }

  /* ---------- Enhanced Mobile Menu Toggle ---------- */
  class MobileMenu {
    constructor() {
      this.navToggle = document.getElementById("navToggle");
      this.navMenu = document.getElementById("navMenu");
      this.isOpen = false;
      this.focusableElements = [];
      this.firstFocusableElement = null;
      this.lastFocusableElement = null;
      this.previouslyFocusedElement = null;
      
      this.init();
    }
    
    init() {
      if (!this.navToggle || !this.navMenu) {
        console.warn("navToggle or navMenu not found. Check your HTML IDs.");
        return;
      }
      
      // Accessibility setup
      this.navToggle.setAttribute("role", "button");
      this.navToggle.setAttribute("tabindex", "0");
      this.navToggle.setAttribute("aria-expanded", "false");
      this.navToggle.setAttribute("aria-label", "Menu toggle");
      this.navToggle.setAttribute("aria-controls", "navMenu");
      
      // Event listeners
      this.navToggle.addEventListener("click", () => this.toggle());
      this.navToggle.addEventListener("keydown", (e) => this.handleToggleKeydown(e));
      
      // Close on link click
      this.navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => this.close());
      });
      
      // Close on outside click
      document.addEventListener("click", (e) => this.handleOutsideClick(e));
      
      // Close on ESC
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen) this.close();
      });
      
      // Close on resize (desktop)
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && this.isOpen) this.close();
      });
      
      // Initialize focusable elements
      this.updateFocusableElements();
    }
    
    toggle() {
      this.isOpen ? this.close() : this.open();
    }
    
    open() {
      this.isOpen = true;
      this.navToggle.classList.add("active");
      this.navMenu.classList.add("active");
      this.navToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      
      // Store the element that had focus before opening
      this.previouslyFocusedElement = document.activeElement;
      
      // Update focusable elements
      this.updateFocusableElements();
      
      // Focus management
      this.trapFocus();
      
      // Announce to screen readers
      this.announceToScreenReaders("Menu opened");
    }
    
    close() {
      if (!this.isOpen) return;
      
      this.isOpen = false;
      this.navToggle.classList.remove("active");
      this.navMenu.classList.remove("active");
      this.navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      
      // Return focus to the previously focused element
      if (this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
      }
      
      // Announce to screen readers
      this.announceToScreenReaders("Menu closed");
    }
    
    handleToggleKeydown(e) {
      // Enter or Space triggers toggle
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggle();
      }
      
      // Tab key management when menu is open
      if (this.isOpen && e.key === "Tab") {
        e.preventDefault();
        this.handleFocusTrap(e);
      }
    }
    
    handleOutsideClick(e) {
      if (!this.isOpen) return;
      
      const isClickInsideMenu = this.navMenu.contains(e.target);
      const isClickOnToggle = this.navToggle.contains(e.target);
      
      if (!isClickInsideMenu && !isClickOnToggle) {
        this.close();
      }
    }
    
    updateFocusableElements() {
      // Get all focusable elements inside the menu
      this.focusableElements = Array.from(
        this.navMenu.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
      
      // Add the toggle button as focusable element
      this.focusableElements.unshift(this.navToggle);
      
      if (this.focusableElements.length > 0) {
        this.firstFocusableElement = this.focusableElements[0];
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
      }
    }
    
    trapFocus() {
      // Focus the first element in the menu
      setTimeout(() => {
        if (this.firstFocusableElement) {
          this.firstFocusableElement.focus();
        }
      }, 100);
    }
    
    handleFocusTrap(e) {
      if (this.focusableElements.length === 0) return;
      
      const currentFocusIndex = this.focusableElements.indexOf(document.activeElement);
      
      if (e.shiftKey) {
        // Shift + Tab: move backward
        if (currentFocusIndex === 0) {
          this.lastFocusableElement.focus();
        } else {
          this.focusableElements[currentFocusIndex - 1].focus();
        }
      } else {
        // Tab: move forward
        if (currentFocusIndex === this.focusableElements.length - 1) {
          this.firstFocusableElement.focus();
        } else {
          this.focusableElements[currentFocusIndex + 1].focus();
        }
      }
    }
    
    announceToScreenReaders(message) {
      // Create or update aria-live region for screen readers
      let liveRegion = document.getElementById("sr-announcement");
      if (!liveRegion) {
        liveRegion = document.createElement("div");
        liveRegion.id = "sr-announcement";
        liveRegion.setAttribute("aria-live", "polite");
        liveRegion.setAttribute("aria-atomic", "true");
        liveRegion.style.position = "absolute";
        liveRegion.style.width = "1px";
        liveRegion.style.height = "1px";
        liveRegion.style.padding = "0";
        liveRegion.style.margin = "-1px";
        liveRegion.style.overflow = "hidden";
        liveRegion.style.clip = "rect(0, 0, 0, 0)";
        liveRegion.style.whiteSpace = "nowrap";
        liveRegion.style.border = "0";
        document.body.appendChild(liveRegion);
      }
      
      liveRegion.textContent = message;
    }
  }
  
  // Initialize mobile menu
  const mobileMenu = new MobileMenu();

  /* ---------- Year + Date (guarded) ---------- */
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

  /* ---------- Sticky Header ---------- */
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("sticky", window.scrollY > 100);
    });
  }

  /* ---------- Enhanced Smooth Scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      
      // Close mobile menu if open
      if (mobileMenu.isOpen) {
        mobileMenu.close();
      }
      
      const offset = 100;
      const headerHeight = header ? header.offsetHeight : 0;
      const additionalOffset = mobileMenu.isOpen ? 0 : headerHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - offset - additionalOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update URL without page jump
      history.pushState(null, null, targetId);
      
      // Focus the target for accessibility
      target.setAttribute("tabindex", "-1");
      target.focus();
      target.removeAttribute("tabindex");
    });
  });
});