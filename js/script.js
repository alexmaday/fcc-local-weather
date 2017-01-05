var coordinates = {};


$(document).ready(function() {
    // wrapper for navigatorgeolocation.getCurrentPosition
    function getLocation() {
        if (!navigator.geolocation) {
            console.log("Geolocation unavailable");
        }
        navigator.geolocation.getCurrentPosition(function(pos) { 
            crd = pos.coords; 
        });
    }

    function getWeatherData(coordinates) {
        var opw = "http://api.openweathermap.org/data/2.5/weather?id=2172797?lat=";
        opw += String(Math.floor(coordinates.latitude)) + "&lon=" + String(Math.floor(coordinates.longitude));
        $.get(opw, updatePage(data))
    }
    
    function updatePage(weatherData) {
        $("#temperature").text(data.main.temp);
    }
    getLocation();
});