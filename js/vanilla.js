
// window.onload = function() {
    var lat, lon;
    var startingURL = "http://api.openweathermap.org/data/2.5/weather?q=Austin&appid=c28cb26ddedc5488a85c4525c702c2b4&units=imperial&q"; 
    var local;

    // get users location
    navigator.geolocation.getCurrentPosition(gotLocation, error);

    function gotLocation(position) {
        lat = position.coords.latitude.toFixed(2);
        lon = position.coords.longitude.toFixed(2);
        getWeatherData();
    }    

    function error(err) {
        console.log(err);
    }

    function getWeatherData() {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function() { 
            if (http.readyState === XMLHttpRequest.DONE) {
                if (http.status === 200) {
                    var data = JSON.parse(http.responseText);
                    local.temp = data.main.temp;
                    local.city = data.city;
                    local.windspeed =  data.wind.speed;

                    // put it on the page
                    updatePageData();
                } else {
                    console.log("Something else happened: 404 or 500");
                    console.log("http:http.status: " + http.status);
                }
            } else {
                // still not ready
                console.log("not ready ...");
            }
        };

        // build the actual ajax query string
        var url = startingURL + "lat=" + lat + "&lon=" + lon;
        http.open("GET", url);
        // and send it
        http.send();
    }

    function updatePageData() {
        var temp, greeting, city, status, windspeed;

        temp = Math.floor(theWeather.main.temp);
        var elTemp = document.getElementById('temperature');

        elTemp.innerHTML = temp + "&deg;";

        // setup the greeting
        var date = new Date();
        var timeOfDay = date.getHours();

        if (timeOfDay < 12) {
            greeting = "Good Morning";
        } else if (timeOfDay < 18) {
            greeting = "Good Afternoon";
        } else {
            greeting = "Good Evening";
        }

        elGreeting = document.getElementById("time-of-day");
        elGreeting.innerHTML = greeting;

        // City
        var city = theWeather.name;
        document.getElementById("city").innerHTML = city;
    }
    
// };