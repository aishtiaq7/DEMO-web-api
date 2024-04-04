const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Serve static files from the 'public' directory (where your HTML file is located)
app.use(express.static("public"));
app.use(cors());

app.get("/getEndPoint", async (req, res) => {
    // Generate random data
    const randomTemperature = Math.floor(Math.random() * 30) + 1; // Random temperature between 1 and 30
    const randomHumidity = Math.floor(Math.random() * 100) + 1; // Random humidity percentage between 1 and 100
  
    // Return an object containing this random data
    const dummyData = {
      temperature: randomTemperature,
      humidity: randomHumidity,
    };
  
    console.log("Sending dummy data: ", dummyData);
    res.status(200).json(dummyData);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
