/*
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  */

  let weather = {
    "apikey": "466ad755aefc94f4327508b92d24f522",
    
    cityCords: function(cityName) {
      fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + this.apikey
      ).then((response) => response.json())
      .then((data) => {
        const { lat, lon } = data[0];
        console.log(lat,lon)
        this.fetchWeather(lat, lon);
      })
    },
  
    fetchWeather: function(lat, lon) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + this.apikey
      ).then((response) => response.json())
      .then((data) => this.displayWeather(data))
    },

    displayWeather: function(data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      console.log(name,icon,description,temp,humidity,speed)
      document.getElementById("North Beach").querySelector(".city").innerText = "Weather in " + name;
      document.getElementById("North Beach").querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      document.getElementById("North Beach").querySelector(".description").innerText = description;
      document.getElementById("North Beach").querySelector(".temp").innerText = Math.round(temp) + "°C";
      document.getElementById("North Beach").querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.getElementById("North Beach").querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    },
    search: function () {
      this.cityCords(document.querySelector(".search-bar").value);
    },
  };

  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });

  weather.cityCords("Racine")

