// bring in express (require === import)
const express = require("express");

// create express application
const server = express();
server.use(express.json(), express.Router());

// configuring endpoints you want to listen to
// request handler function
server.get("/", (request, response) => {
  // produce response and send it back to client
  response.send("Hello World!");
});

server.get("/hobbits", (request, response) => {
  const hobbits = [
    {
      id: 1,
      name: "Samwise Gamgee"
    },
    {
      id: 2,
      name: "Frodo Baggins"
    }
  ];

  // 200 === success
  response.status(200).json(hobbits);
  // go to localhost:8000/hobbits and you will see the hobbits endpoint data being sent in json
});

// Other CRUD operations being tested with postman

const postRouter = require("./routes/postRoute");
server.use("/api/posts", postRouter);

// Other way to do this without adding postRoute.js
// server.post("/hobbits", (request, response) => {
//   response.status(201).json({ url: "/hobbits", operation: "POST" });
// });

const commentRouter = require("./routes/commentRoute");
server.use("/api/comments", commentRouter);

// the hobbit endpoints are from training kit 

server.put("/hobbits", (request, response) => {
  response.status(200).json({ url: "/hobbits", operation: "PUT" });
}); // put - updates data

server.delete("/hobbits", (request, response) => {
  response.sendStatus(204);
}); // delete - delete data

// tell server to listen to connection on a particular port
server.listen(8000, () => console.log("api running on port 8000"));

//another way to do it:
//server.listen(port, () => {
// console.log("server listening on port ${port}");
// });





// start up with npm run server
// or npm start if script is already there.
// Should now show up in localhost:8000
