// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser"); // required body-parser
const cors = require("cors"); // required cors
const res = require("express/lib/response"); // required res
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors()); // used cors

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;

// see if the server is running
app.listen(port, () => { // passing the port and the callback function
  console.log(`your server is running on port ${port}`); // a message shown in the terminal indicating that the server is running in 8080 port
}); // end of function

// post request to set the data inside the projectData object
app.post("/weather", (req, res) => { // passing the url /weather and a callback function with parameters req, res
  projectData.temp = req.body.temp; // adding the temperature
  projectData.content = req.body.content; // adding the content that the user wrote "feelings"
  projectData.date = req.body.date; // adding the date
  console.log(projectData); // printing the object in the terminal to make sure everything is fine
}); // end of function

// get request to send the projectData to the client side
app.get("/allData", (req, res) => { // passing the url /allData and the callback function with parameters req, res
  res.send(projectData); // sending the projectData to the client side to get it
}); // end of function
