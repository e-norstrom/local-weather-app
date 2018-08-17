

document.addEventListener("DOMContentLoaded", function(event) {
  console.log('Loaded!');

  document.getElementById('clicker').onclick = function() {

    //Get location on click
    navigator.geolocation.getCurrentPosition(function(location) {
      var lat = location.coords.latitude
      var long = location.coords.longitude
      console.log("Longitude: " + location.coords.latitude);
      console.log("Latitude: " + location.coords.longitude);
      console.log("Accuracy: " + location.coords.accuracy);

      //Request local weather from api using cooardinates in lat & long
      var request = new XMLHttpRequest();
      request.open('GET', 'https://fcc-weather-api.glitch.me//api/current?lat=' + lat + '&lon=' + long, true);
      request.onerror = function() {
        console.log("Error on load");
      };
      request.send();
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var data = JSON.parse(request.responseText);
          var theTempC = Math.floor(data.main.temp) + " °C ";
          var theTempF = Math.floor(((data.main.temp * 1.8) + 32)) + " °F ";
          var currentLocation = data.name;
          var weatherDescription = data.weather[0].description;
          var weatherIcon = data.weather[0].icon;

          // Update the textblock with the location, temperature and weather description
          // Update the weather icon
          document.getElementById('textBlock').innerHTML = currentLocation + "<br>" + theTempC + " - " + weatherDescription;
          document.getElementById('thePhoto').src = weatherIcon;
          console.log(currentLocation);

          //Switch between Celsius and Fahrenheit
          var showFahrenheit = false;
          document.getElementById('CtoF').onclick = function(temp) {
            if (showFahrenheit === false) {
              temp = theTempF;
              showFahrenheit = true;
            } else {
                temp = theTempC;
                showFahrenheit = false;
              }
            document.getElementById('textBlock').innerHTML = currentLocation + "<br>" + temp + " - " + weatherDescription;
          };
        };
      };
    });
  };
});
