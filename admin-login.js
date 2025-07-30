// Admin Login JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginAlert = document.getElementById('loginAlert');
    const alertMessage = document.getElementById('alertMessage');

    // Demo credentials
    const validCredentials = {
        email: 'admin@hexaware.com',
        password: 'admin123'
    };

    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = togglePasswordBtn.querySelector('i');
        icon.className = type === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
    });

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const spinner = submitBtn.querySelector('.login-spinner');
        const buttonText = submitBtn.innerHTML;
        
        spinner.classList.remove('d-none');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            Signing in...
        `;

        // Simulate API call delay
        setTimeout(() => {
            if (email === validCredentials.email && password === validCredentials.password) {
                // Successful login
                showAlert('Login successful! Redirecting...', 'success');
                
                // Store login state
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminEmail', email);
                
                // Redirect to admin dashboard
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1500);
            } else {
                // Failed login
                showAlert('Invalid email or password. Please try again.', 'danger');
                
                // Reset form state
                spinner.classList.add('d-none');
                submitBtn.disabled = false;
                submitBtn.innerHTML = buttonText;
                
                // Focus on email field
                emailInput.focus();
            }
        }, 1500);
    });

    // Show alert function
    function showAlert(message, type) {
        alertMessage.textContent = message;
        loginAlert.className = `alert alert-${type}`;
        loginAlert.classList.remove('d-none');
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                loginAlert.classList.add('d-none');
            }, 3000);
        }
    }

    // Reset password function
    window.resetPassword = function() {
        const resetEmail = document.getElementById('resetEmail').value.trim();
        
        if (!resetEmail) {
            alert('Please enter your email address.');
            return;
        }
        
        if (!isValidEmail(resetEmail)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate sending reset email
        showAlert(`Password reset link has been sent to ${resetEmail}`, 'info');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
        modal.hide();
        
        // Reset form
        document.getElementById('forgotPasswordForm').reset();
    };

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Auto-fill demo credentials on page load for demonstration
    emailInput.value = validCredentials.email;
    passwordInput.value = validCredentials.password;

    // Add input validation
    emailInput.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            this.classList.remove('is-invalid');
        }
    });
});