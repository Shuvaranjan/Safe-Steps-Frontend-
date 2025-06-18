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
    document.getElementById("otpGenerate-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById('user').value.trim();
        // const password = document.getElementById('pass').value;
        const alertT = document.getElementById('alert-title');
        const alertS = document.getElementById('alert-summary');
        const alertBox = document.getElementById('customAlert');
        const alertBtn = document.getElementById('confirmBtn');
        const form = document.getElementById('signIn-form');

        // Basic validation
        if (!username) {
            showAlert(alertBox, alertT, alertS, "Otp Generated Failed!", "Please Enter a valid email");
            return;
        }else{
            showAlert(alertBox, alertT, alertS, "Otp Sent Successfully", "");
            alertBtn.style.display = 'none';
            // return;
            //  Redirect after a delay to let user see the message
            setTimeout(() => {
                window.location.href = 'user_Otp.html';
            }, 1500);
        }

        // // Check credentials (in a real app, this would be a server-side check)
        // if (username === 'shuvaranjan5@gmail.com' && password === '2004') {
        //     // Successful login
        //     showAlert(alertBox, alertT, alertS, "Login Successful!", "Welcome to Safe Steps", true);
            
        //     // Redirect after a delay to let user see the message
        //     setTimeout(() => {
        //         window.location.href = 'user_Main.html';
        //     }, 2000);
        // } else {
        //     // Failed login
        //     showAlert(alertBox, alertT, alertS, "Login Failed!", "Invalid username or password. Please try again.");
        // }
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
