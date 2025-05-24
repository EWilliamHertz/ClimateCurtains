// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Back to Top Button
    const backToTopButton = document.createElement('div');
    backToTopButton.classList.add('back-to-top');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Check required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Create error message if it doesn't exist
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                    
                    // Email validation
                    if (field.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(field.value)) {
                            isValid = false;
                            field.classList.add('error');
                            
                            // Create error message for email
                            let emailError = field.nextElementSibling;
                            if (!emailError || !emailError.classList.contains('error-message')) {
                                emailError = document.createElement('div');
                                emailError.classList.add('error-message');
                                emailError.textContent = 'Please enter a valid email address';
                                field.parentNode.insertBefore(emailError, field.nextSibling);
                            }
                        }
                    }
                }
            });
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    });
    
    // Read More Toggle for Blog Posts
    const readMoreButtons = document.querySelectorAll('.read-more-toggle');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.previousElementSibling;
            content.classList.toggle('expanded');
            
            if (content.classList.contains('expanded')) {
                this.textContent = 'Read Less';
            } else {
                this.textContent = 'Read More';
            }
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuLength = navLinks.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (navLinks[i].getAttribute('href') === currentLocation || 
            navLinks[i].getAttribute('href') === currentLocation.substring(currentLocation.lastIndexOf('/') + 1)) {
            navLinks[i].classList.add('active');
        } else if (currentLocation === '/' || currentLocation === '/index.html') {
            // Add active class to Home link when on homepage
            if (navLinks[i].getAttribute('href') === 'index.html' || navLinks[i].getAttribute('href') === './') {
                navLinks[i].classList.add('active');
            }
        }
    }
    
    // Accessibility: Add focus styles that match hover styles
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
});
