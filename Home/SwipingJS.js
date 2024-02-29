const dbURL = "https://rentmate-api.up.railway.app/";
const placeholderImgURL = "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

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

let landlords = [];
let adCounter = 0; 
let curr_user_id;

ad_wrapper.addEventListener("touchend", e => {
// Delete threshold - deltaX - match threshold
    // If lower than threshold - delete - 
  if (deltaX < MOVE_THRESHOLD_Delete) {
    // Get a new ad---
    // ad_wrapper.style.color ="red";
  
    populateHTML(adCounter);
    
    // If higer than the threshold - match 
  } else if (deltaX > MOVE_THRESHOLD_Match) {
    // Save the match 
    // Open up the Chat! 
    // ad_wrapper.style.color ="blue";
    
    // Update the HTML
    populateHTML(adCounter);
  } 
    // reset 
    deltaX = 0;

    ad_dummy_before.style.flex = 0;
    ad_dummy_after.style.flex = 0;
    ad_wrapper.style.boxShadow = "0px 10px 10px 5px var(--shadow)";

});



/// Get all matches - within price range - within time range - where location of intrest == commute name 
async function fetchLandlordsData(curr_user_id) {
  try {
    const response = await fetch(dbURL + "matchesForUserId/" + curr_user_id);
    const data = await response.json();
    landlords = data.matches; // Store the fetched data in the landlords array
    populateHTML(adCounter); // Populate HTML after fetching data
    console.log("Landlords data:", landlords);
  } catch (error) {
    console.error('Error fetching landlords data:', error);
  }
}

async function fetchImage(landlord_id) {
  try {
    const response = await fetch(dbURL +"imagesByLandlord/"+landlord_id);
    const data = await response.json();

    if (data.images && data.images.length > 0) {
      console.log("Images data:", data.images[0].image_url);
      return data.images[0].image_url;
    } else {
      // Return the URL of the placeholder image if no image is found
      return placeholderImgURL;
    }
  } catch (error) {
    console.error('Error fetching landlords data:', error);
  }
}

function updateCounter() {
  adCounter++;
  if (adCounter >= landlords.length) {
    adCounter = 0
  }
} 

async function populateHTML(counter) {
  
let data = landlords[counter];
let imagepath = await fetchImage(data.landlord_id); // Await the result of fetchImage
console.log(data);
let address = data.address;
let price = data.rent_price + " sek / month";
let time_from = formatDate(data.time_from); 
let time_to = formatDate(data.time_to); 

let commute_name = "KTH campus";
let commute_time = "10 min";


  ad_wrapper.innerHTML = `

      <div class="ad_photo">
        <img src="${imagepath}" alt="">
      </div>
      <div class="ad_info">
  
        <div class="ad_detail ad_address">
            <p class="ad_address_text">${address}</p>
        </div>
        <div class="ad_detail ad_price">
            <p>${price}</p>
        </div>
        <div class="ad_detail_layout">

          
          <div class="ad_detail_wrapper ad_time_wrapper">
            <div class="ad_detail ad_title ad_time_title">
                <p>Available</p>
            </div>
            <div class="ad_detail ad_time_from">
                <p>${time_from}</p>
            </div>
            <div class="ad_detail ad_time_to">
                <p>${time_to}</p>
            </div>
          </div>

          <div class="info_breaker"></div>

          <div class="ad_detail_wrapper ad_commute_wrapper">
            <div class="ad_detail ad_title ad_commute_title">
                <p>Commute</p>
            </div>
            <div class="ad_detail ad_commute_name">
                <p>${commute_name}</p>
            </div>
            <div class="ad_detail ad_commute_time">
                <p>${commute_time}</p>
            </div>
          </div>
        </div>

      </div>
  `;

  updateCounter();

  
  


}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  return `${day}. ${months[monthIndex]} ${year}`;
}

window.onload = async function() {
  var urlParams = new URLSearchParams(window.location.search);
  curr_user_id = urlParams.get('user_id');
  console.log(curr_user_id);

  // Udpate the nav
  populateNAV("Home");
  await fetchLandlordsData(curr_user_id);
};