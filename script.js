// script.js

let currentIndex = 0;
const imageList = document.getElementById('imageList');
const pricePlaceholder = document.getElementById('pricePlaceholder');
const timePlaceholder_start = document.getElementById('timePlaceholder_start');
const timePlaceholder_end = document.getElementById('timePlaceholder_end');

function showCurrentImage(data) {
    const currentListing = data.houseListings[currentIndex];

    // Create HTML elements for the current house listing
    const imageElement = document.createElement('img');
    imageElement.src = currentListing.image; // Adjust the property based on your actual JSON structure
    imageElement.alt = currentListing.title;

    // Update placeholders with actual data
    pricePlaceholder.innerText = currentListing.price;
    timePlaceholder_start.innerText = currentListing.timeRange.from;
    timePlaceholder_end.innerText = currentListing.timeRange.to;

    // Clear existing list items
    imageList.innerHTML = '';

    // Append the image element to the container
    const listItem = document.createElement('li');
    listItem.appendChild(imageElement);
    listItem.innerHTML += `<p>${currentListing.description}</p>`;
    imageList.appendChild(listItem);
}

function handleSwipe(action) {
    // Update the list based on the swipe action
    if (action === 'like') {
        // Perform actions for 'like'
        console.log('Liked!');
    } else if (action === 'dislike') {
        // Perform actions for 'dislike'
        console.log('Disliked!');
    }

    // Move to the next image
    currentIndex++;

    // If we reach the end, reset to the beginning
    if (currentIndex >= houseListingsData.houseListings.length) {
        currentIndex = 0;
    }

    // Show the current image
    showCurrentImage(houseListingsData);
}

// Fetch JSON data from external file
let houseListingsData;
fetch('./houseListings.json')
    .then(response => response.json())
    .then(data => {
        houseListingsData = data;
        // Initial display of the first image
        showCurrentImage(houseListingsData);
    })
    .catch(error => console.error('Error fetching JSON:', error));
