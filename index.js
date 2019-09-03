// bring in express (require === import)
const express = require("express");

// create express application
const server = express();

// configuring endpoints you want to listen to
// request handler function
server.get("/", (request, response) => {
  // produce response and send it back to client
  response.send("Hello World");
});

// tell server to listen to connection on a particular port
server.listen(8000, () => console.log("api running on port 8000"));


// start up with 
// npm run server 
// or npm start if script is already there. 
// Should now show up in localhost:8000 