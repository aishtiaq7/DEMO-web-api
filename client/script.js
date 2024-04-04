document.getElementById("getWeather").addEventListener("click", function () {
  const city = document.getElementById("cityName").value;

  console.log("city - > ", city);

  //   const apiKey = "YOUR_API_KEY"; // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
  //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Weather data not found.");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const display = `
  //                 <h2>Weather in ${data.name}</h2>
  //                 <p>Temperature: ${data.main.temp}°C</p>
  //                 <p>Weather: ${data.weather[0].main}</p>
  //                 <p>Wind Speed: ${data.wind.speed} m/s</p>
  //             `;
  //       document.getElementById("weatherResult").innerHTML = display;
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       document.getElementById(
  //         "weatherResult"
  //       ).innerHTML = `<p>${error.message}</p>`;
  //     });



  //  ON LOCAL SERVER
  const url = `http://localhost:3000/getEndPoint`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Weather data not found.");
      }
      return response.json();
    })
    
    .then((data) => {
        // console.log("What did we get from server response?==> ", data);
    
        // Updated to use the properties of the data object
        const display = `<h2>Weather Details</h2>
                         <p>Temperature: ${data.temperature}°C</p>
                         <p>Humidity: ${data.humidity}%</p>`;
        document.getElementById("weatherResult").innerHTML = display;
        document.getElementById("cityName").value = '';
      })

    .catch((error) => {
      console.error("Error:", error);
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p>${error.message}</p>`;
    });
});
