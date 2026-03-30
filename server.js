const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let topics = [];

// GET
app.get("/topics", (req, res) => {
    res.json(topics);
});

// ADD
app.post("/topics", (req, res) => {
    topics.push(req.body);
    res.json({ message: "Added" });
});

// DELETE ONE
app.delete("/topics/:id", (req, res) => {
    topics.splice(req.params.id, 1);
    res.json({ message: "Deleted" });
});

// CLEAR ALL
app.delete("/topics", (req, res) => {
    topics = [];
    res.json({ message: "Cleared" });
});

// GENERATE PLAN
app.get("/plan", (req, res) => {
    const result = topics.map(t => {
        let score = 0;

        if (t.difficulty === "hard") score += 3;
        if (t.difficulty === "medium") score += 2;
        if (t.difficulty === "easy") score += 1;

        if (t.understanding === "bad") score += 3;
        if (t.understanding === "average") score += 2;
        if (t.understanding === "good") score += 1;

        return { ...t, score };
    });

    result.sort((a, b) => b.score - a.score);

    res.json(result);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});