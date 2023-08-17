
function cities(cityName) {
  document.getElementById("city").innerHTML = cityName;
  const x = document.getElementById("demo");
  try {
    navigator.geolocation.getCurrentPosition(showPosition);
  } catch {
    x.innerHTML = err;
  }


  function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
  }
}



const weather = {
  apiKey: "466ad755aefc94f4327508b92d24f522",

  fetchWeather: async function(cityName) {
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      const { lat, lon } = geoData[0];
      const { name } = geoData[0];
      console.log(name, lat, lon)

      const locationUrl = `https://api.weather.gov/points/${lat},${lon}`;
      const locationResponse = await fetch(locationUrl);
      const locationData = await locationResponse.json();

      const { cwa } = locationData.properties;
      const { gridX, gridY } = locationData.properties;
      console.log(cwa, gridX, gridY)

      const weatherurl = `https://api.weather.gov/gridpoints/${cwa}/${gridX},${gridY}/forecast`;
      const weatherResponse = await fetch(weatherurl);
      const weatherData = await weatherResponse.json();
      //https://api.weather.gov/gridpoints/MKX/93,51/forecast

      this.displayWeather(weatherData, name);
    } catch (error) {
      console.log(error);
    }
  },

  displayWeather: function(weatherData, name) {
    const { number } = weatherData.properties.periods[0];
    const { startTime }  = weatherData.properties.periods[0];
    const { endTime } = weatherData.properties.periods[0];
    const { temperature } = weatherData.properties.periods[0];
    const { temperatureUnit } = weatherData.properties.periods[0];
    const { shortForecast } = weatherData.properties.periods[0];
    const { detailedForecast } = weatherData.properties.periods[0];

    console.log(number, startTime, endTime, temperature, temperatureUnit, shortForecast, detailedForecast)

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