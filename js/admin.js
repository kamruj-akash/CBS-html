$(document).ready(function () {
    // Function to load and display contact form submissions
    function loadContactSubmissions() {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
        const tableBody = $('#contact-table tbody');
        tableBody.empty(); // Clear existing rows

        if (submissions.length === 0) {
            $('#no-contact-data').removeClass('hidden');
            $('#contact-table').addClass('hidden');
        } else {
            $('#no-contact-data').addClass('hidden');
            $('#contact-table').removeClass('hidden');

            // Sort by latest submission first
            submissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

            submissions.forEach(sub => {
                const row = `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${sub.submittedAt}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sub.name}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${sub.email}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${sub.phone || 'N/A'}</td>
                        <td class="px-6 py-4 text-sm text-gray-700">${sub.message}</td>
                    </tr>
                `;
                tableBody.append(row);
            });
        }
    }

    // Function to load and display eligibility quiz submissions
    function loadQuizSubmissions() {
        const submissions = JSON.parse(localStorage.getItem('quizSubmissions')) || [];
        const tableBody = $('#quiz-table tbody');
        tableBody.empty();

        if (submissions.length === 0) {
            $('#no-quiz-data').removeClass('hidden');
            $('#quiz-table').addClass('hidden');
        } else {
            $('#no-quiz-data').addClass('hidden');
            $('#quiz-table').removeClass('hidden');

            // Sort by latest submission first
            submissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

            submissions.forEach(sub => {
                const row = `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${sub.submittedAt}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sub.years}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${sub.qualification}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${sub.status}</td>
                    </tr>
                `;
                tableBody.append(row);
            });
        }
    }

    // Event listener for clearing contact data
    $('#clear-contact').on('click', function () {
        if (confirm('Are you sure you want to delete all contact submissions? This cannot be undone.')) {
            localStorage.removeItem('contactSubmissions');
            loadContactSubmissions(); // Refresh the table
        }
    });

    // Event listener for clearing quiz data
    $('#clear-quiz').on('click', function () {
        if (confirm('Are you sure you want to delete all quiz submissions? This cannot be undone.')) {
            localStorage.removeItem('quizSubmissions');
            loadQuizSubmissions(); // Refresh the table
        }
    });

    // Initial load of data when the page is ready
    loadContactSubmissions();
    loadQuizSubmissions();
});