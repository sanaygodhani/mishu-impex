// Mishu Impex - Interaction Logic

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.md\\:flex'); // Select the desktop nav links container

    // Mobile Menu Toggle logic
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Navigation scroll behavior
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            navbar.classList.add('nav-hidden');
            // Close mobile menu if it's open when hiding navbar
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        } else {
            navbar.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });

    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

    // Handle intersection logic to set visibility
    const handleIntersect = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const scrollObserver = new IntersectionObserver(handleIntersect, observerOptions);
    document.querySelectorAll('section').forEach(section => scrollObserver.observe(section));

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Pre-fill Logic
    const heroQuoteBtn = document.getElementById('hero-request-quote');
    const heroConsultationBtn = document.getElementById('hero-book-consultation');
    const inquirySelect = document.getElementById('inquiry-type');
    const messageTextarea = document.getElementById('contact-message');

    if (heroQuoteBtn && inquirySelect && messageTextarea) {
        heroQuoteBtn.addEventListener('click', () => {
            inquirySelect.value = 'quote';
            messageTextarea.value = 'I am interested in requesting a quote for a natural polished diamond. Specifically, I am looking for...';
        });
    }

    if (heroConsultationBtn && inquirySelect && messageTextarea) {
        heroConsultationBtn.addEventListener('click', () => {
            inquirySelect.value = 'consultation';
            messageTextarea.value = 'I would like to book a private consultation to discuss a bespoke jewelry commission with Aiko Diamonds.';
        });
    }

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Show success state
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = 'Message Sent';
                submitBtn.classList.remove('bg-silver-shiny', 'text-obsidian');
                submitBtn.classList.add('bg-green-600', 'text-white');
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.classList.add('bg-silver-shiny', 'text-obsidian');
                    submitBtn.classList.remove('bg-green-600', 'text-white');
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
