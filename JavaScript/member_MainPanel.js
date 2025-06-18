    // Handle logout with confirmation
    function exit() {
        if (confirm('Are you sure to sign out safe-steps?')) {
            // Perform logout action here
            // alert('You have been logged out successfully');
            // In a real app, you would redirect to login page or similar
            window.location.href = 'index.html';
        }
    }


 

    // Handle ride accept/decline
    document.querySelectorAll('.btn-accept').forEach(button => {
        button.addEventListener('click', function() {
            const close = document.getElementById('close-btn');
            // const request_card = document.getElementById('request-card');
            const card = this.closest('.request-card');
            card.style.borderLeft = '4px solid var(--success)';
            this.textContent = 'Accepted ✓';
            this.style.backgroundColor = '#218838';
            this.nextElementSibling.style.display = 'none';
            close.style.display = 'block';
            
            // In a real app, you would connect to the customer here
            alert('Ride accepted! Navigating to customer...');
        });
    });

    document.querySelectorAll('.btn-reject').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.request-card');
            card.style.borderLeft = '4px solid var(--danger)';
            this.textContent = 'Declined ✗';
            this.style.backgroundColor = '#c82333';
            this.previousElementSibling.style.display = 'none';
        });
    });

    // // Get real user location (if enabled)
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             console.log('Driver location:', position.coords.latitude, position.coords.longitude);
    //             // In a real app, you would send this to your server
    //         },
    //         (error) => {
    //             console.error('Error getting location:', error);
    //         }
    //     );
    // }


 // Add this script to handle image upload and preview
 document.getElementById('avatarInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.driver-avatar').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});


document.getElementById("close-btn").addEventListener('click', function () {

    const rides = document.getElementById('rides_available_title');
    const card = document.getElementById('request-card');
    card.style.display = 'none';
    rides.textContent = "No available rides"
});


