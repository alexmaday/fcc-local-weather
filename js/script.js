// jQuery ready state
$(document).ready( function() {

  // First things first, we have to get user's location

  // MDN: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation

  function getGeo() {
  
    if (!navigator.geolocation) {
      console.log("Geolocation either not supported or disallowed.");
    }

    function sucess(position, error) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      console.log(latitude, longitude);
      
    }

    function error() {
      console.log("unable to retrieve your location");
    }

    navigator.geolocation.getCurrentPosition(sucess, error);
  }
  getGeo();

});


