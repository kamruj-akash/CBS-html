$(document).ready(function () {
    // Mobile Menu Toggle: Toggles the visibility of the mobile navigation menu.
    $('#mobile-menu-button').on('click', function () {
        $('#mobile-menu').slideToggle(300);
    });

    // Smooth Scrolling for Navigation Links: Smoothly scrolls to the target section when a navigation link is clicked.
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault(); // Prevents the default jump behavior
        var target = $(this.hash); // Gets the target element based on the hash in the href
        if (target.length) {
            // Animate scroll to the target element, adjusting for fixed header height
            $('html, body').animate({
                scrollTop: target.offset().top - 70 // Adjust for fixed header height
            }, 800); // Animation duration in milliseconds

            // Close mobile menu after clicking a link, if it's open
            if ($('#mobile-menu').is(':visible')) {
                $('#mobile-menu').slideUp(300);
            }
        }
    });

    // Header Shrink/Shadow on Scroll: Adds a shadow and changes padding to the header when scrolling down.
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) { // If scrolled more than 50px from the top
            $('#main-header').addClass('shadow-lg py-3'); // Add shadow and smaller padding
            $('#main-header').removeClass('py-4'); // Remove larger padding
        } else {
            $('#main-header').removeClass('shadow-lg py-3'); // Remove shadow and smaller padding
            $('#main-header').addClass('py-4'); // Add larger padding
        }
    });

    // Intersection Observer for Animations: Triggers CSS animations when elements come into view.
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // If the element is currently in view
                entry.target.classList.add('appear'); // Add 'appear' class to trigger animation
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is in view
    });

    // Apply animations to elements with specific classes
    $('.fade-in, .scale-in, .slide-in-left, .slide-in-right, .fade-in-delay').each(function () {
        observer.observe(this); // Observe each element
    });

    // Back to Top Button: Shows/hides a button to scroll back to the top of the page.
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) { // Show button after scrolling 300px
            $('#back-to-top').removeClass('opacity-0 invisible').addClass('opacity-100 visible');
        } else {
            $('#back-to-top').removeClass('opacity-100 visible').addClass('opacity-0 invisible');
        }
    });

    // Back to Top Button Click Handler: Smoothly scrolls to the top of the page.
    $('#back-to-top').on('click', function (e) {
        e.preventDefault(); // Prevent default link behavior
        $('html, body').animate({
            scrollTop: 0
        }, 800); // Smooth scroll to top in 800ms
    });


    // Testimonial Carousel: Manages the automatic and manual navigation of testimonials.
    let currentTestimonial = 0;
    const testimonials = $('#testimonial-carousel').children();
    const totalTestimonials = testimonials.length;
    const testimonialDots = $('#testimonial-dots button');

    function showTestimonial(index) {
        // Translate the carousel to show the correct testimonial
        $('#testimonial-carousel').css('transform', `translateX(-${index * 100}%)`);
        // Update active dot styling
        testimonialDots.removeClass('current-testimonial');
        $(testimonialDots[index]).addClass('current-testimonial');
    }

    // Initial display of the first testimonial
    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);

        // Auto-advance testimonials every 7 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials; // Cycle through testimonials
            showTestimonial(currentTestimonial);
        }, 7000); // Change testimonial every 7 seconds

        // Navigation dots functionality: Change testimonial when a dot is clicked.
        testimonialDots.on('click', function () {
            const index = $(this).index(); // Get the index of the clicked dot
            currentTestimonial = index; // Set current testimonial to that index
            showTestimonial(currentTestimonial);
        });
    }

    // FAQ Accordion: Toggles the visibility of FAQ answers and rotates an icon.
    $('.faq-question').on('click', function () {
        const $parent = $(this).closest('.faq-item'); // Get the parent FAQ item
        const $answer = $parent.find('.faq-answer'); // Get the answer element
        const $svg = $(this).find('svg'); // Get the SVG icon

        // Toggle the answer visibility with a slide animation
        $answer.slideToggle(300);

        // Rotate the SVG icon for visual feedback
        $svg.toggleClass('rotate-180');

        // Optional: Close other open FAQs when one is opened
        $('.faq-item').not($parent).find('.faq-answer').slideUp(300);
        $('.faq-item').not($parent).find('.faq-question svg').removeClass('rotate-180');
    });


    // Contact Form Submission and Validation (Updated with Local Storage and Unique ID)
    $('#contact-form').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Clear previous error messages and styling
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
        if (message.length < 10) {
            $('#message-error').removeClass('hidden').text('Message must be at least 10 characters long.');
            $('#message').removeClass('border-gray-300').addClass('border-red-500');
            isValid = false;
        }

        if (isValid) {
            // Save submission to Local Storage
            const submission = {
                id: Date.now(), // Unique ID for individual deletion
                name: name,
                email: email,
                phone: $('#phone').val().trim(),
                message: message,
                submittedAt: new Date().toLocaleString('en-AU')
            };

            // Get existing submissions or create a new array
            let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
            // Add the new submission
            submissions.push(submission);
            // Save the updated array back to Local Storage
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));


            // Show a custom success message
            const successMessage = $('<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">' +
                '<div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto">' +
                '<p class="text-xl font-semibold text-green-600 mb-4">Success!</p>' +
                '<p class="text-lightText">Thank you for your inquiry! We will get back to you soon.</p>' +
                '<button id="close-modal" class="mt-6 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark">Close</button>' +
                '</div></div>');
            $('body').append(successMessage);

            $('#close-modal').on('click', function () {
                successMessage.remove();
            });

            this.reset(); // Clear the form after submission
        }
    });


    // Eligibility Quiz Logic (Updated with Local Storage and Unique ID)
    $('#eligibility-form').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Get form values
        const years = $('#experience-years').val();
        const qualification = $('#qualification-type').val().trim();
        const status = $('input[name="current-status"]:checked').val();
        const resultsDiv = $('#eligibility-results');

        // Clear previous results and error messages
        resultsDiv.addClass('hidden').empty(); // Hide and clear content of results div
        $('.text-red-500', this).addClass('hidden'); // Hide all errors within the form
        $('select, input[type="text"], input[type="radio"]', this).removeClass('border-red-500');

        let isValid = true;

        // Perform validation for each field
        if (years === "") {
            $('#experience-years-error').removeClass('hidden');
            $('#experience-years').addClass('border-red-500');
            isValid = false;
        }
        if (qualification === "") {
            $('#qualification-type-error').removeClass('hidden');
            $('#qualification-type').addClass('border-red-500');
            isValid = false;
        }
        if (status === undefined) {
            $('#current-status-error').removeClass('hidden');
            isValid = false;
        }

        if (!isValid) {
            resultsDiv.removeClass('hidden').html('<p class="text-red-600">Please answer all highlighted questions.</p>');
            return;
        }

        // Save submission to Local Storage
        const submission = {
            id: Date.now(), // Unique ID for individual deletion
            years: years,
            qualification: qualification,
            status: status,
            submittedAt: new Date().toLocaleString('en-AU')
        };

        let submissions = JSON.parse(localStorage.getItem('quizSubmissions')) || [];
        submissions.push(submission);
        localStorage.setItem('quizSubmissions', JSON.stringify(submissions));

        // Determine eligibility and display the message
        let message = "";
        if (years === "5+" && status === "no" && qualification.length > 5) {
            message = "Great news! Based on your input, you likely qualify for RPL. We recommend a free consultation to confirm!";
            resultsDiv.addClass('text-green-600').removeClass('text-orange-600');
        } else {
            message = "You might be eligible! Your experience is a good starting point. Let's discuss further in a consultation.";
            resultsDiv.addClass('text-orange-600').removeClass('text-green-600');
        }

        // Display the message
        resultsDiv.html('<p>' + message + '</p>').removeClass('hidden');

        // Provide a strong call to action
        resultsDiv.append('<div class="mt-4">' +
            '<a href="contact.html" class="btn-primary bg-primary text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl">' +
            'Get Free Consultation' +
            '</a>' +
            '</div>');
    });

}); // End of document.ready