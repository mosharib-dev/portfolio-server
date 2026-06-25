const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message)
      return res.status(400).json({ message: "All fields are required" });

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
