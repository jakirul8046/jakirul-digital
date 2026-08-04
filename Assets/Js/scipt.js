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



    if (sendBtn && chatInput) {
        sendBtn.addEventListener("click", sendMessage);
        chatInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") sendMessage();
        });
    }
});


// Contact Form Submit -> Send to Email & WhatsApp Together
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // পেজ রিলোড হওয়া বন্ধ করবে

    // 🔴 আপনার জিমেইল
    const myEmail = "jakirul5519@gmail.com";

    // ফর্ম থেকে তথ্য নেওয়া
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const service = document.getElementById('userService').value;
    const message = document.getElementById('userMsg').value;
    const submitBtn = document.getElementById('submitBtn');

    // বাটনের টেক্সট পরিবর্তন
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    // 🌍 ১. কোনো লিমিট ছাড়া সরাসরি দেশের নাম বের করার API
    let userCountry = "অজানা দেশ";
    try {
        const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (res.ok) {
            const data = await res.json();
            if (data.country) {
                userCountry = `${data.country} (${data.country_code})`; // যেমন: Bangladesh (BD)
            }
        }
    } catch (err) {
        console.log("Country fetch error:", err);
    }

    // 📩 ২. ইমেইলে মেসেজ সেন্ড করা
    fetch(`https://formsubmit.co/ajax/${myEmail}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
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
