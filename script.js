document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // -- Mobile Menu Logic --
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
    };

    mobileMenuBtn?.addEventListener('click', toggleMenu);
    mobileMenuClose?.addEventListener('click', toggleMenu);

    // Reveal Sections with Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-item').forEach(item => {
        revealObserver.observe(item);
    });

    // GSAP Fallback for complex sequences
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // -- Breathing Widget Logic --
    const startBtn = document.getElementById('start-breath');
    const resetBtn = document.getElementById('reset-breath');
    const circle = document.getElementById('breathing-circle');
    const phaseText = document.getElementById('breathing-phase');

    let isBreathing = false;
    let breathTimeout;

    const runBreathingCycle = () => {
        if (!isBreathing) return;

        // Phase 1: Inhale (4s)
        phaseText.innerText = "Inhale...";
        circle.style.transform = "scale(1.5)";
        circle.style.borderColor = "var(--brand-primary)";

        breathTimeout = setTimeout(() => {
            if (!isBreathing) return;
            // Phase 2: Hold (7s)
            phaseText.innerText = "Hold...";

            breathTimeout = setTimeout(() => {
                if (!isBreathing) return;
                // Phase 3: Exhale (8s)
                phaseText.innerText = "Exhale...";
                circle.style.transform = "scale(1)";
                circle.style.borderColor = "var(--brand-accent)";

                breathTimeout = setTimeout(() => {
                    if (isBreathing) runBreathingCycle();
                }, 8000);
            }, 7000);
        }, 4000);
    };

    startBtn?.addEventListener('click', () => {
        if (!isBreathing) {
            isBreathing = true;
            startBtn.innerText = "Pause";
            runBreathingCycle();
        } else {
            isBreathing = false;
            clearTimeout(breathTimeout);
            startBtn.innerText = "Resume";
            phaseText.innerText = "Paused";
            circle.style.transform = "scale(1)";
        }
    });

    resetBtn?.addEventListener('click', () => {
        isBreathing = false;
        clearTimeout(breathTimeout);
        startBtn.innerText = "Start Exercise";
        phaseText.innerText = "Ready to Reset?";
        circle.style.transform = "scale(1)";
    });
});
