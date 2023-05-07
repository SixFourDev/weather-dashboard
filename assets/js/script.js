// Create a variable to hold API key
var apiKey = "0874d781cac886c8251059cc7a09d09a";

// Create variables needed
var searchForm = document.querySelector("form");
var searchInput = document.querySelector("input");
var cityInputEl = document.querySelector("#city");
var cityDateEl = document.getElementById("city-date");
var currentWeatherEl = document.getElementById("current-weather-data");
var forecastEl = document.querySelector(".forecast-cards");

searchForm.addEventListener("submit", function(event) {
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

// Get the city name from input field
// Use OpenWeather API to get current weather data for that city
// Use OpenWeather API to get the 5-day forecast data for that city

// Display current weather data and 5-day forecast on the page

// Store the city name in local storage when user generates a search

// Display the list of city names in the search history section

// When user clicks on a city from search history, retrieve data to be displayed again on page