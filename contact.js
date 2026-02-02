document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // ENHANCED MOBILE MENU TOGGLE (Robust & Cross-browser)
    // =========================================================
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    
    if (navToggle && navMenu) {
        let isMenuOpen = false;
        
        const openMenu = () => {
            navToggle.classList.add("active");
            navMenu.classList.add("active");
            document.body.classList.add("menu-open");
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            isMenuOpen = true;
            
            // Update aria attributes for accessibility
            navToggle.setAttribute("aria-expanded", "true");
            navMenu.setAttribute("aria-hidden", "false");
        };
        
        const closeMenu = () => {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            isMenuOpen = false;
            
            // Update aria attributes for accessibility
            navToggle.setAttribute("aria-expanded", "false");
            navMenu.setAttribute("aria-hidden", "true");
        };
        
        const toggleMenu = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        };
        
        // Toggle menu on button click
        navToggle.addEventListener("click", toggleMenu);
        
        // Close menu when clicking links (better delegation)
        navMenu.addEventListener("click", (e) => {
            if (e.target.tagName === "A" || e.target.closest("a")) {
                closeMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (isMenuOpen && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu on ESC key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Close menu on window resize (if going to desktop)
        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 992 && isMenuOpen) {
                    closeMenu();
                }
            }, 250);
        });
        
        // Initialize ARIA attributes
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-controls", "navMenu");
        navToggle.setAttribute("aria-label", "Toggle navigation menu");
        navMenu.setAttribute("aria-hidden", "true");
    }
    
    // =========================================================
    // STICKY HEADER with Performance Optimization
    // =========================================================
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        let ticking = false;
        
        const updateHeader = () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            
            lastScroll = currentScroll;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateHeader();
                });
                ticking = true;
            }
        });
        
        // Initialize on load
        updateHeader();
    }
    
    // =========================================================
    // SET CURRENT YEAR AND DATE
    // =========================================================
    const yearEl = document.getElementById('currentYear');
    const dateEl = document.getElementById('currentDate');
    
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    
    if (dateEl) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateEl.textContent = new Date().toLocaleDateString('en-US', options);
    }
    
    // =========================================================
    // ENHANCED FORM VALIDATION with Visual Feedback
    // =========================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const serviceSelect = document.getElementById('service');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Error display element
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-errors';
        errorContainer.style.cssText = `
            background: #fee;
            border: 1px solid #ff3860;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            display: none;
            color: #ff3860;
        `;
        contactForm.insertBefore(errorContainer, contactForm.firstChild);
        
        // Validation functions
        const showError = (message) => {
            errorContainer.innerHTML = `<strong>Please fix the following:</strong><br>${message}`;
            errorContainer.style.display = 'block';
            errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
        
        const clearError = () => {
            errorContainer.style.display = 'none';
            errorContainer.innerHTML = '';
        };
        
        const validateField = (field, validationFn, errorMessage) => {
            const isValid = validationFn(field.value.trim());
            
            if (!isValid && field.value.trim()) {
                field.classList.add('error');
                return false;
            } else if (!field.value.trim()) {
                field.classList.add('error');
                return false;
            } else {
                field.classList.remove('error');
                return true;
            }
        };
        
        const validations = {
            name: (value) => value.length >= 2 && value.includes(' '),
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: (value) => {
                const cleanPhone = value.replace(/\s/g, '');
                return /^(?:254|\+254|0)?(7\d{8})$/.test(cleanPhone);
            },
            service: (value) => value !== '',
            message: (value) => value.length >= 10
        };
        
        // Real-time validation with debouncing
        const debounce = (func, wait) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        };
        
        const validateOnInput = (field, validationFn) => {
            field.addEventListener('input', debounce(() => {
                if (field.value.trim()) {
                    const isValid = validationFn(field.value.trim());
                    field.classList.toggle('error', !isValid);
                } else {
                    field.classList.remove('error');
                }
                clearError();
            }, 500));
        };
        
        // Apply real-time validation
        if (nameInput) validateOnInput(nameInput, validations.name);
        if (emailInput) validateOnInput(emailInput, validations.email);
        if (phoneInput) validateOnInput(phoneInput, validations.phone);
        if (messageInput) validateOnInput(messageInput, validations.message);
        if (serviceSelect) {
            serviceSelect.addEventListener('change', () => {
                serviceSelect.classList.toggle('error', !validations.service(serviceSelect.value));
            });
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            clearError();
            
            let isValid = true;
            const errorMessages = [];
            
            // Validate each field
            if (!nameInput || !validations.name(nameInput.value.trim())) {
                isValid = false;
                errorMessages.push('Please enter your full name (first and last)');
                if (nameInput) nameInput.classList.add('error');
            }
            
            if (!emailInput || !validations.email(emailInput.value.trim())) {
                isValid = false;
                errorMessages.push('Please enter a valid email address');
                if (emailInput) emailInput.classList.add('error');
            }
            
            if (!phoneInput || !validations.phone(phoneInput.value.trim())) {
                isValid = false;
                errorMessages.push('Please enter a valid Kenyan phone number (e.g., 0722 233 600)');
                if (phoneInput) phoneInput.classList.add('error');
            }
            
            if (!serviceSelect || !validations.service(serviceSelect.value)) {
                isValid = false;
                errorMessages.push('Please select a service');
                if (serviceSelect) serviceSelect.classList.add('error');
            }
            
            if (!messageInput || !validations.message(messageInput.value.trim())) {
                isValid = false;
                errorMessages.push('Please enter a message with at least 10 characters');
                if (messageInput) messageInput.classList.add('error');
            }
            
            if (isValid) {
                const originalText = submitBtn.innerHTML;
                const originalState = submitBtn.disabled;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Success - show confirmation
                    alert('Thank you for your message! We will contact you within 1-2 hours.');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove error classes
                    [nameInput, emailInput, phoneInput, serviceSelect, messageInput]
                        .filter(field => field)
                        .forEach(field => field.classList.remove('error'));
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = originalState;
                    
                    // Scroll to success message or form
                    contactForm.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                    
                }, 1500);
            } else {
                showError(errorMessages.join('<br>'));
                // Scroll to first error
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    }
    
    // =========================================================
    // SMOOTH SCROLLING (with mobile menu support)
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                closeMenu?.();
            }
            
            // Calculate scroll position
            const headerHeight = header ? header.offsetHeight : 100;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight - 20;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        });
    });
    
    // =========================================================
    // AUTO-FORMAT PHONE NUMBER (Kenyan numbers)
    // =========================================================
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Remove Kenyan country code if present
            if (value.startsWith('254')) {
                value = value.substring(3);
            }
            
            // Format as XXX XXX XXX
            let formatted = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 3 === 0 && i < 9) {
                    formatted += ' ';
                }
                formatted += value[i];
            }
            
            e.target.value = formatted;
            
            // Validate and update UI
            const isValid = /^(?:7\d{2})(?:\s?\d{3})(?:\s?\d{3})$/.test(formatted.replace(/\s/g, ''));
            e.target.classList.toggle('error', !isValid && formatted.length > 0);
        });
        
        // Clear formatting on focus for easier editing
        phoneInput.addEventListener('focus', function() {
            this.value = this.value.replace(/\s/g, '');
        });
        
        // Re-format on blur
        phoneInput.addEventListener('blur', function() {
            let value = this.value.replace(/\s/g, '');
            if (value.length > 0) {
                let formatted = '';
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 3 === 0 && i < 9) {
                        formatted += ' ';
                    }
                    formatted += value[i];
                }
                this.value = formatted;
            }
        });
    }
    
    // =========================================================
    // FAQ ACCORDION (Enhanced with animations)
    // =========================================================
    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems.length > 0) {
        // Initialize all FAQ items
        faqItems.forEach(item => {
            const btn = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");
            
            if (!btn || !answer) return;
            
            // Set initial state
            answer.style.display = 'none';
            btn.setAttribute("aria-expanded", "false");
            
            // Click handler
            btn.addEventListener("click", () => {
                const isOpening = !item.classList.contains("active");
                
                // Close all other items
                faqItems.forEach(other => {
                    if (other !== item && other.classList.contains("active")) {
                        other.classList.remove("active");
                        const otherBtn = other.querySelector(".faq-question");
                        const otherAnswer = other.querySelector(".faq-answer");
                        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
                        if (otherAnswer) {
                            otherAnswer.style.display = 'none';
                        }
                    }
                });
                
                // Toggle current item
                item.classList.toggle("active");
                const isOpen = item.classList.contains("active");
                btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
                
                // Animate answer
                if (isOpen) {
                    answer.style.display = 'block';
                    answer.style.overflow = 'hidden';
                    answer.style.height = '0';
                    answer.style.transition = 'height 0.3s ease';
                    
                    // Calculate and set height
                    setTimeout(() => {
                        const height = answer.scrollHeight;
                        answer.style.height = height + 'px';
                        
                        // Reset height after animation
                        setTimeout(() => {
                            answer.style.height = 'auto';
                        }, 300);
                    }, 10);
                } else {
                    answer.style.height = answer.scrollHeight + 'px';
                    answer.style.overflow = 'hidden';
                    
                    setTimeout(() => {
                        answer.style.height = '0';
                        
                        // Hide after animation
                        setTimeout(() => {
                            answer.style.display = 'none';
                        }, 300);
                    }, 10);
                }
            });
            
            // Keyboard support
            btn.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    btn.click();
                }
            });
        });
    }
    
    // =========================================================
    // ADDITIONAL ENHANCEMENTS
    // =========================================================
    
    // Prevent body scroll when modal or menu is open
    const preventScroll = (e) => {
        if (document.body.classList.contains('menu-open')) {
            e.preventDefault();
        }
    };
    
    // Modern way to prevent scroll
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    
    // Initialize all interactive elements
    console.log('Page initialized successfully');
});