const express = require("express");

const router = express.Router();

const db = require("../data/db");

// GET

router.get("/", (request, response) => {
  //   response.json({ message: "It's working!!" });
  db.findPostComments()
    .then(comment => {
      response.status(200).json(comment);
    })
    .catch(error =>
      response.status(500).json({ message: "failed to get comment" })
    );
});

// GET w/ dynamic id

router.get("/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  db.findCommentById(id)
    .then(comment => {
      console.log(comment.length);
      // checking to see if that id exists
      if (comment.length === 0) {
        response
          .status(404)
          .json({ message: "comment with that id not found" });
      } else {
        response.status(200).json(post);
      }
    })
    .catch(error =>
      response.status(500).json({ message: "failed to get comment" })
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
    db.insertComment(body)
      .then(id => response.status(201).json(id))
      .catch(error =>
        response.status(500).json({ message: "failed to add comment" })
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
        response.status(200).json({ message: `${count} comment updated` })
      )
      .catch(error =>
        response.status(500).json({ message: "failed to update comment" })
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
      response.status(200).json({ message: `${count} comment deleted` })
    )
    .catch(error =>
      response.status(500).json({ message: "failed to delete comment" })
    );
});

module.exports = router;
