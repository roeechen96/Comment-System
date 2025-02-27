const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { title, author, content, parentId } = req.body;

  const newComment = new Comment({
    title,
    author,
    content,
    parentId: parentId || null,
  });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
