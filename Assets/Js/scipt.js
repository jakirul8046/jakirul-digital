document.addEventListener("DOMContentLoaded", function () {

    // 1. Live Clock Functionality
    function updateLiveClock() {
        const clockEl = document.getElementById("live-clock");
        if (clockEl) {
            const now = new Date();
            clockEl.textContent = now.toLocaleTimeString();
        }
    }
    setInterval(updateLiveClock, 1000);
    updateLiveClock();

// Contact Form Submit -> Send to Email
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent page reload

    // Your Gmail
    const myEmail = "jakirul5519@gmail.com";

    // Taking data from form
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const service = document.getElementById('userService').value;
    const message = document.getElementById('userMsg').value;
    const submitBtn = document.getElementById('submitBtn');

    // Change Button Text
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    // 1. Get user country using GeoJS API without limits
    let userCountry = "Unknown Country";
    try {
        const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (res.ok) {
            const data = await res.json();
            if (data.country) {
                userCountry = `${data.country} (${data.country_code})`; // e.g. Bangladesh (BD)
            }
        }
    } catch (err) {
        console.log("Country fetch error:", err);
    }

    // 2. Send message to email via FormSubmit
    fetch(`https://formsubmit.co/ajax/${myEmail}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "_captcha": "false",            // Prevent captcha / spam block issues
            "_template": "table",           // Format incoming email data nicely in a table
            "_subject": "New Message from Portfolio Website!", 
            "Client Name": name,
            "Client Email": email,
            "Service Needed": service,
            "Client Country": userCountry,
            "Message": message
        })
    })
        .then(response => response.json())
        .then(data => {
            alert("Thank you! Your message has been successfully sent to Gmail");
            document.getElementById('contactForm').reset();
            submitBtn.innerText = "🚀 Send Message";
            submitBtn.disabled = false;
        })
        .catch(error => {
            alert("There was a problem sending the message. Please try again.");
            submitBtn.innerText = "🚀 Send Message";
            submitBtn.disabled = false;
        });
});
