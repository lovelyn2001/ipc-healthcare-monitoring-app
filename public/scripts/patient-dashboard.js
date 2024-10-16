// patient-dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const successMessageDiv = document.getElementById('success-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();  // Prevent the default form submission
        
        const formData = new FormData(form);  // Collect form data
        const patientId = form.getAttribute('action').split('/').pop(); // Extract patient ID from form action

        try {
            const response = await fetch(`/dashboard/${patientId}`, {
                method: 'POST',
                body: new URLSearchParams(formData),  // Serialize form data for POST
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.ok) {
                // Show success message
                successMessageDiv.textContent = 'Your record has been successfully saved!';
                successMessageDiv.style.color = 'green';
                alert("Your record has been successfully saved!");
                // Clear form fields after successful submission
                form.reset();

                // Optionally, reload the form to show the plus sign for adding a new record
                setTimeout(() => {
                    location.reload(); // Refreshes the page after 2 seconds
                }, 2000);
            } else {
                throw new Error('Failed to save record.');
            }
        } catch (error) {
            console.error('Error:', error);
            successMessageDiv.textContent = 'There was an error saving your record. Please try again.';
            successMessageDiv.style.color = 'red';
        }
    });
});
