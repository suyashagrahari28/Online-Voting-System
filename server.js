const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let candidates = [
  { id: 1, name: "Alice", votes: 0 },
  { id: 2, name: "Bob", votes: 0 },
  { id: 3, name: "Charlie", votes: 0 }
];

let votedUsers = [];

app.get("/candidates", (req, res) => {
  res.json(candidates);
});

app.post("/vote", (req, res) => {
  const { username, candidateId } = req.body;

  if (votedUsers.includes(username)) {
    return res.json({ message: "You already voted!" });
  }

  const candidate = candidates.find(c => c.id == candidateId);

  if (candidate) {
    candidate.votes++;
    votedUsers.push(username);
    res.json({ message: "Vote submitted successfully!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});