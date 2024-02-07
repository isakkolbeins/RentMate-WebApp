  function redirectToDetailsPage(name, price, description, availability) 
  {
    // Encode the details to pass them as URL parameters
    const encodedName = encodeURIComponent(name);
    const encodedPrice = encodeURIComponent(price);
    const encodedDescription = encodeURIComponent(description);
    const encodedAvailability = encodeURIComponent(availability);
    // Redirect to the product details page with the encoded details as parameters
    window.location.href = `./product_detail.html?name=${encodedName}&price=${encodedPrice}&description=${encodedDescription}&availability=${encodedAvailability}`;
  }
