// Create a variable to hold API key
var apiKey = "0874d781cac886c8251059cc7a09d09a";

window.addEventListener("load", function() {
    var cityData = localStorage.getItem("cities");
    if (cityData) {
        cityList = JSON.parse(cityData);
        displayCityList();
    }
});

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
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            // Parse the current weather data
            var currentWeatherData = parseCurrentWeatherData(data);

            // Update the current weather display on page
            updateCurrentWeatherDisplay(currentWeatherData);
        });

    // GET request to OpenWeather API for 5-day forecast data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial&cnt=5`)
        .then(response => response.json())
        .then(data => {
            // Parse the 5-day forecast data
            var forecastData = parseForecastData(data);

            // Update the forecast display on the page
            updateForecastDisplay(forecastData);
        });
}

// Create function to parse the current weather data
function parseCurrentWeatherData(data) {
    // Extract the relevant weather data from response
    var cityName = data.name;
    var temperature = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var conditionCode = data.weather[0].icon;

    var iconUrl = `https://openweathermap.org/img/w/${conditionCode}.png`;

    // Return an object with the weather data
    return {
        cityName: cityName,
        temperature: temperature, 
        humidity: humidity,
        windSpeed: windSpeed,
        iconUrl: iconUrl
    };
}


// Create a function to parse the 5-day forecast data
function parseForecastData(data) {
    // Extract the relevant weather data from response
    var forecastData = data.list.map(function (item) {
        var conditionCode = item.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${conditionCode}.png`;
        var date = new Date(item.dt_txt);
        var formattedDate = date.toLocaleDateString();

        return {
            date: formattedDate,
            temperature: item.main.temp,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            iconURL: iconURL
        };
    });

    // Return an array of objects with the weather data
    return forecastData;
}


function updateCurrentWeatherDisplay(weatherData) {
    // Create a string with current weather data
    var currentWeatherString = `<h3>${weatherData.cityName}</h3><br><img src="${weatherData.iconUrl}" alt="Weather icon">
    <p>Temp: ${weatherData.temperature} &deg;F</p>
    <p>Humidity: ${weatherData.humidity}%</p>
    <p>Wind Speed: ${weatherData.windSpeed} mph</p>`;

    // Update the HTML of the current weather data element
    currentWeatherEl.innerHTML = currentWeatherString;
}

function updateForecastDisplay(forecastData) {
    // Create a string with the forecast data
    var forecastString = "";

    // Loop through the forecast data and create HTML for each forecast card
    forecastData.forEach(function (item) {
        forecastString += `<div class="forecast-cards">
                          <h4>${item.date}</h4>
                          <img src="${item.iconURL}" alt="Weather icon">
                          <p>Temp: ${item.temperature} &deg;F</p>
                          <p>Humidity: ${item.humidity}%</p>
                          <p>Wind Speed: ${item.windSpeed} mph</p>
                        </div>`;
    });

    forecastEl.innerHTML = forecastString;
}

// Creates an empty array for cityList
var cityList = [];
// Creates a function for handleSearch with an event listener 
function handleSearch(event) {
    // Prevents the page from refreshing when form is submitted
    event.preventDefault();
    // Gets the value that is in input field and trims whitespace area
    var cityName = searchInput.value.trim();
    // Calls getWeatherData and gets the cityName
    getWeatherData(cityName);
    // Gets "cities" from local storage and assigns it to cityList, If no cities in local storage assign it an empty array
    cityList = JSON.parse(localStorage.getItem("cities")) || [];
    if (!cityList.includes(cityName)) {
        cityList.push(cityName);
        localStorage.setItem("cities", JSON.stringify(cityList));
        displayCityList();
    }
}

// Creates a function for displayCityList
function displayCityList() {
    // Assigns cityListEl and gets element "city-list"
    var cityListEl = document.getElementById("city-list");
    // Creates empty string for cityListString
    var cityListString = "";
    // Loops through city list
    cityList.forEach(function(city) {
        // Concatenates a new string with each city name
        cityListString += `<li>${city}</li>`;
    });
    // Sets concatenated string to cityListEl var
    cityListEl.innerHTML = cityListString;
}

searchForm.addEventListener("submit", handleSearch);

// Get the city name from input field
// Use OpenWeather API to get current weather data for that city
// Use OpenWeather API to get the 5-day forecast data for that city

// Display current weather data and 5-day forecast on the page

// Store the city name in local storage when user generates a search

// Display the list of city names in the search history section

// When user clicks on a city from search history, retrieve data to be displayed again on page