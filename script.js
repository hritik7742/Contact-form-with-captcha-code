// Variables
const form = document.getElementById('contact-form');
const captchaContainer = document.getElementById('captcha-container');
const captchaInput = document.getElementById('captcha-input');
const captchaMessage = document.getElementById('captcha-message');

// Generate CAPTCHA
function generateCaptcha() {
    const captchaText = generateRandomText();
    const captchaElement = document.createElement('p');
    captchaElement.textContent = captchaText;
    captchaContainer.appendChild(captchaElement);

    // Store the CAPTCHA value as a data attribute for later verification
    captchaElement.dataset.captchaValue = captchaText;
}

// Function to generate random CAPTCHA text
function generateRandomText() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaText = '';

    for (let i = 0; i < 6; i++) {
        captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return captchaText;
}

// Validate CAPTCHA
function validateCaptcha(captchaValue) {
    const captchaElement = document.querySelector('#captcha-container p');

    if (captchaElement && captchaElement.dataset.captchaValue === captchaValue) {
        return true;
    }

    return false;
}

// Add event listener to the form
form.addEventListener('submit', submitForm);

// Function to handle form submission
function submitForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const captchaValue = captchaInput.value.trim();
    const isValidCaptcha = validateCaptcha(captchaValue);

    if (name !== '' && email !== '' && message !== '') {
        if (isValidCaptcha) {
            // Process the form submission, e.g., send the data to the server
            // You can use AJAX or fetch to send a request to the server-side script

            // Reset the form after submission
            form.reset();

            // Regenerate CAPTCHA
            captchaContainer.innerHTML = '';
            generateCaptcha();

            showCaptchaMessage(true);
        } else {
            showCaptchaMessage(false);
        }
    } else {
        alert('Please fill in all the fields.');
    }
}

// Function to show CAPTCHA message
function showCaptchaMessage(isCorrect) {
    if (isCorrect) {
        captchaMessage.textContent = 'CAPTCHA is correct. Form submitted successfully!';
        captchaMessage.style.color = 'green';
    } else {
        captchaMessage.textContent = 'Incorrect CAPTCHA code. Please try again.';
        captchaMessage.style.color = 'red';
    }
}

// Generate initial CAPTCHA on page load
generateCaptcha();
