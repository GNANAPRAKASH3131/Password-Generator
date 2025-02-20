// Toggle password visibility
function togglePassword() {
    let passwordInput = document.getElementById("password");
    let toggleIcon = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.textContent = "🙈"; // Change icon to hide
    } else {
        passwordInput.type = "password";
        toggleIcon.textContent = "👁️"; // Change icon to show
    }
}

// Generate random password
function generatePassword() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    const allChars = uppercase + lowercase + numbers + symbols;
    let password = "";
    
    // Ensure at least one of each type
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Add more random characters to make it 12 characters long
    for (let i = password.length; i < 12; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    // Display the generated password
    document.getElementById("password").value = password;
}

// Add click event listener to the generate button
document.querySelector(".gen button").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent form submission
    generatePassword();
});

// Sign-in validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showPopup(message, isSuccess) {
    const popup = document.createElement('div');
    popup.className = `popup ${isSuccess ? 'success' : 'error'}`;
    popup.textContent = message;
    
    // Style the popup
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.padding = '15px 30px';
    popup.style.borderRadius = '5px';
    popup.style.color = 'white';
    popup.style.backgroundColor = isSuccess ? '#4CAF50' : '#f44336';
    popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    popup.style.zIndex = '1000';
    
    document.body.appendChild(popup);
    
    // Remove popup after 3 seconds
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// Add sign-in validation
document.querySelector(".signin button").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent form submission
    
    const emailInput = document.querySelector(".email input");
    const passwordInput = document.getElementById("password");
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email && !password) {
        showPopup("Please enter both email and password", false);
    } else if (!email) {
        showPopup("Please enter your email", false);
    } else if (!password) {
        showPopup("Please enter your password", false);
    } else if (!validateEmail(email)) {
        showPopup("Please enter a valid email address", false);
    } else {
        showPopup("Successfully signed in! 🎉", true);
        // Here you would typically send the credentials to a server
    }
});
