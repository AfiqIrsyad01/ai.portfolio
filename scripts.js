// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent smooth scroll for internal hash links within the same page
            if (this.getAttribute('href').startsWith('#') && this.pathname === window.location.pathname) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Real-time Clock and Date (Malaysia/Kuala Lumpur Timezone)
    function updateDateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kuala_Lumpur',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const timeString = now.toLocaleTimeString('en-US', options);

        const dateOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        const dateString = now.toLocaleDateString('en-GB', dateOptions);

        const datetimeElement = document.getElementById('datetime');
        if (datetimeElement) {
            datetimeElement.textContent = `Time: ${timeString} | Date: ${dateString}`;
        }
    }

    // Update time every second
    setInterval(updateDateTime, 1000);
    // Initial call to display time immediately
    updateDateTime();

    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Animate.css on scroll with Intersection Observer
    const animateElements = document.querySelectorAll('.animate__animated:not(.header-element):not(.hero-element)');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find the original animation class to re-add it
                const animationClass = entry.target.getAttribute('data-animation-class');
                if (animationClass) {
                    entry.target.style.visibility = 'visible'; // Make visible
                    entry.target.classList.add(animationClass);
                    // Add a class to ensure it only animates once
                    entry.target.classList.add('animated-once');
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animateElements.forEach(element => {
        // Store the animation class before removing it for initial hidden state
        const animationClass = Array.from(element.classList).find(cls => cls.startsWith('animate__') && !cls.includes('animated'));
        if (animationClass) {
            element.setAttribute('data-animation-class', animationClass);
            element.classList.remove(animationClass); // Remove to hide initially
        }
        element.style.opacity = '0'; // Hide using opacity
        element.style.visibility = 'hidden'; // Hide fully
        observer.observe(element);
    });

    // Ensure header and hero elements are visible from start
    document.querySelectorAll('.header-element, .hero-element').forEach(element => {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
    });

    // Contact Card Flip Functionality
    document.querySelectorAll('.flip-button').forEach(button => {
        button.addEventListener('click', function() {
            const cardInner = this.closest('.contact-card-inner');
            if (cardInner) {
                cardInner.classList.toggle('is-flipped');
            }
        });
    });
});