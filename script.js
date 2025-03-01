document.addEventListener("mousemove", updateSpotlight);
document.addEventListener("touchmove", updateSpotlight);
document.addEventListener("DOMContentLoaded", () => {
    updateSpotlightSize();
    loadMessages(); // Load saved messages
    window.addEventListener("resize", updateSpotlightSize);
});

// Select elements
const answerButton = document.getElementById("answerButton");
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");

// Toggle chat box visibility
answerButton.addEventListener("click", () => {
    chatBox.classList.add("show"); // Show chat box
    answerButton.style.display = "none"; // Hide "Answer" button
    chatInput.focus();
});

// Close chat box when clicking outside (except button)
document.addEventListener("click", (event) => {
    if (!chatBox.contains(event.target) && event.target !== answerButton) {
        closeChat();
    }
});

// Handle send button
sendButton.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if (message) {
        saveMessage(message); // Save message with timestamp
        chatInput.value = ""; // Clear input
        closeChat();
        sendToTelegram(message); // Send message to Telegram bot
    }
});

// Close chat function
function closeChat() {
    chatBox.classList.remove("show");
    answerButton.style.display = "block"; // Show "Answer" button again
}

// Save message to localStorage with timestamp
function saveMessage(text) {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    const timestamp = new Date().toLocaleString(); // Get readable time
    messages.push({ text, timestamp });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// Load messages from localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    console.log("Previous messages:", messages); // You can display them if needed
}

// Send message to your Telegram bot
function sendToTelegram(message) {
    const token = "7767456094:AAFvz7yRhyUdrit0n4gCoLQF5OzDyF5rvi0"; // Your bot token
    const chatId = "5354189281"; // Replace this with your chat ID

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const data = {
        chat_id: chatId,
        text: message
    };

    // Use Axios to send POST request to Telegram API
    axios.post(url, data)
        .then(response => {
            console.log("Message sent to Telegram:", response.data);
        })
        .catch(error => {
            console.error("Error sending message:", error);
        });
}

// Spotlight effect
function updateSpotlight(event) {
    let x, y;
    if (event.touches) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    document.documentElement.style.setProperty('--cursorX', x + 'px');
    document.documentElement.style.setProperty('--cursorY', y + 'px');
}

// Adjust spotlight size
function updateSpotlightSize() {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const spotlightSize = isMobile ? "80px" : "150px";
    document.documentElement.style.setProperty('--spotlightSize', spotlightSize);
}