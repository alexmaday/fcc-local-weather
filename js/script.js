// jQuery ready state
$(document).ready( function() {

  // First things first, we have to get user's location

  // MDN: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation

  // function getGeo() {
  
  //   if (!navigator.geolocation) {
  //     console.log("Geolocation either not supported or disallowed.");
  //     console.log("Use alternate location method");
  //   }

  //   function sucess(position) {
  //     crd = position.coords;
  //     console.log("Inside success:", crd.latitude, crd.longitude);
  //   }

  //   function error() {
  //     console.log("unable to retrieve your location");
  //   }
  //   navigator.geolocation.getCurrentPosition(sucess, error);

  // }
  // var crd = {};

  // getGeo();

  // no getGeo wrapper function

  var crd = {};
  navigator.geolocation.getCurrentPosition(function(pos) {
    crd = pos.coords;
  })
  console.log("After getGeo call: ", crd.latitude, crd.longitude);

});


