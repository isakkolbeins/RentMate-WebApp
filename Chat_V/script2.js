// Import and initialize Socket.IO
const socket = io();

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9); // Generate a random string
}

// Define the sendMessage function
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('chat message', { userId, message }); // Send both the user ID and message content // Send only the message content
        messageInput.value = '';
    }
}

// Add event listener to the button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Add event listener to the input field to detect "Enter" key press
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Update user avatar and name when receiving user information
// socket.on('user info', function(userInfo) {
//     const userAvatar = document.getElementById('user-avatar');
//     const userName = document.getElementById('user-name');

//     userAvatar.src = userInfo.avatar; // Set the image source to the user's avatar URL
//     userName.textContent = userInfo.name; // Set the user's name
// });

// Handle incoming messages
socket.on('chat message', function(data) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = data.message;
    
    // Add CSS class based on sender
    if (data.userId === userId) {
        messageElement.classList.add('sent-message');
    } else {
        messageElement.classList.add('received-message');
    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

const userId = generateUniqueId(); 
// Send the user ID to the server
socket.emit('set user id', userId);