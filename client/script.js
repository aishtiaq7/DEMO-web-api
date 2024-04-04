document.getElementById("getWeather").addEventListener("click", function () {
  const city = document.getElementById("cityName").value;
  if (city.length == 0) {
    console.log("city none");
    return;
  }

  //   TESTING PUBLIC FREE API
  //   console.log("city - > ", city);
  //   const url = `https://restcountries.com/v3.1/name/${city}`;
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Error calling API");
  //       }
  //       return response.json();
  //     })

  //     .then((data) => {
  //       const display = `
  //                   <h2>Name: ${data[0].name.common}</h2>
  //                   <p>Region: ${data[0].region}</p>
  //                   <p>FLAG: ${data[0].flag}</p>
  //               `;
  //       document.getElementById("weatherResult").innerHTML = display;
  //       document.getElementById("cityName").value = "";
  //       return data;
  //     })
  //     .then((info) => {
  //       console.log("info:", info);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       document.getElementById(
  //         "weatherResult"
  //       ).innerHTML = `<p>${error.message}</p>`;
  //     });

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

document.getElementById("addItem").addEventListener("click", function () {
  const itemContent = document.getElementById("itemContent").value;
  console.log('itemContent:',itemContent);
  fetch("http://localhost:3000/addItem", {
    method: "POST",
    body: JSON.stringify({
       item:itemContent,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
    console.log('getting back in client side: ', data);
      document.getElementById("apiResult").innerHTML = JSON.stringify(data);
    })
    .catch((error) => console.error("Error:", error));
});

document.getElementById("getItems").addEventListener("click", function () {
  fetch("http://localhost:3000/items")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("apiResult").innerHTML = JSON.stringify(data);
    })
    .catch((error) => console.error("Error:", error));
});

document.getElementById("updateItem").addEventListener("click", function () {
  const id = document.getElementById("updateItemId").value;
  const content = document.getElementById("updateItemContent").value;
  fetch(`http://localhost:3000/updateItem/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: content }), // Adjust according to your item structure
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("apiResult").innerHTML = JSON.stringify(data);
    })
    .catch((error) => console.error("Error:", error));
});

document.getElementById("deleteItem").addEventListener("click", function () {
  const id = document.getElementById("deleteItemId").value;
  fetch(`http://localhost:3000/deleteItem/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      document.getElementById("apiResult").innerHTML =
        "Item deleted successfully";
    })
    .catch((error) => console.error("Error:", error));
});
