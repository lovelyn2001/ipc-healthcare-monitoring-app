// login.js

// Function to validate login form
function validateLoginForm() {
  const name = document.querySelector('input[name="name"]').value;
  const phone = document.querySelector('input[name="phone"]').value;

  if (!name || !phone) {
      alert("Please fill in both fields.");
      return false;
  }
  return true;
}

// Attach event listener to the login form
document.querySelector('form').addEventListener('submit', function(event) {
  if (!validateLoginForm()) {
      event.preventDefault(); // Prevent form submission if validation fails
  }
});
