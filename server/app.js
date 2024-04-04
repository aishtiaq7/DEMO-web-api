const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Serve static files from the 'public' directory (where your HTML file is located)
app.use(express.static("public"));
app.use(express.json()); 
app.use(cors()); 

let items = []; // PERFORMING CURD OPERATIONS HERE

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


// TESTING OUT CURD functions: 
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

app.delete("/deleteItem", (req, res) => {
    const { content } = req.body; // Assuming you send content to delete in the body
    const index = items.findIndex(item => item === content); // Find the item by content
    if (index !== -1) {
        console.log("Item to delete found:", items[index]);
        items.splice(index, 1); // Remove the item from the array
        console.log("Updated items array:", items);
        res.status(200).json({ message: "Item deleted successfully" });
    } else {
        console.log("Item not found!");
        res.status(404).json({ error: "Item not found" });
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
