// Create a variable to hold API key
var apiKey = "0874d781cac886c8251059cc7a09d09a";

// Create variables needed
var searchForm = document.querySelector("form");
var searchInput = document.querySelector("input");
var cityInputEl = document.querySelector("#city");
var cityDateEl = document.getElementById("city-date");
var currentWeatherEl = document.getElementById("current-weather-data");
var forecastEl = document.querySelector(".forecast-cards");

searchForm.addEventListener("submit", function (event) {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Get the value of the city input field
    var city = cityInputEl.value.trim();

    // Call the getWeatherData function with city
    getWeatherData(city);
});

// Create getWeatherData function
function getWeatherData(city) {
    // GET request to OpenWeather API for current weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

    // GET request to OpenWeather API for 5-day forecast data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

// Create function to parse the current weather data
function parseCurrentWeatherData(data) {
    // Extract the relevant weather data from response
    var temperatrue = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;

    // Return an object with the weather data
    return {
        temperature: temperatrue,
        humidity: humidity,
        windSpeed: windSpeed
    };
}

// Create a function to parse the 5-day forecast data
function parseForecastData(data) {
    // Extract the relevant weather data from response
    var forecastData = data.list.map(function (item) {
        return {
            date: item.dt_txt,
            temperature: item.main.temp,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed
        };
    });

    // Return an array of objects with the weather data
    return forecastData;
}

function updateCurrentWeatherDisplay(weatherData) {
    // Create a string with current weather data
    var currentWeatherString = "Temperature: $(weatherData.temperature} &def;C<br> Humidity: ${weatherData.humidity}%<br> Wind Speed: ${weatherData.windSpeed} m/s";

    // Update the HTML of the current weather data element
    currentWeatherEl.innerHTML = currentWeatherString;
}

// Get the city name from input field
// Use OpenWeather API to get current weather data for that city
// Use OpenWeather API to get the 5-day forecast data for that city

// Display current weather data and 5-day forecast on the page

// Store the city name in local storage when user generates a search

// Display the list of city names in the search history section

// When user clicks on a city from search history, retrieve data to be displayed again on page