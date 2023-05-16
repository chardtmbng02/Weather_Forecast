const weatherDisplay = document.querySelector("#forecastContainer");


function getForecastData() {
    const apiKey = '1b0d4e056d91c25a4fe8658fd55f3f06';
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;
  
    if (cityName === '') {
      alert('Please enter a city name!');
      return;
    }
  
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
  
    axios
      .get(url)
      .then((response) => {
        const forecastData = response.data;
        console.log(response.data);
        displayWeatherForecast(forecastData);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }
  
  function displayWeatherForecast(data) {
 
    // for (let i = 0; i < data.list.length; i += 8) {  ** to display all the items **
    for (let i = 0; i < 6; i += 1) {
      const weatherData = data.list[i];
      const date = new Date(weatherData.dt_txt);
      const day = date.toLocaleDateString(undefined, { weekday: 'long' });
      const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', });
    
      const div_card = document.createElement("div");

      div_card.classList.add("col");
      div_card.innerHTML = `
          
        <div class="card">
          <div class="card-body">
            <h4 class="mb-1 sfw-normal">${time}</h4>
            <p class="mb-2">Temperature: ${weatherData.main.temp} °C</p>
            <p>Humidity: ${weatherData.main.humidity} %</p>
            <p>Atmospheric Pressure: ${weatherData.main.pressure} hPa</p>
            <p>
              Weather Description: ${weatherData.weather[0].description}
            </p>
          </div>
        </div>
      `;
      
      document.querySelector("#forecastContainer").appendChild(div_card);
    }
  }
  