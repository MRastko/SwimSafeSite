
function cityButtons(cityName) {
  weather.fetchWeather(cityName)
}

function localWeather() {
  try {
    navigator.geolocation.getCurrentPosition(showPosition);
  } catch (error) {
    console.log(error);
  }


  async function showPosition(position, ) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    document.getElementById("demo").innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    console.log(lat, lon)

    try {    
      const locationUrl = `https://api.weather.gov/points/${lat},${lon}`;
      const locationResponse = await fetch(locationUrl);
      const locationData = await locationResponse.json();

      const { city } = locationData.properties.relativeLocation.properties;
      console.log(city)
      weather.fetchWeather(city)
      return(city)
    } catch (error) {
    console.log(error);
    }
  }
}

function convertToLocalTime(isoDateTime) {
  const date = new Date(isoDateTime);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZoneName: "short"
  };

  return date.toLocaleString("en-US", options);
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
    const { windSpeed } = weatherData.properties.periods[0];

    const isoDateStartTime = startTime;
    const isoDateEndTime = startTime;
    const convertedStartTime = convertToLocalTime(isoDateStartTime);
    const convertedEndTime = convertToLocalTime(isoDateEndTime);

    console.log(number, convertedStartTime, convertedEndTime, temperature, temperatureUnit, shortForecast, windSpeed)

    const cityElement        = document.getElementById("beachinfo").querySelector("#city");
    const descriptionElement = document.getElementById("beachinfo").querySelector("#description");
    const tempElement        = document.getElementById("beachinfo").querySelector("#temp");
    const humidityElement    = document.getElementById("beachinfo").querySelector("#humidity");
    const windElement        = document.getElementById("beachinfo").querySelector("#wind");

    cityElement.innerText = `Weather in ${name}`;
    descriptionElement.innerText = shortForecast;
    tempElement.innerText = `${Math.round(temperature)}°${temperatureUnit}`;
    windElement.innerText = `Wind speed: ${windSpeed}`;
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