const express = require("express")
const cors = require("cors")
const static = require("./routes/static")
const path = require("path")
const dotenv = require("dotenv").config()
const mongodb = require("./backend/data/connect")
const contactsRouter = require("./routes/contactsRouter")

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(static)

// routers
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/professional", async (req, res) => {
  try {
    const db = mongodb.getDb().db();
    const result = await db.collection("data").findOne();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.use("/contacts", contactsRouter)

const port = process.env.PORT

mongodb.initDb((err, db) => {
    if (err) {
        console.error("Failed to connect to MongoDB", err);
    } else {
        app.listen(port, () => {
            console.log(`App listening on http://localhost:${port}`);
            console.log("MongoDB connected!");
        });
    }
});