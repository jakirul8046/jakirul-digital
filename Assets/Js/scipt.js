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

    // 2. Chatbot Widget Toggle
    const toggleBtn = document.getElementById("chatbotToggleBtn");
    const closeBtn = document.getElementById("closeChatBtn");
    const chatWindow = document.getElementById("chatWindow");
    const hintBubble = document.getElementById("chatHintBubble");
    const sendBtn = document.getElementById("sendMsgBtn");
    const chatInput = document.getElementById("chatInput");
    const chatBody = document.getElementById("chatBody");

    if (toggleBtn && chatWindow) {
        toggleBtn.addEventListener("click", function () {
            chatWindow.classList.toggle("d-none");
            if (hintBubble) hintBubble.classList.add("d-none");
        });
    }

    if (closeBtn && chatWindow) {
        closeBtn.addEventListener("click", function () {
            chatWindow.classList.add("d-none");
        });
    }

    // 3. Simple Automated Chat Bot Response
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Render User Message
        const userDiv = document.createElement("div");
        userDiv.className = "user-msg bg-success text-white p-2 rounded-3 mb-2 small ms-auto";
        userDiv.style.maxWidth = "80%";
        userDiv.textContent = text;
        chatBody.appendChild(userDiv);

        chatInput.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;

        // Bot Response Simulation
        setTimeout(() => {
            const botDiv = document.createElement("div");
            botDiv.className = "bot-msg bg-white p-2 rounded-3 shadow-sm mb-2 small text-dark border";
            botDiv.style.maxWidth = "85%";
            botDiv.textContent = "Thanks for your inquiry! You can leave a direct message via WhatsApp or use the contact form below.";
            chatBody.appendChild(botDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 700);
    }

    if (sendBtn && chatInput) {
        sendBtn.addEventListener("click", sendMessage);
        chatInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") sendMessage();
        });
    }
});


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
