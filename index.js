   // Initialize Swiper
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

        // Counter Animation for Trust Indicators
        function animateCounter() {
            const counters = document.querySelectorAll('.indicator-number');
            const speed = 200;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animateCounter, 1);
                } else {
                    counter.innerText = target;
                }
            });
        }

        // Start counter when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const trustSection = document.querySelector('.trust-indicators');
        if (trustSection) {
            observer.observe(trustSection);
        }

        // Set current year and date
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        // Mobile Menu Toggle
        document.getElementById('navToggle').addEventListener('click', function() {
            const navMenu = document.getElementById('navMenu');
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('navMenu').classList.remove('active');
                document.getElementById('navToggle').classList.remove('active');
            });
        });