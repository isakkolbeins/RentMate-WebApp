const ad_wrapper = document.querySelector(".ad_wrapper");
const ad_dummy_before = document.querySelector(".ad_dummy_before");
const ad_dummy_after = document.querySelector(".ad_dummy_after");



const MOVE_THRESHOLD_Delete = -50;
const MOVE_THRESHOLD_Match = 50;

let startingX = 0;
let deltaX = 0;


// On touch - get the x-quordinates 
ad_wrapper.addEventListener("touchstart", e => {
  startingX = e.touches[0].pageX;
});

// On swipe - calculate the deltax (change in either positive or negative )
ad_wrapper.addEventListener("touchmove", e => {
  let currentX = e.touches[0].pageX;
  deltaX = currentX - startingX;

  // Check if current positioning will result in match or cancel 
  if (deltaX < MOVE_THRESHOLD_Delete) {
    // indicate the selection - by moving the wrapper 
    ad_dummy_before.style.flex = 0;
    ad_dummy_after.style.flex = 0.2;

    
    // If higer than the threshold - match 
  } else if (deltaX > MOVE_THRESHOLD_Match) {
    ad_dummy_before.style.flex = 0.2;
    ad_dummy_after.style.flex = 0;

  } 





});

ad_wrapper.addEventListener("touchend", e => {

// Delete threshold - deltaX - match threshold

    // If lower than threshold - delete - 
  if (deltaX < MOVE_THRESHOLD_Delete) {
    // Get a new ad---
    ad_wrapper.style.color ="red";
    ad_dummy_before.style.flex = 0;
    ad_dummy_after.style.flex = 0;

    
    // If higer than the threshold - match 
  } else if (deltaX > MOVE_THRESHOLD_Match) {
    // Save the match 
    // Open up the Chat! 
    ad_wrapper.style.color ="blue";
    ad_dummy_before.style.flex = 0;
    ad_dummy_after.style.flex = 0;

  } 
});


// Here the dataloading starts

const listingCounter = 0; 

function populateHTML() {
console.log("loading");
fetch("./fakeListingData.json").then(response => response.json()).then(data => {
    if ( listingCounter >= data.houseListings.length ) {
      listingCounter = 0;
    }

    let imagepath = data.houseListings[listingCounter].image;
    let price = data.houseListings[listingCounter].price;
    let timerange = data.houseListings[listingCounter].title;

    ad_wrapper.innerHTML += `
        <div class="ad_photo">
          <img src="${imagepath}" alt="">
        </div>
        <div class="ad_detail_price">
            <p>${price}</p>
        </div>
        <div class="ad_detail_timeframe">
            <p>${timerange}</p>
        </div>
    `;
})
}
