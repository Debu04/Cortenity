/* 
    Cortenity Brand Portfolio JS
    Handles smooth scrolling, reveal animations, and form feedback.
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.padding = '20px 0';
        }
    });

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial check

    // Smooth Scrolling for Nav Links (Enhanced)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Space for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // UI Feedback
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Sent Successfully';
                btn.style.background = 'var(--accent-green)';
                btn.style.color = '#000';
                
                formStatus.innerText = 'Thank you for your message. We will get back to you shortly.';
                formStatus.style.color = 'var(--accent-green)';
                formStatus.style.marginTop = '20px';
                formStatus.style.textAlign = 'center';

                contactForm.reset();
                
                // Reset button after a delay
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 3000);

            }, 1500);
        });
    }

    // Mobile Menu Toggle (Basic)
    const mobileToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // Since nav-links is hidden on mobile in CSS, a more complex mobile nav
            // would involve toggling classes, but for this premium minimal look,
            // we'll keep it simple for now or could expand if needed.
            // alert('Mobile menu logic would expand here for a full drawer.');
            // Implementation note: Keep minimal for one-page.
        });
    }
});
