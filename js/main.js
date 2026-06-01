/**
 * 刘氏推拿 · 大隐隐于市
 * Main JavaScript
 */

(function () {
    'use strict';

    // ========================================
    // Navigation scroll effect
    // ========================================
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;
        nav.classList.toggle('scrolled', scrollY > 50);
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ========================================
    // Mobile nav toggle
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav__links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav__links--open');
            navToggle.classList.toggle('nav__toggle--active');
        });
    }

    // ========================================
    // Scroll reveal (IntersectionObserver)
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        // Fallback: show all
        revealElements.forEach((el) => el.classList.add('visible'));
    }

    // ========================================
    // Testimonial slider
    // ========================================
    const testimonials = document.querySelectorAll('.words__item');
    const dots = document.querySelectorAll('.words__dot');
    let currentIndex = 0;
    let autoplayTimer;

    function showTestimonial(index) {
        testimonials.forEach((t) => t.classList.remove('words__item--active'));
        dots.forEach((d) => d.classList.remove('words__dot--active'));
        testimonials[index].classList.add('words__item--active');
        dots[index].classList.add('words__dot--active');
        currentIndex = index;
    }

    function startAutoplay() {
        autoplayTimer = setInterval(() => {
            showTestimonial((currentIndex + 1) % testimonials.length);
        }, 5000);
    }

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            clearInterval(autoplayTimer);
            showTestimonial(parseInt(dot.dataset.index, 10));
            startAutoplay();
        });
    });

    if (testimonials.length > 0) {
        startAutoplay();
    }

    // ========================================
    // Booking form
    // ========================================
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('.btn');
            const originalText = btn.textContent;

            btn.textContent = '提交中...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = '预约成功！';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1200);
        });
    }

    // ========================================
    // Smooth scroll for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });

                // Close mobile nav if open
                if (navLinks) navLinks.classList.remove('nav__links--open');
                if (navToggle) navToggle.classList.remove('nav__toggle--active');
            }
        });
    });

    // ========================================
    // Hero parallax (subtle)
    // ========================================
    const heroContent = document.querySelector('.hero__content');

    if (heroContent) {
        window.addEventListener(
            'scroll',
            () => {
                const scrollY = window.scrollY;
                if (scrollY < window.innerHeight) {
                    const progress = scrollY / window.innerHeight;
                    heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
                    heroContent.style.opacity = 1 - progress * 0.6;
                }
            },
            { passive: true }
        );
    }

    // ========================================
    // Active nav link on scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav__links a');

    function highlightNav() {
        const scrollY = window.scrollY + 120;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinksAll.forEach((link) => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--red)';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
})();