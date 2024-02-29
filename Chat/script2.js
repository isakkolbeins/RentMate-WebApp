// Function to handle sending a message
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    if (message.trim() !== '') {
        displayMessage(message, 'sent');
        messageInput.value = ''; // Clear the input after sending
        // Simulate receiving an automated response
        setTimeout(() => {
            const automatedResponse = "Hi ! Would you be interested in this property ?";
            displayMessage(automatedResponse, 'received');
        }, 20000); // Wait for 1 second before showing the automated response
    }

    //This was for debugging reasons.
    // addProfile('wannanow', 'faces/wannanow.jpeg');
}

// Function to display a message in the chat window
function displayMessage(message, type) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;

    // Add CSS class based on message type
    messageElement.classList.add(type === 'sent' ? 'sent-message' : 'received-message');

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
}

// Function to handle profile selection
function selectProfile(selectedProfileName) {
    // Update the chat header and potentially the chat history for the selected profile
    const userName = document.getElementById('user-name');
    userName.textContent = selectedProfileName.charAt(0).toUpperCase() + selectedProfileName.slice(1); // Capitalize the first letter

    // Optionally, clear the current chat messages and load the chat history for the selected profile
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = ''; // Clear current chat messages
    // Here you can add logic to load the chat history for the selected profile

    // Update the main chat window with the corresponding profile image
    const userAvatar = document.getElementById('user-avatar');
    const selectedProfileElement = document.querySelector(`[data-name="${selectedProfileName}"]`);
    const profileAvatar = selectedProfileElement.querySelector('.profile-avatar');
    userAvatar.src = profileAvatar.src; // Set the main window avatar to the selected profile avatar

    // Add logic here if you want to highlight the selected profile or indicate it's active
}

// Function to handle profile selection from anywhere in the list
function handleProfileClick(event) {
    const selectedProfile = event.target.closest('.profile');
    if (!selectedProfile) return; // Click was not on a profile

    const selectedProfileName = selectedProfile.getAttribute('data-name');
    if (selectedProfileName) {
        selectProfile(selectedProfileName);
    }
}

// Attach the event listener to the profile list container
document.getElementById('profile-list').addEventListener('click', handleProfileClick);

function addProfile(profileName, avatarSrc) {
    const profilesList = document.getElementById('profile-list');
    const newProfile = document.createElement('div');
    newProfile.classList.add('profile');
    newProfile.setAttribute('data-name', profileName);
    const avatarImg = document.createElement('img');
    avatarImg.classList.add('profile-avatar');
    avatarImg.src = avatarSrc;
    avatarImg.alt = `${profileName} Avatar`;
    newProfile.appendChild(avatarImg);
    profilesList.appendChild(newProfile);
}


// Set up click event listeners for each profile
document.querySelectorAll('.profile').forEach(profile => {
    profile.addEventListener('click', function() {
        const selectedProfileName = this.getAttribute('data-name');
        selectProfile(selectedProfileName);
    });
});

// Add event listener to the send button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Add event listener to the input field to detect "Enter" key press
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
