// Wave Vendors Contact Form Handler
// Connects to Google Sheets via Apps Script

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            timestamp: new Date().toLocaleString()
        };
        
        // Validate form
        if (!data.name || !data.email || !data.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Send to Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbxxQRcSwTaufxwA_LJ5PguaRceAMlZaSu9vpafMav4zDs3t7JOwev7ydZFiBdFe0Ft1/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                showMessage('There was an error sending your message. Please try again.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('There was an error sending your message. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    });
    
    function showMessage(message, type) {
        const messageDiv = document.getElementById('contact-message') || createMessageDiv();
        messageDiv.textContent = message;
        messageDiv.className = 'form-message ' + type;
        messageDiv.style.display = 'block';
        
        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
    
    function createMessageDiv() {
        const messageDiv = document.createElement('div');
        messageDiv.id = 'contact-message';
        const formContent = document.querySelector('.form-content');
        formContent.insertBefore(messageDiv, formContent.firstChild);
        return messageDiv;
    }
});
