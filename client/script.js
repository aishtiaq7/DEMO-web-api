document.getElementById("getWeather").addEventListener("click", function () {
  const city = document.getElementById("cityName").value;
  if (city.length == 0) {
    console.log("city none");
    return;
  }

  console.log("city - > ", city);
  const url = `https://restcountries.com/v3.1/name/${city}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error calling API");
      }
      return response.json();
    })

    .then((data) => {
      const display = `
                  <h2>Name: ${data[0].name.common}</h2>
                  <p>Region: ${data[0].region}</p>
                  <p>FLAG: ${data[0].flag}</p>

              `;
      document.getElementById("weatherResult").innerHTML = display;
      document.getElementById("cityName").value = "";
      return data;
    })
    .then((info) => {
      console.log("info:", info);
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p>${error.message}</p>`;
    });


    

  //  ON LOCAL SERVER
  //   const url = `http://localhost:3000/getEndPoint`;
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Weather data not found.");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const display = `<h2>Weather Details</h2>
  //                          <p>Temperature: ${data.temperature}°C</p>
  //                          <p>Humidity: ${data.humidity}%</p>`;
  //       document.getElementById("weatherResult").innerHTML = display;
  //       document.getElementById("cityName").value = "";
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       document.getElementById(
  //         "weatherResult"
  //       ).innerHTML = `<p>${error.message}</p>`;
  //     });
});
