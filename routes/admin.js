const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  )
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});


router.get("/messages", auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/messages/:id/read", auth, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(msg);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/messages/:id", auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
