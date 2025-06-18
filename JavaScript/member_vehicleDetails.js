// Form submission handling
document.querySelector(".details-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const vehicle_type = document.getElementById("vType").value.trim();
    const vehicle_number = document.getElementById("vNumber").value.trim();
    const vehicle_color = document.getElementById("vColor").value.trim();

    // Validate all fields are filled
    if (!vehicle_type || !vehicle_number || !vehicle_color) {
        alert("Please fill all the details!");
        return;
    }

    // Validate vehicle number (assuming you want exactly 10 characters)
    if (vehicle_number.length !== 10) {
        alert('Please enter a valid 10-character vehicle number!');
        return;
    }

    // Validate vehicle color (letters only, no numbers)
    const colorRegex = /^[A-Za-z\s]+$/; // Allows letters and spaces
    if (!colorRegex.test(vehicle_color)) {
        alert('Vehicle color should only contain letters (no numbers or special characters)!');
        return;
    }

    // If all validations pass
    alert("Account Registered Successfully...");
    // redirect to next page
    window.location.href = "index.html";
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
