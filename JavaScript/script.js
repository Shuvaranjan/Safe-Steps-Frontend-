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
});


document.addEventListener("DOMContentLoaded", function () {
const follower = document.getElementById("mouse-follower");

// Track mouse movement
document.addEventListener("mousemove", function (event) {
// Update the position of the follower
follower.style.left = `${event.clientX}px`;
follower.style.top = `${event.clientY}px`;
});
});

function opentab(tabname) {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");
    
    for(tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


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


