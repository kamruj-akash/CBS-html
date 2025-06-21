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
    
});

// Back to Top Button
$(window).scroll(function () {
    if ($(this).scrollTop() > 300) { // Show button after scrolling 300px
        $('#back-to-top').removeClass('opacity-0 invisible').addClass('opacity-100 visible');
    } else {
        $('#back-to-top').removeClass('opacity-100 visible').addClass('opacity-0 invisible');
    }
});

$('#back-to-top').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 800);
});


// Testimonial Carousel
let currentTestimonial = 0;
const testimonials = $('#testimonial-carousel').children();
const totalTestimonials = testimonials.length;
const testimonialDots = $('#testimonial-dots button');

function showTestimonial(index) {
    $('#testimonial-carousel').css('transform', `translateX(-${index * 100}%)`);
    testimonialDots.removeClass('current-testimonial');
    $(testimonialDots[index]).addClass('current-testimonial');
}

// Initial display
showTestimonial(currentTestimonial);

// Auto-advance
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}, 7000); // Change testimonial every 7 seconds

// Navigation dots functionality
testimonialDots.on('click', function () {
    const index = $(this).index();
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
});

// FAQ Accordion
$('.faq-question').on('click', function () {
    const $parent = $(this).closest('.faq-item');
    const $answer = $parent.find('.faq-answer');
    const $svg = $(this).find('svg');

    // Toggle the answer visibility
    $answer.slideToggle(300);

    // Rotate the SVG icon
    $svg.toggleClass('rotate-180');

    // Optional: Close other open FAQs
    $('.faq-item').not($parent).find('.faq-answer').slideUp(300).removeClass('open');
    $('.faq-item').not($parent).find('.faq-question svg').removeClass('rotate-180');
});


// Example for form submission (replace with actual backend logic)
$('#contact-form').on('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    let isValid = true;

    // Clear previous errors
    $('.text-red-500').addClass('hidden');
    $('input, textarea').removeClass('border-red-500').addClass('border-gray-300');

    // Validate Name
    const name = $('#name').val().trim();
    if (name === '') {
        $('#name-error').removeClass('hidden');
        $('#name').removeClass('border-gray-300').addClass('border-red-500');
        isValid = false;
    }

    // Validate Email
    const email = $('#email').val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailRegex.test(email)) {
        $('#email-error').removeClass('hidden').text('Please enter a valid email address.');
        $('#email').removeClass('border-gray-300').addClass('border-red-500');
        isValid = false;
    }

    // Validate Message
    const message = $('#message').val().trim();
    if (message.length < 10) { // Example: require at least 10 characters
        $('#message-error').removeClass('hidden').text('Message must be at least 10 characters long.');
        $('#message').removeClass('border-gray-300').addClass('border-red-500');
        isValid = false;
    }

    if (isValid) {
        // If all validations pass
        alert('Thank you for your inquiry! We will get back to you soon.');
        // You would typically send this data to a backend server using AJAX here
        // e.g., $.post('your-backend-api-endpoint', $(this).serialize(), function(response){ ... });
        this.reset(); // Clear the form after submission
    }
});