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
  ad_wrapper.style.boxShadow = "0px 10px 10px 10px var(--shadow), -10px 0 5px var(--negative), 10px 0 5px var(--positive)";
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
    ad_wrapper.style.boxShadow = "0px 0px 10px 20px var(--negative)";

    
    // If higer than the threshold - match 
  } else if (deltaX > MOVE_THRESHOLD_Match) {
    ad_dummy_before.style.flex = 0.2;
    ad_dummy_after.style.flex = 0;
    ad_wrapper.style.boxShadow = "0px 0px 10px 20px var(--positive)";
  } 

  else {
    ad_dummy_before.style.flex = 0;
    ad_dummy_after.style.flex = 0;
    ad_wrapper.style.boxShadow = "0px 10px 10px 10px var(--shadow), -10px 0 5px var(--negative), 10px 0 5px var(--positive)";
  }

});

ad_wrapper.addEventListener("touchend", e => {

// Delete threshold - deltaX - match threshold

    // If lower than threshold - delete - 
  if (deltaX < MOVE_THRESHOLD_Delete) {
    // Get a new ad---
    // ad_wrapper.style.color ="red";
  
    populateHTML();
    
    // If higer than the threshold - match 
  } else if (deltaX > MOVE_THRESHOLD_Match) {
    // Save the match 
    // Open up the Chat! 
    // ad_wrapper.style.color ="blue";
    
    // Update the HTML
    populateHTML();
  } 
    // reset 
    deltaX = 0;

    ad_dummy_before.style.flex = 0;
    ad_dummy_after.style.flex = 0;
    ad_wrapper.style.boxShadow = "0px 10px 10px 5px var(--shadow)";


});


// Here the dataloading starts

let listingCounter = 0; 

function populateHTML() {
fetch("./houseListings.json").then(response => response.json()).then(data => {
    if ( listingCounter >= data.houseListings.length ) {
      listingCounter = 0;
    }
    console.log("loading " + listingCounter);
    let currListing = data.houseListings[listingCounter]

    let imagepath = currListing.image;
    let price = currListing.price;
    let timerange = currListing.timeRange.from + " - " + currListing.timeRange.to;
    // Not optimal hahahah - do we need a "favorite commute location?"
    // for now just the first one 
    let favCommuteObj = Object.entries(currListing.commuteTimes[0])[0];
    let commutetime = favCommuteObj[0] + " - " + favCommuteObj[1]  ;

    console.log(commutetime);

    ad_wrapper.innerHTML = `

        <div class="ad_photo">
          <img src="${imagepath}" alt="">
        </div>
        <div class="ad_info">
          <div class="ad_detail ad_price">
              <p>${price}</p>
          </div>
          <div class="ad_detail ad_timeframe">
              <p>${timerange}</p>
          </div>
          <div class="ad_detail ad_commutetime">
              <p>${commutetime}</p>
          </div>
        </div>
    `;

    listingCounter = listingCounter +1;
})
}
