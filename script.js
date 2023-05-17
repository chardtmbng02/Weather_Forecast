const weatherDisplay = document.querySelector("#forecastContainer");

function getForecastData() {
  const apiKey = "1b0d4e056d91c25a4fe8658fd55f3f06";
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value;

  if (cityName === "") {
    alert("Please enter a city name!");
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
      console.log("Error:", error);
    });
}

function displayWeatherForecast(data) {
  clear();
  for (let i = 0; i < 6; i++) {
    const weatherData = data.list[i];
    const date = new Date(weatherData.dt_txt);
    const day = date.toLocaleDateString(undefined, { weekday: 'long' });
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const div_card = document.createElement("div");
    div_card.classList.add("col");
    div_card.innerHTML = `
          
        <div class="card">
          <div class="card-body text-center">
            <h4 class="mb-3 sfw-normal">${time}</h4>
            <p>Temperature: ${weatherData.main.temp} °C</p>
            <p>Humidity: ${weatherData.main.humidity} %</p>
            <p>Atmospheric Pressure: ${weatherData.main.pressure} hPa</p>
            <p>
              Weather Description: ${weatherData.weather[0].description}
            </p>
          </div>
        </div>
      `;

    document.querySelector("#forecastContainer").appendChild(div_card);
  }  // End loop for Hourly Forecast
  
//####### Master mel ##########

const ctx = document.getElementById('myChart');
    
    let myChart =new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Temperature °C',
          data: [],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max:40
          }
        }
      }
    }); 

    for (let k = 0; k < 5; k++) {
      const options = { weekday: "short" };
      const date = new Date();
      const d = date.setDate(date.getDate() + k);
      const longday = new Intl.DateTimeFormat("en-US", options).format(d);
      console.log(longday);
      const t=[];
    myChart.data.labels.push(longday); 
  };
  
  myChart.update();
  for (let k = 0; k < 40; k=k+8) {
    const t =data.list[k].main.temp;
    console.log(data.list[k].dt_txt);
    console.log(data.list[k].main.temp);
    myChart.data.datasets[0].data.push(t)
  }
  myChart.update();
    function purge(){
      weatherDataContainer.innerHTML=``;
    };
  };

function clear() {
  forecastContainer.innerHTML = "";
}
