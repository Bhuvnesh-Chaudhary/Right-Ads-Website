/**
 * RIGHT ADS - Digital Marketing Agency
 * Main JavaScript Engine
 * * Version: 1.1.0 (Updated with Animated Hero Slider)
 * Author: Senior Frontend Developer
 * Features: ES6+, Performance Optimized, Modular, Accessible
 */

"use strict";

class RightAdsApp {
    constructor() {
        // Core State
        this.state = {
            isMenuOpen: false,
            activeFilter: 'all',
            testimonialIndex: 0,
            testimonialInterval: null,
            scrollPosition: 0,
            heroSlideIndex: 0 // Track active hero copy slide
        };

        // DOM Elements Cache
        this.nodes = {
            preloader: document.querySelector('.preloader'),
            navbar: document.querySelector('.navbar'),
            navLinks: document.querySelectorAll('.nav-menu-link'),
            mobileToggle: document.querySelector('.mobile-toggle'),
            navMenu: document.querySelector('.nav-menu-list'),
            sections: document.querySelectorAll('section[id]'),
            counters: document.querySelectorAll('.counter-value'),
            portfolioItems: document.querySelectorAll('.portfolio-item'),
            filterBtns: document.querySelectorAll('.filter-btn'),
            testimonialSlides: document.querySelectorAll('.testimonial-slide'),
            testimonialContainer: document.querySelector('.testimonial-wrapper'),
            contactForm: document.querySelector('#contact-form'),
            backToTop: document.querySelector('.back-to-top'),
            heroFloatingCards: document.querySelectorAll('.hero-card-float'),
            tiltElements: document.querySelectorAll('.tilt-card'),
            heroSlides: document.querySelectorAll('.hero-slide') // Cached hero slides
        };

        this.init();
    }

    /**
     * Initialize Application
     */
    init() {
        window.addEventListener('load', () => this.handlePreloader());
        this.initNavigation();
        this.initSmoothScroll();
        this.initScrollAnimations();
        this.initCounters();
        this.initHeroSlider(); // Initialized the 4-second hero loop
        this.initHeroEffects();
        this.initTiltEffect();
        this.initPortfolio();
        this.initTestimonialSlider();
        this.initFormValidation();
        this.initBackToTop();
        this.initThemeEffects();
        
        // Performance: Optimized scroll listener
        this.addOptimizedEventListener(window, 'scroll', () => this.handleScrollEffects());
    }

    /**
     * Utility: Optimized Event Listener (Throttle)
     */
    addOptimizedEventListener(target, type, handler) {
        let waiting = false;
        target.addEventListener(type, (e) => {
            if (!waiting) {
                handler(e);
                waiting = true;
                requestAnimationFrame(() => {
                    waiting = false;
                });
            }
        });
    }

    /**
     * 1. Loading Screen
     */
    handlePreloader() {
        if (this.nodes.preloader) {
            this.nodes.preloader.style.opacity = '0';
            setTimeout(() => {
                this.nodes.preloader.style.display = 'none';
                this.revealHeroContent();
            }, 600);
        }
    }

    /**
     * 2. Navigation Module
     */
    initNavigation() {
        // Sticky Header & Active Link Logic
        const navObserverOptions = { threshold: 0.5 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.nodes.navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, navObserverOptions);

        this.nodes.sections.forEach(section => observer.observe(section));

        // Mobile Menu Toggle
        this.nodes.mobileToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Close menu on link click
        this.nodes.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.state.isMenuOpen) this.toggleMobileMenu();
            });
        });
    }

    toggleMobileMenu() {
        this.state.isMenuOpen = !this.state.isMenuOpen;
        this.nodes.navMenu.classList.toggle('menu-active');
        this.nodes.mobileToggle.classList.toggle('is-active');
        document.body.style.overflow = this.state.isMenuOpen ? 'hidden' : '';
        
        // Accessibility
        this.nodes.mobileToggle.setAttribute('aria-expanded', this.state.isMenuOpen);
    }

    handleScrollEffects() {
        const currentScroll = window.pageYOffset;
        
        // Navbar sticky effect
        this.nodes.navbar.classList.toggle('navbar-scrolled', currentScroll > 50);
        
        // Back to top visibility
        if (this.nodes.backToTop) {
            this.nodes.backToTop.classList.toggle('visible', currentScroll > 500);
        }
        
        this.state.scrollPosition = currentScroll;
    }

    /**
     * 3. Smooth Scrolling
     */
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {

        const href = anchor.getAttribute('href');

        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * 4. Scroll Animations (Intersection Observer)
     */
    initScrollAnimations() {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.15 });

        const animElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right, .zoom-in');
        animElements.forEach(el => animationObserver.observe(el));
    }

    /**
     * 5. Counter Animation
     */
   initCounters() {

    this.nodes.counters.forEach(counter => {

        if (!counter.dataset.animated) {

            counter.dataset.animated = "true";

            this.animateCount(counter);
        }

    });

}

animateCount(el) {

    const target = parseFloat(el.innerText);

    el.innerText = "0";

    const duration = 2000;
    const startTime = performance.now();

    const updateCount = (currentTime) => {

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeProgress = 1 - Math.pow(1 - progress, 3);

        const currentValue = easeProgress * target;

        if (target % 1 === 0) {
            el.innerText = Math.floor(currentValue);
        } else {
            el.innerText = currentValue.toFixed(1);
        }

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            el.innerText = target;
        }

    };

    requestAnimationFrame(updateCount);
}

    /**
     * 6. Hero Section Slider & Content Reveal
     */
    revealHeroContent() {
        const heroTimeline = document.querySelectorAll('.hero-reveal');
        heroTimeline.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('revealed');
            }, index * 200);
        });
    }

    initHeroSlider() {
        if (!this.nodes.heroSlides.length) return;
        
        // Auto rotate hero slides every 4 seconds
        setInterval(() => {
            this.nodes.heroSlides[this.state.heroSlideIndex].classList.remove('active');
            this.state.heroSlideIndex = (this.state.heroSlideIndex + 1) % this.nodes.heroSlides.length;
            this.nodes.heroSlides[this.state.heroSlideIndex].classList.add('active');
        }, 4000);
    }

    initHeroEffects() {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;

            this.nodes.heroFloatingCards.forEach((card, index) => {
                const depth = (index + 1) * 0.5;
                card.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
            });
        });
    }

    /**
     * 7. Services: Tilt Effect
     */
    initTiltEffect() {
        this.nodes.tiltElements.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    /**
     * 8. Portfolio Filtering
     */
    initPortfolio() {
        this.nodes.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.nodes.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                
                this.nodes.portfolioItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        if (filter === 'all' || item.dataset.category === filter) {
                            item.style.display = 'block';
                            requestAnimationFrame(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            });
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    /**
     * 9. Testimonial Slider
     */
    initTestimonialSlider() {
        if (!this.nodes.testimonialContainer) return;

        const updateSlider = () => {
            const width = this.nodes.testimonialSlides[0].offsetWidth;
            this.nodes.testimonialContainer.style.transform = `translateX(-${this.state.testimonialIndex * width}px)`;
        };

        const nextSlide = () => {
            this.state.testimonialIndex = (this.state.testimonialIndex + 1) % this.nodes.testimonialSlides.length;
            updateSlider();
        };

        const prevSlide = () => {
            this.state.testimonialIndex = (this.state.testimonialIndex - 1 + this.nodes.testimonialSlides.length) % this.nodes.testimonialSlides.length;
            updateSlider();
        };

        document.querySelector('.slider-next')?.addEventListener('click', () => {
            this.stopSlider();
            nextSlide();
        });

        document.querySelector('.slider-prev')?.addEventListener('click', () => {
            this.stopSlider();
            prevSlide();
        });

        this.startSlider(nextSlide);

        this.nodes.testimonialContainer.addEventListener('mouseenter', () => this.stopSlider());
        this.nodes.testimonialContainer.addEventListener('mouseleave', () => this.startSlider(nextSlide));
        
        window.addEventListener('resize', updateSlider);
    }

    startSlider(cb) {
        if (!this.state.testimonialInterval) {
            this.state.testimonialInterval = setInterval(cb, 5000);
        }
    }

    stopSlider() {
        clearInterval(this.state.testimonialInterval);
        this.state.testimonialInterval = null;
    }

    /**
     * 10. Contact Form Validation
     */
    initFormValidation() {
        if (!this.nodes.contactForm) return;

        this.nodes.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(this.nodes.contactForm);
            let isValid = true;

            this.nodes.contactForm.querySelectorAll('.error-msg').forEach(msg => msg.remove());

            const validators = {
                name: (val) => val.length >= 2,
                email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
                phone: (val) => /^\+?[\d\s-]{10,}$/.test(val),
                service: (val) => val !== "",
                message: (val) => val.length >= 10
            };

            for (let [key, value] of formData.entries()) {
                if (validators[key] && !validators[key](value)) {
                    this.showFieldError(key, `Please enter a valid ${key}`);
                    isValid = false;
                }
            }

            if (isValid) {
                this.handleFormSuccess();
            }
        });
    }

    showFieldError(fieldName, message) {
        const field = this.nodes.contactForm.querySelector(`[name="${fieldName}"]`);
        const error = document.createElement('span');
        error.className = 'error-msg';
        error.style.color = '#ff4d4d';
        error.style.fontSize = '12px';
        error.innerText = message;
        field.parentNode.appendChild(error);
        field.classList.add('field-error');
    }

    handleFormSuccess() {
        const btn = this.nodes.contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        
        btn.disabled = true;
        btn.innerText = "Sending...";

        setTimeout(() => {
            btn.innerText = "Success! Message Sent";
            btn.style.backgroundColor = "#28a745";
            this.nodes.contactForm.reset();
            
            setTimeout(() => {
                btn.disabled = false;
                btn.innerText = originalText;
                btn.style.backgroundColor = "";
            }, 3000);
        }, 1500);
    }

    /**
     * 11. Back to Top
     */
    initBackToTop() {
        this.nodes.backToTop?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * 12. Theme & Visual Effects
     */
    initThemeEffects() {
        const container = document.querySelector('.floating-shapes-container');
        if (container) {
            for (let i = 0; i < 15; i++) {
                const shape = document.createElement('div');
                shape.className = 'floating-shape';
                const size = Math.random() * 50 + 10;
                
                Object.assign(shape.style, {
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.1,
                    animationDuration: `${Math.random() * 20 + 10}s`,
                    animationDelay: `${Math.random() * 5}s`
                });
                
                container.appendChild(shape);
            }
        }

        const cursorEffect = (e) => {
            const glow = document.querySelector('.mouse-glow');
            if (glow) {
                glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
            }
        };
        window.addEventListener('mousemove', cursorEffect);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new RightAdsApp();
});
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.address-slide');
    let currentSlide = 0;

    function showNextSlide() {
        // Purane slide ko hide karo
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].style.pointerEvents = 'none';
        
        // Agla index calculate karo
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Naye slide ko show karo
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.pointerEvents = 'auto';
    }

    // Har 4 second (4000ms) mein automatic slide change hogi
    setInterval(showNextSlide, 4000);
});
// ⚡ ENHANCED CALCULATOR ENGINE (MANUAL TRIGGER MODE)

function toggleCalculator() {
    const calcWindow = document.getElementById('calcWindow');
    calcWindow.style.display = calcWindow.style.display === 'flex' ? 'none' : 'flex';
}

// Only updates UI slider numbers live, does not execute math automatically
function updateSlidersText() {
    document.getElementById('pages-val').innerText = document.getElementById('pages-slider').value + " Pages";
    document.getElementById('budget-val').innerText = "₹" + parseInt(document.getElementById('budget-slider').value).toLocaleString('en-IN');
}

// Triggers calculation and reveals results section
function processCalculation() {
    let baseCost = 0;
    let totalDays = 0;
    let servicesSelected = 0;
    
    let invoiceHtml = "";
    let webDevBaseCost = 0;
    let hasPagesDiscount = false;

    // 1. Web Dev Evaluation
    if(document.getElementById('webdev').checked) {
        let pages = parseInt(document.getElementById('pages-slider').value);
        webDevBaseCost = 25000 + (pages > 5 ? (pages - 5) * 1500 : 0);
        if(pages >= 10) hasPagesDiscount = true;
        
        baseCost += webDevBaseCost;
        invoiceHtml += `<div class="invoice-item"><span>Web Dev (${pages} Pages):</span><span>₹${webDevBaseCost.toLocaleString('en-IN')}</span></div>`;
        totalDays += 10 + Math.ceil(pages/2);
        servicesSelected++;
    }

    // 2. SEO Evaluation
    if(document.getElementById('seo').checked) {
        baseCost += 15000;
        invoiceHtml += `<div class="invoice-item"><span>Premium SEO:</span><span>₹15,000</span></div>`;
        totalDays = Math.max(totalDays, 12);
        servicesSelected++;
    }

    // 3. Ads Management Evaluation
    if(document.getElementById('ads').checked) {
        let adBudget = parseInt(document.getElementById('budget-slider').value);
        let adsFee = 18000 + (adBudget * 0.07);
        baseCost += adsFee;
        invoiceHtml += `<div class="invoice-item"><span>Ads Mgmt Fee:</span><span>₹${Math.round(adsFee).toLocaleString('en-IN')}</span></div>`;
        totalDays = Math.max(totalDays, 7);
        servicesSelected++;
        
        document.getElementById('roi-box').style.display = 'block';
        document.getElementById('roi-reach').innerText = (adBudget * 6).toLocaleString('en-IN') + "+";
        document.getElementById('roi-leads').innerText = Math.round(adBudget * 0.008) + "-" + Math.round(adBudget * 0.02);
    } else {
        document.getElementById('roi-box').style.display = 'none';
    }

    // 4. Branding Evaluation
    if(document.getElementById('branding').checked) {
        baseCost += 8000;
        invoiceHtml += `<div class="invoice-item"><span>Corporate Brand Kit:</span><span>₹8,000</span></div>`;
        totalDays += 5;
        servicesSelected++;
    }

    // 5. Certifications Evaluation
    if(document.getElementById('cert').checked) {
        baseCost += 6000;
        invoiceHtml += `<div class="invoice-item"><span>ISO/MSME Setup:</span><span>₹6,000</span></div>`;
        totalDays += 5;
        servicesSelected++;
    }

    if(servicesSelected === 0) {
        alert("Please select at least one service first!");
        return;
    }

    // Show Results Panel
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('invoice-items').innerHTML = invoiceHtml;

    // Calculate Discounts
    let pageDiscountAmt = 0;
    if(hasPagesDiscount) {
        pageDiscountAmt = webDevBaseCost * 0.15;
        document.getElementById('page-discount-row').style.display = 'flex';
        document.getElementById('page-discount-amount').innerText = "-₹" + Math.round(pageDiscountAmt).toLocaleString('en-IN');
    } else {
        document.getElementById('page-discount-row').style.display = 'none';
    }

    let comboDiscountAmt = 0;
    let costAfterPageDiscount = baseCost - pageDiscountAmt;
    if(servicesSelected >= 3) {
        comboDiscountAmt = costAfterPageDiscount * 0.10;
        document.getElementById('combo-discount-row').style.display = 'flex';
        document.getElementById('combo-discount-amount').innerText = "-₹" + Math.round(comboDiscountAmt).toLocaleString('en-IN');
    } else {
        document.getElementById('combo-discount-row').style.display = 'none';
    }

    let finalRunningTotal = costAfterPageDiscount - comboDiscountAmt;

    // Tax Toggle
    if(document.getElementById('tax-toggle').checked) {
        finalRunningTotal = finalRunningTotal * 1.18;
    }

    // Update Text Fields
    document.getElementById('final-total').innerText = "₹" + Math.round(finalRunningTotal).toLocaleString('en-IN');
    document.getElementById('delivery-time').innerText = totalDays + " Days";
}

// 📲 COMPREHENSIVE WHATSAPP TRANSMISSION SYSTEM
function sendWhatsAppLead() {
    let finalTotal = document.getElementById('final-total').innerText;
    let timeline = document.getElementById('delivery-time').innerText;
    let isGstIncluded = document.getElementById('tax-toggle').checked ? "Yes (18% Included)" : "No";
    
    let message = `Hi Right Ads! 👋%0A%0AI have generated a custom estimate on your website calculator. Here are my project requirements:%0A`;
    
    if(document.getElementById('webdev').checked) {
        message += `• *Website Development* (${document.getElementById('pages-slider').value} Pages Setup) 🌐%0A`;
    }
    if(document.getElementById('seo').checked) {
        message += `• *Premium SEO Optimization* (Top Google Rankings) 🚀%0A`;
    }
    if(document.getElementById('ads').checked) {
        message += `• *Google & Social Ads Management* (Monthly Budget: ${document.getElementById('budget-val').innerText}) 🎯%0A`;
    }
    if(document.getElementById('branding').checked) {
        message += `• *Corporate Brand Identity* (Full Logo Kit) 🎨%0A`;
    }
    if(document.getElementById('cert').checked) {
        message += `• *Business Registrations* (ISO / MSME Setup) 📜%0A`;
    }
    
    message += `%0A━━━━━━━━━━━━━━━━━━%0A🧾 *Financial Overview:*%0A- Taxes Added: ${isGstIncluded}%0A- *Estimated Final Total:* ${finalTotal}%0A- *Expected Completion:* ${timeline}%0A━━━━━━━━━━━━━━━━━━%0A%0APlease share the detailed roadmap and next setup instructions. Thanks!`;
    
    // Replace with your real agency WhatsApp number
    let whatsappUrl = `https://wa.me/918377072990?text=${message}`;
    window.open(whatsappUrl, '_blank');
}
const bgSlides = document.querySelectorAll(".bg-slide");

let currentBg = 0;

setInterval(() => {

    
    if (bgSlides && bgSlides[currentBg]) {
        bgSlides[currentBg].classList.remove("active");
    }

    currentBg++;

    if(currentBg >= bgSlides.length){
        currentBg = 0;
    }

    // 🌟 2. Yeh line badal kar bhi 'if' laga de
    if (bgSlides && bgSlides[currentBg]) {
        bgSlides[currentBg].classList.add("active");
    }

}, 4000);
const themeToggle = document.getElementById("themeToggle");

if(themeToggle){

    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
        themeToggle.innerHTML = "☀️";
    }

    themeToggle.addEventListener("click", function(){

        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){
            localStorage.setItem("theme","dark");
            themeToggle.innerHTML = "☀️";
        }else{
            localStorage.setItem("theme","light");
            themeToggle.innerHTML = "🌙";
        }

    });

}
function closeVideo() {

    alert("Close clicked");

    const video = document.getElementById("promoVideo");

    video.pause();
    video.currentTime = 0;

    document.getElementById("floatingVideo").style.display = "none";
}

function toggleVideo() {

    const video = document.getElementById("promoVideo");

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
history.scrollRestoration = "auto";
function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}


document.addEventListener("DOMContentLoaded", () => {

    const preloadScreen =
        document.getElementById("vibrant-preload-screen");

    const pageLoader =
        document.getElementById("click-page-loader");

    // HOME PAGE LOADER
    if (preloadScreen) {

        setTimeout(() => {

            preloadScreen.classList.add("exit-active");

            setTimeout(() => {

                // preloadScreen.remove();

                document.body.classList.add("site-ready");

            }, 600);

        }, 1500);

    } else {

        document.body.classList.add("site-ready");
    }

    // PAGE TRANSITION LOADER
    const links = document.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", function(e) {

            const href = this.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                this.target === "_blank"
            ) {
                return;
            }

            e.preventDefault();

            if (pageLoader) {
                pageLoader.classList.add("active");
            }

            setTimeout(() => {
                window.location.href = href;
            }, 800);
        });

    });

});

window.addEventListener("load", () => {

    const preloader =
        document.getElementById("vibrant-preload-screen");

    if (!preloader) return;

    if (sessionStorage.getItem("homeLoaded")) {

        preloader.style.display = "none";
        document.body.classList.add("site-ready");

        return;
    }

    sessionStorage.setItem("homeLoaded", "true");

    setTimeout(() => {

        preloader.classList.add("exit-active");

        setTimeout(() => {

            document.body.classList.add("site-ready");

        }, 600);

    }, 1500);

});
// --- FORM SUBMIT TO NODE BACKEND ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#services-lead-form') || document.querySelector('form'); // Apne form ke hisab se selector dekh lena

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Form ke inputs se data uthaye (Ensure karna unme name attribute sahi ho)
            const formData = {
                name: form.querySelector('[name="name"]')?.value || form.querySelector('#lead-name')?.value,
                email: form.querySelector('[name="email"]')?.value || form.querySelector('#lead-email')?.value,
                service: form.querySelector('[name="service"]')?.value || form.querySelector('#lead-service')?.value,
                message: form.querySelector('[name="message"]')?.value || form.querySelector('#lead-message')?.value
            };

            try {
                // Backend endpoint hit kara port 5000 par
                const response = await fetch('http://127.0.0.1:5000/api/leads/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    alert('🎉 Lead Saved! Right Ads team will contact you soon.');
                    form.reset();
                } else {
                    alert('❌ Error: ' + result.message);
                }
            } catch (error) {
                console.error('Submission Error:', error);
                alert('Backend server band hai shayad, pehle terminal check kar bhai!');
            }
        });
    }
});
// --- WHATSAPP CLICK TRACKING LOGIC ---
// --- WHATSAPP CLICK TRACKING (ANTI-KILL VERSION) ---
document.addEventListener('DOMContentLoaded', () => {
    const whatsappButton = document.querySelector('.whatsapp-btn');

    if (whatsappButton) {
        whatsappButton.addEventListener('click', async function(e) {
            // 1. Pehle default transition ko roko taaki request kill na ho
            e.preventDefault(); 
            
            console.log('🔄 Click detected! Sending data to backend port 5000...');

            try {
                // 2. Backend ko hit karo aur wait karo (await)
                await fetch('http://127.0.0.1:5000/api/leads/track-whatsapp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('✅ Data successfully logged in MongoDB!');
            } catch (error) {
                console.error('❌ Network/Backend Error:', error);
            }

            // 3. Data send hone ke baad ab user ko WhatsApp par bhej do
            // Yeh wahi link uthayega jo tere HTML ke href mein dala hai (918377072990)
            const whatsappUrl = this.getAttribute('href');
            window.open(whatsappUrl, '_blank'); 
        });
    }
});