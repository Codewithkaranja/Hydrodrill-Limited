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
        
        // Initialize Testimonial Swiper
        const testimonialSwiper = new Swiper('.testimonial-slider', {
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
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
        
        // Project Filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-masonry-item');
        const searchInput = document.querySelector('.search-input');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'flex';
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
        
        // Search functionality
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            projectItems.forEach(item => {
                const title = item.querySelector('.project-title').textContent.toLowerCase();
                const description = item.querySelector('.project-description').textContent.toLowerCase();
                const category = item.getAttribute('data-category');
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
        
        // Project Gallery Modal
        const galleryModal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('modalImage');
        const modalClose = document.getElementById('modalClose');
        const modalPrev = document.getElementById('modalPrev');
        const modalNext = document.getElementById('modalNext');
        
        // Sample project images (in a real scenario, these would come from a database)
        const projectImages = {
            1: ['image - 2026-02-02T142031.882.webp', 'image - 2026-02-02T142402.363.webp', 'image - 2026-02-02T142311.874.webp'],
            2: ['image - 2026-02-02T142335.989.webp'],
            3: ['image - 2026-02-02T142222.308.webp'],
            4: ['image - 2026-02-02T142117.193.webp'],
            5: ['image - 2026-02-02T142402.363.webp'],
            6: ['image - 2026-02-02T143101.494.webp'],
            7: ['image - 2026-02-02T142427.295.webp'],
            8: ['image - 2026-02-02T143034.461.webp']
        };
        
        let currentProjectId = null;
        let currentImageIndex = 0;
        
        document.querySelectorAll('.view-project').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = link.getAttribute('data-project');
                currentProjectId = projectId;
                currentImageIndex = 0;
                
                if (projectImages[projectId]) {
                    modalImage.src = projectImages[projectId][0];
                    galleryModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        modalClose.addEventListener('click', () => {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        modalPrev.addEventListener('click', () => {
            if (currentProjectId && projectImages[currentProjectId]) {
                currentImageIndex = (currentImageIndex - 1 + projectImages[currentProjectId].length) % projectImages[currentProjectId].length;
                modalImage.src = projectImages[currentProjectId][currentImageIndex];
            }
        });
        
        modalNext.addEventListener('click', () => {
            if (currentProjectId && projectImages[currentProjectId]) {
                currentImageIndex = (currentImageIndex + 1) % projectImages[currentProjectId].length;
                modalImage.src = projectImages[currentProjectId][currentImageIndex];
            }
        });
        
        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
                galleryModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            if (e.key === 'ArrowLeft' && galleryModal.classList.contains('active')) {
                modalPrev.click();
            }
            
            if (e.key === 'ArrowRight' && galleryModal.classList.contains('active')) {
                modalNext.click();
            }
        });
        
        // Load More Projects
        const loadMoreBtn = document.getElementById('loadMoreProjects');
        let projectsLoaded = 8;
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                // Simulate loading more projects (in a real scenario, this would be an AJAX request)
                setTimeout(() => {
                    // This would be replaced with actual project loading logic
                    loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> All Projects Loaded';
                    loadMoreBtn.disabled = true;
                    loadMoreBtn.style.opacity = '0.7';
                    
                    // Show a message
                    const message = document.createElement('p');
                    message.className = 'mt-3 text-muted';
                    message.textContent = 'All projects are currently displayed. Check back soon for new projects!';
                    loadMoreBtn.parentElement.appendChild(message);
                }, 1500);
            });
        }
        
        // Animate stats on scroll
        const statNumbers = document.querySelectorAll('.stat-number');
        
        function animateStats() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace('+', '').replace('M+', ''));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('M') ? 'M+' : '');
                        clearInterval(timer);
                    } else {
                        const displayValue = Math.floor(current);
                        stat.textContent = displayValue + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('M') ? 'M+' : '');
                    }
                }, 30);
            });
        }
        
        // Intersection Observer for stats animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.impact-stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
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
        
        // Filter links in footer
        document.querySelectorAll('a[data-filter]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const filterValue = link.getAttribute('data-filter');
                
                // Trigger the filter button click
                filterButtons.forEach(btn => {
                    if (btn.getAttribute('data-filter') === filterValue) {
                        btn.click();
                    }
                });
                
                // Scroll to projects section
                document.querySelector('.projects-filter').scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // Add parallax effect to hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.projects-hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });