$(document).ready(function () {
    // Mobile Menu Toggle
    $('#mobile-menu-button').on('click', function () {
        $('#mobile-menu').slideToggle(300);
    });

    // Smooth Scrolling for Navigation Links
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70 // Adjust for fixed header height
            }, 800);
            // Close mobile menu after clicking a link
            if ($('#mobile-menu').is(':visible')) {
                $('#mobile-menu').slideUp(300);
            }
        }
    });

    // Header Shrink/Shadow on Scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#main-header').addClass('shadow-lg py-3');
            $('#main-header').removeClass('py-4');
        } else {
            $('#main-header').removeClass('shadow-lg py-3');
            $('#main-header').addClass('py-4');
        }
    });

    // Intersection Observer for Animations (Fade-in, Scale-in etc.)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // observer.unobserve(entry.target); // Optional: Stop observing once animated if you only want it to animate once
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is in view
    });

    // Apply animations to elements
    $('.fade-in, .scale-in, .slide-in-left, .slide-in-right, .fade-in-delay').each(function () {
        observer.observe(this);
    });

    // Example for form submission (replace with actual backend logic)
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your inquiry! We will get back to you soon.');
        // You would typically send this data to a backend server using AJAX here
        // e.g., $.post('your-backend-api-endpoint', $(this).serialize(), function(response){ ... });
        this.reset(); // Clear the form after submission
    });
});