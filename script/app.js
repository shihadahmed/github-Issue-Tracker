// Form element select kora
const myForm = document.getElementById('loginForm');
const errorText = document.getElementById('error-message');

// Login logic function
function checkLogin(e) {
    e.preventDefault(); 

    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;

    // Credentials check
    if (user === 'admin' && pass === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'home.html'; 
    } else {
        
        errorText.innerHTML = 'Invalid Username or Password! <br> Please use the demo credentials.';
        errorText.classList.remove('hidden');
        
        setTimeout(() => {
            errorText.classList.add('hidden');
        }, 3000);
    }
}

// Form event listener
if (myForm) {
    myForm.addEventListener('submit', checkLogin);
}