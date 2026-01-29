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
        
        // Initialize Gallery Swiper
        const gallerySwiper = new Swiper('.gallery-slider', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
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
        
        // Solar Calculator
        const dailyWaterSlider = document.getElementById('dailyWater');
        const dailyWaterValue = document.getElementById('dailyWaterValue');
        const pumpDepthSlider = document.getElementById('pumpDepth');
        const pumpDepthValue = document.getElementById('pumpDepthValue');
        const currentCostSlider = document.getElementById('currentCost');
        const currentCostValue = document.getElementById('currentCostValue');
        const systemTypeSelect = document.getElementById('systemType');
        const calculateBtn = document.getElementById('calculateBtn');
        const calculatorResults = document.getElementById('calculatorResults');
        
        // Update slider values display
        dailyWaterSlider.addEventListener('input', () => {
            dailyWaterValue.textContent = dailyWaterSlider.value.toLocaleString();
        });
        
        pumpDepthSlider.addEventListener('input', () => {
            pumpDepthValue.textContent = pumpDepthSlider.value;
        });
        
        currentCostSlider.addEventListener('input', () => {
            currentCostValue.textContent = currentCostSlider.value.toLocaleString();
        });
        
        // Calculate savings
        calculateBtn.addEventListener('click', () => {
            const dailyWater = parseInt(dailyWaterSlider.value);
            const pumpDepth = parseInt(pumpDepthSlider.value);
            const currentCost = parseInt(currentCostSlider.value);
            const systemMultiplier = parseFloat(systemTypeSelect.value);
            
            // Calculate system cost (simplified formula)
            const baseCost = (dailyWater / 1000) * pumpDepth * 850;
            const systemCost = Math.round(baseCost * systemMultiplier);
            
            // Calculate savings
            const monthlySavings = Math.round(currentCost * 0.8); // 80% savings
            const annualSavings = monthlySavings * 12;
            const roiYears = (systemCost / annualSavings).toFixed(1);
            const totalSavings = (annualSavings * 25) - systemCost;
            
            // Update results display
            document.getElementById('systemCost').textContent = 'KES ' + systemCost.toLocaleString();
            document.getElementById('monthlySavings').textContent = 'KES ' + monthlySavings.toLocaleString();
            document.getElementById('annualSavings').textContent = 'KES ' + annualSavings.toLocaleString();
            document.getElementById('roi').textContent = roiYears + ' Years';
            document.getElementById('totalSavings').textContent = 'KES ' + totalSavings.toLocaleString();
            
            // Show results with animation
            calculatorResults.classList.add('active');
            
            // Scroll to results
            calculatorResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
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
            const hero = document.querySelector('.solar-hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
        
        // Animate solar stats on scroll
        const solarStats = document.querySelectorAll('.solar-stat-number');
        
        function animateSolarStats() {
            solarStats.forEach(stat => {
                const target = parseInt(stat.textContent.replace('%', '').replace('+', ''));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('%') ? '%' : (stat.textContent.includes('+') ? '+' : ''));
                        clearInterval(timer);
                    } else {
                        const displayValue = Math.floor(current);
                        stat.textContent = displayValue + (stat.textContent.includes('%') ? '%' : (stat.textContent.includes('+') ? '+' : ''));
                    }
                }, 30);
            });
        }
        
        // Intersection Observer for stats animation
        const solarObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSolarStats();
                    solarObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const solarHero = document.querySelector('.solar-hero');
        if (solarHero) {
            solarObserver.observe(solarHero);
        }
        
        // Auto-calculate on slider change
        [dailyWaterSlider, pumpDepthSlider, currentCostSlider, systemTypeSelect].forEach(input => {
            input.addEventListener('change', () => {
                if (calculatorResults.classList.contains('active')) {
                    calculateBtn.click();
                }
            });
        });
        
        // Pre-calculate on page load
        window.addEventListener('load', () => {
            calculateBtn.click();
        });