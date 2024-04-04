const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Serve static files from the 'public' directory (where your HTML file is located)
app.use(express.static("public"));
app.use(express.json()); // Make sure this line is before your routes
app.use(cors());

let items = []; // This will store our items

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

app.get("/items", (req, res) => {
  res.status(200).json(items); // Send all items as JSON
});

app.post("/addItem", (req, res) => {
    const { item } = req.body;
    console.log('gotten in back', item);
    items.push(item);
    console.log("items:", items);
    res.status(201).json({ message: "Item added successfully", item });
});

app.delete("/deleteItem/:id", (req, res) => {
  const { id } = req.params; // Get the item ID from the URL
  const index = items.findIndex((item) => item.id == id); // Find the index of the item with the given ID
  if (index !== -1) {
    items = items.filter((item) => item.id != id); // Remove the item from the array
    console.log("items:", items);
    res.status(204).send(); // No content to send back
  } else {
    res.status(404).send("Item not found");
  }
});

app.put("/updateItem", (req, res) => {
    const { originalContent, newContent } = req.body;
    console.log("items:", items);
    console.log('now finding', originalContent);
    const index = items.findIndex(item => item === originalContent);
    if (index !== -1) {
        console.log("found!");
        items[index] = newContent; // Update the item's content
        res.status(200).json({ message: "Item updated successfully", item: items[index] });
    } else {
        console.log("NOT found!");
        res.status(404).json({ error: "Item not found" }); // Ensure JSON format
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
