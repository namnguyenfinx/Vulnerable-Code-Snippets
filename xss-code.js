import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Add middleware for input validation and sanitization
app.use((req, res, next) => {
  if (req.body && req.body.comment) {
    req.body.comment = sanitizeComment(req.body.comment);
    next();
  } else {
    res.status(400).send("Bad Request");
  }
});

// Add middleware for authentication and authorization
app.use((req, res, next) => {
  if (req.headers.authorization === "secret-token") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/comments", (req, res) => {
  // Save the comment to the database with sanitized input
  saveCommentToDatabase(req.body.comment);

  res.send("Comment submitted successfully");
});

app.get("/comments", (req, res) => {
  // Retrieve the comments from the database with sanitized output
  const comments = getCommentsFromDatabase();
  const sanitizedComments = comments.map((comment) => sanitizeComment(comment));

  let html = "<h1>Comments</h1>";
  for (const comment of sanitizedComments) {
    html += `<p>${comment}</p>`;
  }

  res.send(html);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// Function to sanitize comment input and output
function sanitizeComment(comment) {
  return comment.replace(/[^\w\s]/gi, "");
}
