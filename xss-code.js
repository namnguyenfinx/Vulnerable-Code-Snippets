import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/comments", (req, res) => {
  const { comment } = req.body;

  // Save the comment to the database without proper sanitization
  saveCommentToDatabase(comment);

  res.send("Comment submitted successfully");
});

app.get("/comments", (req, res) => {
  // Retrieve the comments from the database without proper sanitization
  const comments = getCommentsFromDatabase();

  let html = "<h1>Comments</h1>";
  for (const comment of comments) {
    html += `<p>${comment.text}</p>`;
  }

  res.send(html);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

