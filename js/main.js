/* 
    Cortenity AI Tools Directory - Interactivity Engine
    Handles cursor glow, scroll reveals, and directory-specific UI logic.
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed for performance
                // revealObserver.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Search Bar Teaser Interactivity
    const searchInput = document.querySelector('.search-teaser input');
    if (searchInput) {
        searchInput.addEventListener('click', () => {
            searchInput.placeholder = "Full search engine coming soon...";
            setTimeout(() => {
                searchInput.placeholder = "Search 500+ tools, prompts, products...";
            }, 2000);
        });
    }

    // 4. Submission Form Success Simulation
    const submitForm = document.getElementById('submit-form');
    if (submitForm) {
        submitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = submitForm.querySelector('.btn-submit');
            const statusBox = document.getElementById('status');

            btn.innerText = 'Transmitting Data...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Submission Received';
                btn.style.background = 'var(--accent-secondary)';
                btn.style.color = '#000';
                statusBox.innerHTML = 'Thank you! Your tool has been submitted for review. High-quality prompts and guides are featured weekly.';
                submitForm.reset();
            }, 1500);
        });
    }

    // 5. Smooth Scroll for Navigation Links
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

    // 6. Navigation Background Morph on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.style.padding = "18px 0";
            navbar.style.background = "rgba(3, 3, 3, 0.98)";
            navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,0.4)";
        } else {
            navbar.style.padding = "25px 0";
            navbar.style.background = "var(--bg-nav)";
            navbar.style.boxShadow = "none";
        }
    });

});
