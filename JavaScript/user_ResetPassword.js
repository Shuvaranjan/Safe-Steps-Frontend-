document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("bg-video");

    // Hide the video initially
    video.style.opacity = 0;

    // Wait for the video to load
    video.addEventListener("loadeddata", function () {
        // Fade in the video smoothly
        video.style.transition = "opacity 1s ease-in-out";
        video.style.opacity = 1;
    });

    // Fallback: If the video fails to load, ensure the background color is visible
    video.addEventListener("error", function () {
        document.querySelector(".video-background").style.backgroundColor = "#000"; // Fallback color
    });

    // Form submission handling
    document.getElementById("forgot-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById('user').value.trim();
        const password = document.getElementById('password').value;
        const confirmPass = document.getElementById('rePassword').value;
        const alertT = document.getElementById('alert-title');
        const alertS = document.getElementById('alert-summary');
        const alertBox = document.getElementById('customAlert');
        const alertBtn = document.getElementById('confirmBtn');
        // const form = document.getElementById('signIn-form');

        // Basic validation
        if (!password || !confirmPass) {
            showAlert(alertBox, alertT, alertS, "", "Please enter both username and password!");
            return;
        }else if(password!==confirmPass){
            showAlert(alertBox, alertT, alertS, "", "Password does't matched! ");
            return;
        }else{
            showAlert(alertBox, alertT, alertS, "Password Reset Successfully", "Login to Safe-Steps",true);
            //     // Redirect after a delay to let user see the message
            setTimeout(() => {
                window.location.href = 'user_signIn.html';
            }, 1500);
            return;
        }

    });

    // Function to show alert and handle video pausing
    function showAlert(alertBox, alertTitle, alertSummary, title, message, isSuccess = false) {
        // Pause the video
        const video = document.getElementById("bg-video");
        video.pause();
        
        // Show alert
        alertBox.style.display = 'block';
        alertTitle.textContent = title;
        alertSummary.textContent = message;
        
        // Hide button for success case
        const alertBtn = document.getElementById('confirmBtn');
        if (isSuccess) {
            alertBtn.style.display = 'none';
        } else {
            alertBtn.style.display = 'block';
            // Add one-time event listener for closing
            alertBtn.onclick = function() {
                alertBox.style.display = 'none';
                // Resume video playback
                video.play();
            };
        }
    }
});










// Toggle password visibility
function togglePassword(icon, inputId) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
}








// Password strength checker
function checkPasswordStrength() {
    const password = document.getElementById("password").value;
    const indicator = document.querySelector(".indicator");
    const text = document.querySelector(".text");
    const weak = document.querySelector(".weak");
    const medium = document.querySelector(".medium");
    const strong = document.querySelector(".strong");

    // Regular expressions for password strength
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    // Show/hide indicator based on input
    if (password.length > 0) {
        indicator.style.display = "flex";
        text.style.display = "block";
    } else {
        indicator.style.display = "none";
        text.style.display = "none";
        return;
    }

    // Reset all classes
    weak.classList.remove("active");
    medium.classList.remove("active");
    strong.classList.remove("active");

    // Calculate password strength score
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (hasLowerCase) strength++;
    if (hasUpperCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChars) strength++;

    // Apply strength indicators
    if (strength <= 2 || password.length < 6) {
        weak.classList.add("active");
        text.textContent = "Password is Weak";
        text.style.color = "#ff4757";
    } else if (strength <= 4) {
        weak.classList.add("active");
        medium.classList.add("active");
        text.textContent = "Password is Medium";
        text.style.color = "#ffa502";
    } else {
        weak.classList.add("active");
        medium.classList.add("active");
        strong.classList.add("active");
        text.textContent = "Password is Strong";
        text.style.color = "#2ed573";
    }
}







/*--------------------- Match or not -----------------------------*/
function matchPassword() {
    const text2 = document.querySelector(".text2");
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("rePassword").value;


    // Show/hide indicator based on input
    if (rePassword.length > 0) {
        text2.style.display = "block";
        if (password !== rePassword) {
            text2.textContent = "Password not matched!";
            text2.style.color = "#ff4757";

        } else {
            text2.textContent = "Password matched";
            text2.style.color = "#2ed573";

        }
    } else {
        text2.style.display = "none";
        return;
    }

}




// // Form submission handling
// document.querySelector(".forgot-form").addEventListener("submit", function (e) {
//     e.preventDefault();

//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("rePassword").value;


//     if (password !== confirmPassword) {
//         alert("Password don't match!");
//         return;
//     } else {

//         alert("Password Reset Successfully... ");

//         // redirect to next page
//         window.location.href = "index.html";
//     }

// });



document.addEventListener('DOMContentLoaded', () => {
    const circleElement = document.getElementById('cursor');

    // Only proceed if the cursor element exists
    if (!circleElement) {
        console.error('Cursor element not found');
        return;
    }

    const mouse = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    const circle = { x: 0, y: 0 };
    let currentScale = 0;
    let animationFrameId = null;

    // Set initial position to avoid jumping from (0,0)
    const initCursorPosition = () => {
        circle.x = mouse.x;
        circle.y = mouse.y;
        circleElement.style.transform = `translate(${circle.x}px, ${circle.y}px)`;
    };

    const handleMouseMove = (e) => {
        mouse.x = e.clientX; // Use clientX/Y for consistency
        mouse.y = e.clientY;
    };

    const speed = 0.17;
    const maxSqueeze = 0.5; // Maximum squeeze amount
    const maxVelocity = 150; // Pixels per frame to reach max squeeze

    const tick = () => {
        // Smooth follow effect
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;

        // Calculate mouse velocity
        const deltaMouseX = mouse.x - previousMouse.x;
        const deltaMouseY = mouse.y - previousMouse.y;
        previousMouse.x = mouse.x;
        previousMouse.y = mouse.y;

        // Calculate scale based on velocity
        const mouseVelocity = Math.min(
            Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
            maxVelocity
        );
        const scaleValue = (mouseVelocity / maxVelocity) * maxSqueeze;

        // Smooth scale transition
        currentScale += (scaleValue - currentScale) * speed;

        // Apply transformations
        circleElement.style.transform = `
    translate(${circle.x}px, ${circle.y}px)
    scale(${1 + currentScale}, ${1 - currentScale})
`;

        animationFrameId = requestAnimationFrame(tick);
    };

    const startAnimation = () => {
        window.addEventListener('mousemove', handleMouseMove);
        initCursorPosition();
        tick();
    };

    const stopAnimation = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    };

    // Start the animation
    startAnimation();

    // Clean up if needed (for SPAs or when removing the cursor)
    // return stopAnimation;
});
