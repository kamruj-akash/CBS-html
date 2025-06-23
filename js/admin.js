$(document).ready(function () {
    const CORRECT_PASSWORD = "admin"; // এখানে আপনার পছন্দমতো পাসওয়ার্ড দিন
    const SESSION_KEY = 'admin-logged-in';

    // Function to show/hide content based on login status
    function checkLoginStatus() {
        if (sessionStorage.getItem(SESSION_KEY) === 'true') {
            $('#login-modal').addClass('hidden');
            $('#admin-content').removeClass('hidden');
            loadAllData();
        } else {
            $('#login-modal').removeClass('hidden');
            $('#admin-content').addClass('hidden');
        }
    }

    // Handle login form submission
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        const password = $('#password').val();
        if (password === CORRECT_PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            checkLoginStatus();
        } else {
            $('#login-error').removeClass('hidden');
        }
    });

    // Handle logout
    $('#logout-button').on('click', function () {
        sessionStorage.removeItem(SESSION_KEY);
        checkLoginStatus();
    });


    // Function to load all data
    function loadAllData() {
        loadContactSubmissions();
        loadQuizSubmissions();
    }

    // Load contact submissions
    function loadContactSubmissions() {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
        const tableBody = $('#contact-table tbody');
        tableBody.empty();

        if (submissions.length === 0) {
            $('#no-contact-data').removeClass('hidden');
            $('#contact-table').parent().addClass('hidden');
        } else {
            $('#no-contact-data').addClass('hidden');
            $('#contact-table').parent().removeClass('hidden');
            submissions.sort((a, b) => b.id - a.id); // Sort by latest first
            submissions.forEach(sub => {
                const row = `
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-4 text-sm text-gray-700">${sub.submittedAt}</td>
                        <td class="px-4 py-4 text-sm text-gray-900 font-medium">${sub.name}</td>
                        <td class="px-4 py-4 text-sm text-gray-700">${sub.email}</td>
                        <td class="px-4 py-4 text-sm text-gray-700 max-w-xs truncate" title="${sub.message}">${sub.message}</td>
                        <td class="px-4 py-4 text-sm">
                            <button class="delete-contact-btn text-red-500 hover:text-red-700" data-id="${sub.id}" title="Delete">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `;
                tableBody.append(row);
            });
        }
    }

    // Load quiz submissions
    function loadQuizSubmissions() {
        const submissions = JSON.parse(localStorage.getItem('quizSubmissions')) || [];
        const tableBody = $('#quiz-table tbody');
        tableBody.empty();

        if (submissions.length === 0) {
            $('#no-quiz-data').removeClass('hidden');
            $('#quiz-table').parent().addClass('hidden');
        } else {
            $('#no-quiz-data').addClass('hidden');
            $('#quiz-table').parent().removeClass('hidden');
            submissions.sort((a, b) => b.id - a.id); // Sort by latest first
            submissions.forEach(sub => {
                const row = `
                     <tr class="hover:bg-gray-50">
                        <td class="px-4 py-4 text-sm text-gray-700">${sub.submittedAt}</td>
                        <td class="px-4 py-4 text-sm text-gray-900 font-medium">${sub.years}</td>
                        <td class="px-4 py-4 text-sm text-gray-700">${sub.qualification}</td>
                        <td class="px-4 py-4 text-sm text-gray-700">${sub.status}</td>
                        <td class="px-4 py-4 text-sm">
                            <button class="delete-quiz-btn text-red-500 hover:text-red-700" data-id="${sub.id}" title="Delete">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                `;
                tableBody.append(row);
            });
        }
    }

    // Delegated event for deleting individual contact submission
    $('#contact-table').on('click', '.delete-contact-btn', function () {
        const idToDelete = $(this).data('id');
        let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
        const updatedSubmissions = submissions.filter(sub => sub.id !== idToDelete);
        localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));
        loadContactSubmissions();
    });

    // Delegated event for deleting individual quiz submission
    $('#quiz-table').on('click', '.delete-quiz-btn', function () {
        const idToDelete = $(this).data('id');
        let submissions = JSON.parse(localStorage.getItem('quizSubmissions')) || [];
        const updatedSubmissions = submissions.filter(sub => sub.id !== idToDelete);
        localStorage.setItem('quizSubmissions', JSON.stringify(updatedSubmissions));
        loadQuizSubmissions();
    });

    // Clear all contact data
    $('#clear-contact').on('click', function () {
        if (confirm('Are you sure you want to delete ALL contact submissions?')) {
            localStorage.removeItem('contactSubmissions');
            loadContactSubmissions();
        }
    });

    // Clear all quiz data
    $('#clear-quiz').on('click', function () {
        if (confirm('Are you sure you want to delete ALL quiz submissions?')) {
            localStorage.removeItem('quizSubmissions');
            loadQuizSubmissions();
        }
    });

    // Initial check on page load
    checkLoginStatus();
});