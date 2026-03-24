document.addEventListener('DOMContentLoaded', function() {
    // Cookie Consent Functionality
    const cookieConsent = document.getElementById('cookieConsent');
    const allowAllBtn = document.getElementById('allowAllCookies');
    const allowSelectionBtn = document.getElementById('allowSelectionCookies');
    const denyAllBtn = document.getElementById('denyAllCookies');

    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            if (cookieConsent) {
                cookieConsent.classList.add('show');
            }
        }, 1000);
    }

    function setCookieConsent(preferences) {
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        if (cookieConsent) {
            cookieConsent.classList.remove('show');
        }
        
        // Here you can add code to actually set/remove cookies based on preferences
        console.log('Cookie preferences saved:', preferences);
    }

    if (allowAllBtn) {
        allowAllBtn.addEventListener('click', function() {
            setCookieConsent({
                necessary: true,
                preferences: true,
                statistics: true,
                marketing: true
            });
        });
    }

    if (allowSelectionBtn) {
        allowSelectionBtn.addEventListener('click', function() {
            const preferences = document.getElementById('cookiePreferences').checked;
            const statistics = document.getElementById('cookieStatistics').checked;
            const marketing = document.getElementById('cookieMarketing').checked;
            
            setCookieConsent({
                necessary: true,
                preferences: preferences,
                statistics: statistics,
                marketing: marketing
            });
        });
    }

    if (denyAllBtn) {
        denyAllBtn.addEventListener('click', function() {
            setCookieConsent({
                necessary: true,
                preferences: false,
                statistics: false,
                marketing: false
            });
        });
    }


    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const textSlides = document.querySelectorAll('.hero-text-slide');
    const totalSlides = slides.length;

    function changeSlide() {
        slides[currentSlide].classList.remove('active');
        textSlides[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % totalSlides;
        
        slides[currentSlide].classList.add('active');
        textSlides[currentSlide].classList.add('active');
    }

    if (slides.length > 0 && textSlides.length > 0) {
        setInterval(changeSlide, 5000);
    }

    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMenu() {
        sideMenu.classList.add('active');
        menuOverlay.classList.add('active');
        hamburgerMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenuFunc() {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            if (sideMenu.classList.contains('active')) {
                closeMenuFunc();
            } else {
                openMenu();
            }
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', closeMenuFunc);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenuFunc);
    }

    const sideMenuLinks = document.querySelectorAll('.side-menu-nav a');
    sideMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenuFunc();
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            console.log('Form submitted:', data);

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    
                    alert('Thank you for your message! We will get back to you within 24 hours.');
                }, 1500);
            }, 1500);
        });
    }

    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.value-card, .team-member, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Apply animation when element gets 'animated' class
    const animationObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('animated')) {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }
            }
        });
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el, { attributes: true });
    });

    const serviceCards = document.querySelectorAll('.service-detail-card.animate-on-scroll');
    const serviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    serviceCards.forEach(card => {
        serviceObserver.observe(card);
    });

    // User type toggle for contact form
    const contractorType = document.getElementById('contractorType');
    const agencyType = document.getElementById('agencyType');
    const contractorFields = document.getElementById('contractorFields');
    const agencyFields = document.getElementById('agencyFields');
    const companyField = document.getElementById('company');

    function toggleUserTypeFields() {
        if (contractorType && contractorType.checked) {
            if (contractorFields) contractorFields.style.display = 'block';
            if (agencyFields) agencyFields.style.display = 'none';
            if (companyField) companyField.removeAttribute('required');
        } else if (agencyType && agencyType.checked) {
            if (contractorFields) contractorFields.style.display = 'none';
            if (agencyFields) agencyFields.style.display = 'block';
            if (companyField) companyField.setAttribute('required', 'required');
        }
    }

    if (contractorType) {
        contractorType.addEventListener('change', toggleUserTypeFields);
    }

    if (agencyType) {
        agencyType.addEventListener('change', toggleUserTypeFields);
    }

    // Initialize on page load
    toggleUserTypeFields();

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact Form Submission via Zapier Webhook
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Collect form data
            const formData = {
                userType: document.querySelector('input[name="userType"]:checked')?.value || '',
                firstName: document.getElementById('firstName')?.value || '',
                lastName: document.getElementById('lastName')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                company: document.getElementById('company')?.value || '',
                employees: document.getElementById('employees')?.value || '',
                service: document.getElementById('service')?.value || '',
                rateOfPay: document.getElementById('rateOfPay')?.value || '',
                message: document.getElementById('message')?.value || '',
                timestamp: new Date().toISOString(),
                source: 'PaySide Solutions Website'
            };
            
            try {
                // Replace this URL with your Zapier webhook URL
                const zapierWebhookUrl = 'YOUR_ZAPIER_WEBHOOK_URL_HERE';
                
                const response = await fetch(zapierWebhookUrl, {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
                
                if (response.ok || response.status === 200) {
                    // Redirect to thank you page
                    window.location.href = '/thank-you.html';
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error sending your message. Please try again or email us directly at support@paysidesolutions.com');
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
