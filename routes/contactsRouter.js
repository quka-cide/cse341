const express = require("express");
const router = express.Router();
const mongodb = require("../backend/data/connect");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  try {
    const db = mongodb.getDb().db();
    const contacts = await db.collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

router.get("/single", async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ message: "ID query parameter is required" });
  }

  try {
    const db = mongodb.getDb().db();
    const contact = await db.collection("contacts").findOne({ _id: new ObjectId(id) });
    
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching contact" });
  }
});

module.exports = router;