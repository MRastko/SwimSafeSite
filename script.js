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

  let weather = {
    "apikey": "466ad755aefc94f4327508b92d24f522",
    
    search: function () {
      const cityName = document.querySelector('.search-bar').value;
      CityCord: function() {
        fetch(
          'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + this.apikey
        ).then((response) => response.json())
        .then((data) => this.getCityName(data))
      }
    },
    getCityName: function(data) {

    },


    fetchWeather: function(latCity, lonCity) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" + latCity + "&lon=" + lonCity + "&units=metric&appid=" + this.apikey
      ).then((response) => response.json())
      .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      console.log(name,icon,description,temp,humidity,speed)
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
    },
  }

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

  weather.fetchWeather("42.7260523", "-87.7825242");