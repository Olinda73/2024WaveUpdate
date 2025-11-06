const form = document.getElementsById('subscription-form');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value;
    if (validateEmail(email)) {
        messageDiv.textContent = "Thank you for subscribing!";
        messageDiv.style.color = "green";
        form.reset();
    } else {
        messageDiv.textContent = "Please enter a valid email address.";
        messageDiv.style.color = "red";
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}       