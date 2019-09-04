const express = require("express");

const router = express.Router();

const db = require("../data/db");

// GET

router.get("/", (request, response) => {
  //   response.json({ message: "It's working!!" });
  db.find()
    .then(post => {
      response.status(200).json(post);
    })
    .catch(error =>
      response.status(500).json({ message: "failed to get post" })
    );
});

// GET w/ dynamic id

router.get("/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  db.findById(id)
    .then(post => {
      console.log(post.length);
      // checking to see if that id exists
      if (post.length === 0) {
        response.status(404).json({ message: "post with that id not found" });
      } else {
        response.status(200).json(post);
      }
    })
    .catch(error =>
      response.status(500).json({ message: "failed to get post" })
    );
});

// POST

router.post("/", (request, response) => {
  const body = request.body;
  console.log(body);
  // console logging with the postman content being posted (make sure matches ReadME specifications)
  // checking to see if the required content specifications (title and content) are true/being passsed in
  if (body.title && body.contents) {
    // add the post
    console.log("yes");
    db.insert(body)
      .then(id => response.status(201).json(id))
      .catch(error =>
        response.status(500).json({ message: "failed to add post" })
      );
  } else {
    // send error message
    console.log("no");
    response.status(400).json({ message: "missing title and/or contents" });
  }
});

// PUT

router.put("/:id", (request, response) => {
  const { id } = request.params;
  const body = request.body;
  if (body.title || body.contents) {
    db.update(id, body)
      .then(count =>
        response.status(200).json({ message: `${count} post updated` })
      )
      .catch(error =>
        response.status(500).json({ message: "failed to update post" })
      );
  } else {
    response.status(400).json({ message: "missing title or body" });
  }
});

// DELETE
router.delete("/:id", (request, response) => {
  const { id } = request.params;
  db.remove(id)
    .then(count =>
      response.status(200).json({ message: `${count} post deleted` })
    )
    .catch(error =>
      response.status(500).json({ message: "failed to delete post" })
    );
});

module.exports = router;
