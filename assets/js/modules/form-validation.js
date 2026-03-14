/**
 * AgriWeb - Form Validation Module
 * Sends all forms to WhatsApp
 */

// Your WhatsApp number
var WHATSAPP_NUMBER = '919876543210';

// Wait for page to load
document.addEventListener('DOMContentLoaded', function () {

    // Contact Form
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = contactForm.querySelector('[name="name"]');
            var phone = contactForm.querySelector('[name="phone"]');
            var email = contactForm.querySelector('[name="email"]');
            var subject = contactForm.querySelector('[name="subject"]');
            var message = contactForm.querySelector('[name="message"]');

            // Basic validation
            var errors = [];
            if (!name || !name.value.trim()) errors.push('Name is required');
            if (!phone || !phone.value.trim()) errors.push('Phone is required');
            if (!email || !email.value.trim()) errors.push('Email is required');
            if (!message || !message.value.trim()) errors.push('Message is required');

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            // Build message
            var msg = 'NEW CONTACT INQUIRY\n';
            msg += '-------------------\n\n';
            msg += 'Name: ' + name.value + '\n';
            msg += 'Phone: ' + phone.value + '\n';
            msg += 'Email: ' + email.value + '\n';
            if (subject && subject.value) msg += 'Subject: ' + subject.value + '\n';
            msg += 'Message: ' + message.value + '\n';
            msg += '\n-------------------\n';
            msg += 'Sent from website';

            // Send to WhatsApp
            var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
            window.location.href = url;
        });
    }

    // Distributor Form
    var distributorForm = document.getElementById('distributor-form');
    if (distributorForm) {
        distributorForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var formData = new FormData(distributorForm);
            var msg = 'NEW DISTRIBUTOR APPLICATION\n';
            msg += '----------------------------\n\n';

            formData.forEach(function (value, key) {
                if (value && value.trim()) {
                    msg += key.charAt(0).toUpperCase() + key.slice(1) + ': ' + value + '\n';
                }
            });

            msg += '\n----------------------------\n';
            msg += 'Sent from website';

            var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
            window.location.href = url;
        });
    }

    // Newsletter Forms
    var newsletterForms = document.querySelectorAll('.newsletter-form, [id*="newsletter"]');
    newsletterForms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var emailInput = form.querySelector('input[type="email"]');
            if (!emailInput || !emailInput.value.trim()) {
                alert('Please enter your email');
                return;
            }

            var msg = 'NEWSLETTER SUBSCRIPTION\n';
            msg += '-----------------------\n\n';
            msg += 'Email: ' + emailInput.value + '\n';
            msg += '\n-----------------------\n';
            msg += 'Sent from website';

            var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
            window.location.href = url;
        });
    });

    // Any other forms with class 'whatsapp-form'
    var otherForms = document.querySelectorAll('.whatsapp-form');
    otherForms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var formData = new FormData(form);
            var msg = 'FORM SUBMISSION\n';
            msg += '---------------\n\n';

            formData.forEach(function (value, key) {
                if (value && value.trim()) {
                    msg += key + ': ' + value + '\n';
                }
            });

            msg += '\n---------------\n';
            msg += 'Sent from website';

            var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
            window.location.href = url;
        });
    });
});
