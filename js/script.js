window.onload = function() {
    var lat, lon;
    var units = "imperial"; 
    var data;
    var ipinfo;
    
    (function getLocation() {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
            if (http.readyState === XMLHttpRequest.DONE) {
                    if (http.status === 200) {
                        ipinfo = JSON.parse(http.responseText);
                        gotLocation();
                    } else {
                        console.log("Something else happened: 404 or 500");
                        console.log("HTTP Status: " + http.status);
                    }
                }
        }
        http.open("GET", "http://ipinfo.io/json");
        http.send();
    }());


    function gotLocation() {
        var coordinates = ipinfo.loc.split(',');
        lat = coordinates[0];
        lon = coordinates[1];
        getWeatherData();
    }    

    function getWeatherData() {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() { 
            if (http.readyState === XMLHttpRequest.DONE) {
                if (http.status === 200) {
                    data = JSON.parse(http.responseText);
                    // put it on the page
                    updatePageData();
                } else {
                    console.log("Something else happened: 404 or 500");
                    console.log("HTTP Status: " + http.status);
                }
            } 
        };

        var endpoint = "http://api.openweathermap.org/data/2.5/weather?&appid=c28cb26ddedc5488a85c4525c702c2b4";
        var url = endpoint + "&lat=" + lat + "&lon=" + lon + "&units=" + units;
        http.open("GET", url);
        http.send();
    }

    function updatePageData() {

        var temp = Math.floor(data.main.temp);
        var elTemp = document.getElementById('temperature');

        elTemp.innerHTML = temp + "&deg;";

        // setup the greeting
        var date = new Date();
        var timeOfDay = date.getHours();

        var greeting;
        if (timeOfDay < 12) {
            greeting = "Good Morning";
        } else if (timeOfDay < 18) {
            greeting = "Good Afternoon";
        } else {
            greeting = "Good Evening";
        }

        elGreeting = document.getElementById("time-of-day").innerHTML = greeting;
        // elGreeting.innerHTML = greeting;

        document.getElementById("city").innerHTML = data.name;
        document.getElementById('country').innerHTML = ipinfo.country;
    }
    
};