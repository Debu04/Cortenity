/* 
    Cortenity Parent Brand - Interactivity Engine
    Handles cursor glow, scroll reveals, and roadmap animations.
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Premium Cursor Glow Follower
    const setGlowPosition = (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };
    window.addEventListener('mousemove', setGlowPosition);

    // 2. Intersection Observer for High-Quality Reveals
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Contact Form Success Simulation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const statusBox = document.getElementById('status');
            const originalText = btn.innerText;

            // Prepare button for loading state
            btn.innerText = 'Transmitting...';
            btn.disabled = true;

            // Gather form data
            const formData = new FormData(contactForm);

            // Send POST request to backend
            fetch('send_email.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        // Success handling
                        btn.innerText = 'Message Dispatched';
                        btn.style.boxShadow = '0 0 30px var(--accent-live)';
                        statusBox.style.color = 'var(--accent-live)';
                        statusBox.textContent = data.message;
                        contactForm.reset();

                        // Reset button after delay
                        setTimeout(() => {
                            btn.innerText = originalText;
                            btn.disabled = false;
                            btn.style.boxShadow = '';
                            statusBox.textContent = '';
                        }, 5000);
                    } else {
                        // Error handling from server
                        throw new Error(data.message || 'Unknown error occurred');
                    }
                })
                .catch(error => {
                    // Network or script error handling
                    console.error('Error:', error);
                    statusBox.style.color = '#ef4444'; // Red for error
                    statusBox.textContent = 'Transmission failed. Attempting local client...';

                    // Fallback to mailto link if PHP fails (e.g., no server)
                    setTimeout(() => {
                        const name = formData.get('name');
                        const subject = formData.get('subject') || 'New Inquiry';
                        const message = formData.get('message');
                        window.location.href = `mailto:ai.artz70@gmail.com?cc=medebu4@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + "\n\n" + message)}`;

                        btn.innerText = originalText;
                        btn.disabled = false;
                    }, 2000);
                });
        });
    }

    // 4. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 5. Navigation Background Morph on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 7. Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('nav-active');
            document.body.style.overflow = navbar.classList.contains('nav-active') ? 'hidden' : 'visible';
        });
    }

    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('nav-active');
            document.body.style.overflow = 'visible';
        });
    });

});
