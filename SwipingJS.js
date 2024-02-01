const ad_wrapper = document.querySelector(".ad_wrapper");

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
});

ad_wrapper.addEventListener("touchend", e => {

// Delete threshold - deltaX - match threshold

    // If lower than threshold - delete - 
  if (deltaX < MOVE_THRESHOLD_Delete) {
    // Get a new ad---
    ad_wrapper.style.color ="red";

    
    // If higer than the threshold - match 
  } else if (deltaX > MOVE_THRESHOLD_Match) {
    // Save the match 
    // Open up the Chat! 
    ad_wrapper.style.color ="blue";

  } 
});