/* 
    Cortenity Brand Portfolio JS (Ultra-Premium Core)
    Includes: Cursor Magnetic Glow, Cross-Section Reveals, Form Handling
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Cursor Magnetic Glow
    // Tracks the mouse and updates CSS variables for the radial gradient background
    const updateCursorGlow = () => {
        const glow = document.querySelector('.cursor-glow');
        if (!glow) return;

        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            document.documentElement.style.setProperty('--mouse-x', `${x}%`);
            document.documentElement.style.setProperty('--mouse-y', `${y}%`);
        });
    };

    // 2. Intersection Observer for Scroll Reveals
    // Triggers animations when sections enter the viewport
    const initScrollReveals = () => {
        const options = {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -100px 0px" // Trigger slightly before element is fully visible
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Once revealed, we don't necessarily need to hide it again
                    // unless we want a repeating entrance animation.
                }
            });
        }, options);

        const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        targets.forEach(t => revealObserver.observe(t));
    };

    // 3. Smooth Magnetic Scrolling
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();

                    // Close mobile menu if open
                    document.body.classList.remove('mobile-active');

                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // 4. Navbar Active State & Shadow
    const handleNavbarEffects = () => {
        const nav = document.querySelector('.navbar');
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            // Shadow on scroll
            if (window.scrollY > 50) {
                nav.style.padding = '15px 0';
                nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                nav.style.padding = '25px 0';
                nav.style.boxShadow = 'none';
            }

            // Active Class Logic
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    };

    // 5. Contact Form Simulation
    const initContactForm = () => {
        const form = document.getElementById('contact-form');
        const status = document.getElementById('form-status');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = form.querySelector('button');
                const originalContent = submitBtn.innerHTML;

                // Loading State
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="loading-dot"></span> Processing...';

                setTimeout(() => {
                    // Success State
                    submitBtn.style.background = 'var(--accent-green)';
                    submitBtn.style.color = '#000';
                    submitBtn.innerHTML = 'Message Sent Successfully';

                    status.innerHTML = '<p style="color: var(--accent-green); text-align: center; margin-top: 15px;">We have received your message and will get back to you shortly.</p>';

                    form.reset();

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalContent;
                        submitBtn.style.background = '';
                        submitBtn.style.color = '';
                        status.innerHTML = '';
                    }, 5000);
                }, 2000);
            });
        }
    };

    // 6. Mobile Menu Toggle
    const initMobileMenu = () => {
        const toggle = document.getElementById('mobile-menu');
        const body = document.body;

        if (toggle) {
            toggle.addEventListener('click', () => {
                body.classList.toggle('mobile-active');
            });
        }
    };

    // Power Up
    updateCursorGlow();
    initScrollReveals();
    initSmoothScroll();
    handleNavbarEffects();
    initContactForm();
    initMobileMenu();
});
