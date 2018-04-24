

document.addEventListener("DOMContentLoaded", function(event) {
  console.log('Loaded!');

document.getElementById('clicker').onclick = function() {

//Get location on click
(function() {
  navigator.geolocation.getCurrentPosition(function(location) {
    var lat = location.coords.latitude
    var long = location.coords.longitude
  console.log("Longitude: " + location.coords.latitude);
  console.log("Latitude: " + location.coords.longitude);
  console.log("Accuracy: " + location.coords.accuracy);

//Request local weather from api using cooardinates in lat & long
(function() {
var request = new XMLHttpRequest();
  request.open('GET', 'https://fcc-weather-api.glitch.me//api/current?lat=' + lat + '&lon=' + long, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        console.log(data);
        var theTemp = Math.floor(data.main.temp) + " °C ";
        var theTempF = Math.floor(((data.main.temp * 1.8) + 32)) + " °F ";
        document.getElementById('thePhoto').src = data.weather[0].icon;

        //Switch between Celsius and Fahrenheit
        var switcher = false;
        function theWeather() {
          document.getElementById('textBlock').innerHTML = data.name + "<br />" + theTemp + " - " + data.weather[0].description;
            switcher = true;
        };
        theWeather();

        function theWeatherF() {
          document.getElementById('textBlock').innerHTML = data.name + "<br />" + theTempF +  " - " + data.weather[0].description;
          switcher = false;
        };

        document.getElementById('CtoF').onclick = function() {
          (switcher === true) ? theWeatherF() : theWeather();
          };
        };
      };
      request.onerror = function() {
      console.log("Error on load");
      };
      request.send();
      })();
    });
  })();

  };
});
