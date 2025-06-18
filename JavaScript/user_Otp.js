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
    document.getElementById("otp-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const alertT = document.getElementById('alert-title');
        const alertS = document.getElementById('alert-summary');
        const alertBox = document.getElementById('customAlert');
        const alertBtn = document.getElementById('confirmBtn');
       
            showAlert(alertBox, alertT, alertS, "Otp verified Successfully", "");
            alertBtn.style.display = 'none';
           
            setTimeout(() => {
                window.location.href = 'user_ResetPassword.html';
            }, 1500);
            return;
        
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



const inputs = document.querySelectorAll(".input-box input"),
    button = document.querySelector("form button");

// Function to check if all inputs are filled
function checkInputs() {
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    if (allFilled) {
        button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
}

// Iterate over all inputs
inputs.forEach((input, index1) => {
    input.addEventListener("keyup", (e) => {
        const currentInput = input,
            nextInput = input.nextElementSibling,
            prevInput = input.previousElementSibling;

        // If the value is more than one character, clear it
        if (currentInput.value.length > 1) {
            currentInput.value = "";
            return;
        }

        // If the next input is disabled and the current value is not empty,
        // enable the next input and focus on it
        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
            nextInput.removeAttribute("disabled");
            nextInput.focus();
        }

        // If the backspace key is pressed
        if (e.key === "Backspace" && prevInput) {
            currentInput.setAttribute("disabled", true);
            currentInput.value = "";
            prevInput.focus();
        }

        // Check if all inputs are filled
        checkInputs();
    });
});

// Focus the first input on window load
window.addEventListener("load", () => inputs[0].focus());










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
