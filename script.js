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


const weather = {
  apiKey: "466ad755aefc94f4327508b92d24f522",

  fetchWeather: async function(cityName) {
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      const { lat, lon } = geoData[0];
      console.log(lat, lon)

      const locationUrl = `https://api.weather.gov/points/${lat},${lon}`;
      const locationResponse = await fetch(locationUrl);
      const locationData = await locationResponse.json();

      const { cwa } = locationData.properties;
      const { gridX, gridY } = locationData.properties;
      console.log(cwa, gridX, gridY)

      const weatherurl = `https://api.weather.gov/gridpoints/${cwa}/${gridX},${gridY}/forecast`;
      const weatherResponse = await fetch(weatherurl);
      const weatherData = await weatherResponse.json();

      this.displayWeather(weatherData);
    } catch (error) {
      console.log(error);
    }
  },

  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    console.log(name, icon, description, temp, humidity, speed)

    const cityElement        = document.getElementById("North Beach").querySelector(".city");
    const iconElement        = document.getElementById("North Beach").querySelector(".icon");
    const descriptionElement = document.getElementById("North Beach").querySelector(".description");
    const tempElement        = document.getElementById("North Beach").querySelector(".temp");
    const humidityElement    = document.getElementById("North Beach").querySelector(".humidity");
    const windElement        = document.getElementById("North Beach").querySelector(".wind");

    cityElement.innerText = `Weather in ${name}`;
    iconElement.src = `https://openweathermap.org/img/wn/${icon}.png`;
    descriptionElement.innerText = description;
    tempElement.innerText = `${Math.round(temp)}°F`;
    humidityElement.innerText = `Humidity: ${humidity}%`;
    windElement.innerText = `Wind speed: ${Math.round(speed)} Mph`;
  },

  search: function () {
    const searchBarElement = document.querySelector(".search-bar");
    const cityName = searchBarElement.value;
    this.fetchWeather(cityName);
  },
};

const searchButtonElement = document.querySelector(".search button");
searchButtonElement.addEventListener("click", function () {
  weather.search();
});

const searchBarElement = document.querySelector(".search-bar");
searchBarElement.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Racine");