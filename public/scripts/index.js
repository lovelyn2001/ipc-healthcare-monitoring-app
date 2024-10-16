// index.js

document.addEventListener('DOMContentLoaded', () => {
    const patientBtn = document.getElementById('patient-btn');
    const practitionerBtn = document.getElementById('practitioner-btn');
    const redirectMsg = document.getElementById('redirect-msg');

    // Redirect to patient registration/login
    patientBtn.addEventListener('click', () => {
        redirectMsg.style.display = 'block';
        redirectMsg.textContent = 'Redirecting to Patient Login/Registration...';
        setTimeout(() => {
            window.location.href = '/register';  // Redirect to patient registration
        }, 1000);
    });

    // Redirect to practitioner login
    practitionerBtn.addEventListener('click', () => {
        redirectMsg.style.display = 'block';
        redirectMsg.textContent = 'Redirecting to Practitioner Login...';
        setTimeout(() => {
            window.location.href = '/practitioner-login';  // Redirect to practitioner login
        }, 1000);
    });
});
