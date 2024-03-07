const dbURL = "https://rentmate-api.up.railway.app/";
const placeholderImgURL = "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const profile_info_name = document.querySelector(".profile_info_name");
const profile_info_image = document.querySelector(".profile_info_image");
const profile_info_description = document.querySelector(".profile_info_description");
const profile_info_commute = document.querySelector(".profile_info_commute");

const profile_tag_price = document.querySelector(".profile_tag_price");
const profile_info_time_from = document.querySelector(".profile_info_time_from");
const profile_info_time_to = document.querySelector(".profile_info_time_to");
const profile_info_price_from = document.querySelector(".profile_info_price_from");
const profile_info_price_to = document.querySelector(".profile_info_price_to");


async function populateHTML(curr_user_id) {
  const data = await fetchProfile(curr_user_id);


  const user = data.user;
  const profile = data.profile;
  let name = user.full_name;


  let profile_photo = profile.profile_photo;
  let description = profile.tenant_description;
  let location_of_interest = profile.location_of_interest;
  
  let time_from = formatDate(profile.time_from); 
  let time_to = formatDate(profile.time_to); 
  
  let min_price =  profile.min_price + " sek";
  let max_price =  profile.max_price + " sek";


  if (user.usertype == "landlord")
 {
  description = profile.description;
  location_of_interest = profile.commute_name + " - " + profile.commute_time;
  profile_tag_price.innerHTML = `<p>Price</p>`;
  min_price =  "";
  max_price =  profile.rent_price + " sek";

 }



  profile_info_name.innerHTML = `<p>${name}</p>`;
  //profile_info_image.innerHTML= `<img src="../images/profile1.jpg" class="profile_info_image"></img>`
  profile_info_description.innerHTML = `<p>${description}</p>`;
  profile_info_commute.innerHTML = `<p>${location_of_interest}</p>`;
  profile_info_time_from.innerHTML = `<p>${time_from}</p>`;
  profile_info_time_to.innerHTML = `<p>${time_to}</p>`;
  profile_info_price_from.innerHTML = `<p>${min_price}</p>`;
  profile_info_price_to.innerHTML = `<p>${max_price}</p>`;
}

async function fetchProfile(curr_user_id) {
  try {
    const response = await fetch(dbURL + "user/" + curr_user_id);
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching landlords data:', error);
  }
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
  // Udpate the nav
  populateNAV("Profile");
  await populateHTML(curr_user_id);
};