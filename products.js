  // Mobile Menu Toggle with improved functionality
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on ESC key press
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Initialize Brands Swiper
        const brandsSwiper = new Swiper('.brands-slider', {
            loop: true,
            slidesPerView: 2,
            spaceBetween: 30,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 5,
                },
                1200: {
                    slidesPerView: 6,
                }
            }
        });
        
        // Sticky Header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
        
        // Set current year and date
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Products Navigation Smooth Scroll
        const productNavLinks = document.querySelectorAll('.nav-product-link');
        const productCategories = document.querySelectorAll('.product-category');
        
        productNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                productNavLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Scroll to target with offset for sticky nav
                    const headerHeight = document.querySelector('.products-nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Highlight active product category on scroll
        function highlightActiveCategory() {
            const scrollPosition = window.scrollY + 200;
            const headerHeight = document.querySelector('.products-nav').offsetHeight;
            
            productCategories.forEach(category => {
                const categoryTop = category.offsetTop - headerHeight;
                const categoryBottom = categoryTop + category.offsetHeight;
                
                if (scrollPosition >= categoryTop && scrollPosition < categoryBottom) {
                    const categoryId = category.getAttribute('id');
                    
                    // Update nav links
                    productNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${categoryId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', highlightActiveCategory);
        
        // Product quote form submission
        const quoteForm = document.getElementById('productsQuoteForm');
        if (quoteForm) {
            quoteForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    alert('Thank you for your quote request! Our product specialists will contact you within 1 hour with detailed information and pricing.');
                    quoteForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 1500);
            });
        }
        
        // Product card button actions
        document.querySelectorAll('.btn-product-primary').forEach(btn => {
            btn.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productTitle = productCard.querySelector('.product-title').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent;
                
                // Show order confirmation
                alert(`Added to cart: ${productTitle}\nPrice: ${productPrice}\n\nOur sales team will contact you shortly to complete your order.`);
            });
        });
        
        document.querySelectorAll('.btn-product-secondary').forEach(btn => {
            btn.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productTitle = productCard.querySelector('.product-title').textContent;
                
                // Show product details modal (simulated)
                alert(`Product Details: ${productTitle}\n\nFull specifications and technical details will be sent to your email. Please provide your email address.`);
                
                const userEmail = prompt('Please enter your email address to receive full product details:');
                if (userEmail) {
                    alert(`Thank you! Product details for "${productTitle}" will be sent to ${userEmail} shortly.`);
                }
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement && !this.classList.contains('nav-product-link')) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add parallax effect to hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.products-hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
        
        // Animate product stats on scroll
        const productStats = document.querySelectorAll('.product-stat-number');
        
        function animateProductStats() {
            productStats.forEach(stat => {
                const target = parseInt(stat.textContent.replace('+', '').replace('%', ''));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('+') ? '+' : (stat.textContent.includes('%') ? '%' : ''));
                        clearInterval(timer);
                    } else {
                        const displayValue = Math.floor(current);
                        stat.textContent = displayValue + (stat.textContent.includes('+') ? '+' : (stat.textContent.includes('%') ? '%' : ''));
                    }
                }, 30);
            });
        }
        
        // Intersection Observer for stats animation
        const productObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProductStats();
                    productObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const productsHero = document.querySelector('.products-hero');
        if (productsHero) {
            productObserver.observe(productsHero);
        }
        
        // Initialize scroll position highlighting
        window.addEventListener('load', highlightActiveCategory);